"""
Chatbot Service — Google Gemini AI Integration + Chat CRUD.
Handles communication with Google AI Studio (Gemini) API
and persists chat history to the database.
Supports Function Calling (Tools) to access database metrics.
"""
from google import genai
from google.genai import types
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Optional
import json

from app.config import settings
from app.models.models import ChatSession, ChatMessage
from app.services import chatbot_tools

# ─── System Prompt (Updated with Data Access) ────────────────────

SYSTEM_PROMPT = (
    "Kamu adalah asisten AI untuk sistem PAKAR-AIR, sebuah platform analisis "
    "kualitas air yang menggunakan Machine Learning (Random Forest) dan "
    "Deep Learning (YOLOv8). \n\n"
    "KEMAMPUAN KHUSUS:\n"
    "- Kamu memiliki akses ke data statistik sistem (jumlah user, analisis, dll) melalui fungsi yang disediakan.\n"
    "- Jika admin bertanya tentang jumlah data, status sistem, atau laporan terbaru, gunakan fungsi tersebut.\n"
    "- Jangan pernah katakan 'Saya tidak punya akses ke database' jika pertanyaan bisa dijawab lewat fungsi.\n\n"
    "Tugas Utama:\n"
    "- Membantu admin memahami data dan laporan analisis kualitas air.\n"
    "- Menjelaskan parameter kualitas air (pH, Hardness, Turbidity, dll).\n"
    "- Memberikan rekomendasi sanitasi.\n\n"
    "Aturan Jawaban:\n"
    "- Jawab dalam Bahasa Indonesia.\n"
    "- Berikan jawaban yang informatif, ringkas, dan berbasis data jika tersedia."
)

# Model name (Instruction: DO NOT CHANGE)
GEMINI_MODEL = "gemini-2.5-flash"


# ─── Gemini Client ───────────────────────────────────────────────

def _get_client():
    """Initialize and return a Gemini client instance."""
    return genai.Client(api_key=settings.GEMINI_API_KEY)


def _build_chat_history(messages: List[ChatMessage]) -> list:
    """Convert DB messages to Gemini's chat history format."""
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
    """Delete a chat session."""
    session = get_session(session_id, user_id, db)
    if not session:
        return False
    db.delete(session)
    db.commit()
    return True


# ─── AI Chat with Tools ──────────────────────────────────────────

def send_message(
    session_id: UUID,
    user_message: str,
    user_id: UUID,
    db: Session,
) -> tuple:
    """
    Send a user message to Gemini, handle function calling for DB data,
    and save both messages to the database.
    """
    # 1. Verify session
    session = get_session(session_id, user_id, db)
    if not session:
        raise ValueError("Chat session not found or access denied")

    # 2. Save user message to DB
    user_msg = ChatMessage(session_id=session_id, role="user", content=user_message)
    db.add(user_msg)
    db.flush()

    # 3. Load chat history
    existing_messages = get_session_messages(session_id, db)
    history_messages = [m for m in existing_messages if m.id != user_msg.id]
    chat_history = _build_chat_history(history_messages)

    # 4. Prepare Tools
    # We define local wrappers that have access to the 'db' session
    def tool_get_system_stats():
        return chatbot_tools.get_system_stats(db)

    def tool_get_water_quality_summary():
        return chatbot_tools.get_water_quality_summary(db)

    def tool_get_latest_analyses_brief(limit: int = 5):
        return chatbot_tools.get_latest_analyses_brief(db, limit)

    # 5. Call Gemini with Automatic Function Calling
    try:
        client = _get_client()
        
        # Prepare content list
        contents = chat_history + [
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=user_message)],
            )
        ]

        # Call Gemini with tool configuration
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                tools=[
                    tool_get_system_stats,
                    tool_get_water_quality_summary,
                    tool_get_latest_analyses_brief
                ],
                # Automatic function calling loop
                automatic_function_calling=types.AutomaticFunctionCallingConfig(
                    disable=False
                ),
                temperature=0.3, # Lower temperature for data-heavy tasks
            ),
        )
        ai_text = response.text
    except Exception as e:
        db.rollback()
        raise Exception(f"AI service error: {str(e)}")

    # 6. Save AI response
    ai_msg = ChatMessage(session_id=session_id, role="assistant", content=ai_text)
    db.add(ai_msg)

    # 7. Update session title if first chat
    if len(history_messages) == 0:
        session.title = user_message[:100] + ("..." if len(user_message) > 100 else "")

    db.commit()
    db.refresh(user_msg)
    db.refresh(ai_msg)

    return user_msg, ai_msg
