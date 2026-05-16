"""
Chatbot Service — Google Gemini AI Integration + Chat CRUD.
Handles communication with Google AI Studio (Gemini) API
and persists chat history to the database.
Uses the new google.genai SDK (replaces deprecated google.generativeai).
"""
from google import genai
from google.genai import types
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional

from app.config import settings
from app.models.models import ChatSession, ChatMessage

# ─── System Prompt (Domain Context) ──────────────────────────────

SYSTEM_PROMPT = (
    "Kamu adalah asisten AI untuk sistem PAKAR-AIR, sebuah platform analisis "
    "kualitas air yang menggunakan Machine Learning (Random Forest) dan "
    "Deep Learning (YOLOv8). \n\n"
    "Tugasmu:\n"
    "- Membantu admin memahami data dan laporan analisis kualitas air.\n"
    "- Menjelaskan parameter kualitas air seperti pH, Hardness, Solids, "
    "Chloramines, Sulfate, Conductivity, Organic Carbon, Trihalomethanes, "
    "dan Turbidity.\n"
    "- Memberikan rekomendasi terkait sanitasi air.\n"
    "- Menjawab pertanyaan umum tentang kualitas air dan sistem PAKAR-AIR.\n\n"
    "Jawab dalam Bahasa Indonesia kecuali diminta bahasa lain. "
    "Berikan jawaban yang informatif, ringkas, dan mudah dipahami."
)

# Model name
GEMINI_MODEL = "gemini-2.5-flash"


# ─── Gemini Client ───────────────────────────────────────────────

def _get_client():
    """Initialize and return a Gemini client instance."""
    return genai.Client(api_key=settings.GEMINI_API_KEY)


def _build_chat_history(messages: List[ChatMessage]) -> list:
    """
    Convert DB messages to Gemini's chat history format.
    google.genai expects Content objects with role 'user' or 'model'.
    """
    history = []
    for msg in messages:
        role = "model" if msg.role == "assistant" else "user"
        history.append(
            types.Content(
                role=role,
                parts=[types.Part.from_text(text=msg.content)],
            )
        )
    return history


# ─── CRUD Operations ─────────────────────────────────────────────

def create_session(user_id: UUID, title: str, db: Session) -> ChatSession:
    """Create a new chat session for an admin."""
    session = ChatSession(user_id=user_id, title=title)
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


def list_sessions(user_id: UUID, db: Session) -> List[ChatSession]:
    """List all chat sessions for a given admin, newest first."""
    return (
        db.query(ChatSession)
        .filter(ChatSession.user_id == user_id)
        .order_by(ChatSession.updated_at.desc())
        .all()
    )


def get_session(session_id: UUID, user_id: UUID, db: Session) -> Optional[ChatSession]:
    """Get a specific chat session (with ownership check)."""
    return (
        db.query(ChatSession)
        .filter(ChatSession.id == session_id, ChatSession.user_id == user_id)
        .first()
    )


def get_session_messages(session_id: UUID, db: Session) -> List[ChatMessage]:
    """Get all messages in a session, ordered by creation time."""
    return (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )


def delete_session(session_id: UUID, user_id: UUID, db: Session) -> bool:
    """Delete a chat session (cascades to messages). Returns True if deleted."""
    session = get_session(session_id, user_id, db)
    if not session:
        return False
    db.delete(session)
    db.commit()
    return True


# ─── AI Chat ─────────────────────────────────────────────────────

def send_message(
    session_id: UUID,
    user_message: str,
    user_id: UUID,
    db: Session,
) -> tuple:
    """
    Send a user message to Gemini and save both messages to the database.

    Returns:
        tuple: (user_msg_record, ai_msg_record) -- both ChatMessage objects

    Raises:
        ValueError: if session not found or doesn't belong to user
        Exception: if Gemini API call fails
    """
    # 1. Verify session ownership
    session = get_session(session_id, user_id, db)
    if not session:
        raise ValueError("Chat session not found or access denied")

    # 2. Save user message to DB
    user_msg = ChatMessage(
        session_id=session_id,
        role="user",
        content=user_message,
    )
    db.add(user_msg)
    db.flush()  # Get ID without committing yet

    # 3. Load chat history for context
    existing_messages = get_session_messages(session_id, db)
    # Exclude the message we just added (it's flushed but we send it separately)
    history_messages = [m for m in existing_messages if m.id != user_msg.id]
    chat_history = _build_chat_history(history_messages)

    # 4. Call Gemini API using new google.genai SDK
    try:
        client = _get_client()

        # Build the full contents: history + current user message
        contents = chat_history + [
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=user_message)],
            )
        ]

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                max_output_tokens=2048,
                temperature=0.7,
            ),
        )
        ai_text = response.text
    except Exception as e:
        # Rollback user message if AI fails
        db.rollback()
        raise Exception(f"Gemini API error: {str(e)}")

    # 5. Save AI response to DB
    ai_msg = ChatMessage(
        session_id=session_id,
        role="assistant",
        content=ai_text,
    )
    db.add(ai_msg)

    # 6. Auto-update session title from first user message
    if len(history_messages) == 0:
        session.title = user_message[:100] + ("..." if len(user_message) > 100 else "")

    db.commit()
    db.refresh(user_msg)
    db.refresh(ai_msg)

    return user_msg, ai_msg
