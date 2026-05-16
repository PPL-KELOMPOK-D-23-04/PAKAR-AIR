"""
Admin Chatbot API Router — /api/admin/chatbot/*
Handles: chat session CRUD, sending messages to Gemini AI.
All endpoints require admin authentication.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.api.deps import get_admin_user
from app.utils.db import get_db
from app.models.models import Profile
from app.schemas.chatbot_schema import (
    ChatMessageRequest,
    ChatSessionCreate,
    ChatMessageResponse,
    ChatSessionResponse,
    ChatSessionWithMessages,
    ChatBotResponse,
)
from app.services import chatbot_service

router = APIRouter()


# ─── Sessions ────────────────────────────────────────────────────

@router.post("/sessions", response_model=ChatSessionResponse, status_code=201)
async def create_session(
    body: ChatSessionCreate = ChatSessionCreate(),
    admin: Profile = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """Create a new chat session."""
    session = chatbot_service.create_session(
        user_id=admin.id,
        title=body.title or "Chat Baru",
        db=db,
    )
    return session


@router.get("/sessions", response_model=List[ChatSessionResponse])
async def list_sessions(
    admin: Profile = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """List all chat sessions for the current admin (newest first)."""
    return chatbot_service.list_sessions(user_id=admin.id, db=db)


@router.get("/sessions/{session_id}", response_model=ChatSessionWithMessages)
async def get_session(
    session_id: UUID,
    admin: Profile = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """Get a chat session with all its messages."""
    session = chatbot_service.get_session(session_id, admin.id, db)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat session not found",
        )
    # Load messages
    messages = chatbot_service.get_session_messages(session_id, db)
    return ChatSessionWithMessages(
        id=session.id,
        user_id=session.user_id,
        title=session.title,
        is_active=session.is_active,
        created_at=session.created_at,
        updated_at=session.updated_at,
        messages=messages,
    )


@router.delete("/sessions/{session_id}")
async def delete_session(
    session_id: UUID,
    admin: Profile = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """Delete a chat session and all its messages."""
    deleted = chatbot_service.delete_session(session_id, admin.id, db)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat session not found",
        )
    return {"message": "Session deleted", "session_id": str(session_id)}


# ─── Messages ────────────────────────────────────────────────────

@router.post("/sessions/{session_id}/messages", response_model=ChatBotResponse)
async def send_message(
    session_id: UUID,
    body: ChatMessageRequest,
    admin: Profile = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """
    Send a message to the AI chatbot.
    Returns both the user message and the AI response.
    """
    try:
        user_msg, ai_msg = chatbot_service.send_message(
            session_id=session_id,
            user_message=body.message,
            user_id=admin.id,
            db=db,
        )
        return ChatBotResponse(
            user_message=ChatMessageResponse(
                id=user_msg.id,
                session_id=user_msg.session_id,
                role=user_msg.role,
                content=user_msg.content,
                created_at=user_msg.created_at,
            ),
            ai_message=ChatMessageResponse(
                id=ai_msg.id,
                session_id=ai_msg.session_id,
                role=ai_msg.role,
                content=ai_msg.content,
                created_at=ai_msg.created_at,
            ),
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI service error: {str(e)}",
        )
