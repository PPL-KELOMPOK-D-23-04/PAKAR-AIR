"""
Pydantic schemas for AI Chatbot feature.
"""
from pydantic import BaseModel, Field
from datetime import datetime
from uuid import UUID
from typing import List, Optional


# ─── Request Schemas ─────────────────────────────────────────────

class ChatMessageRequest(BaseModel):
    """Request body for sending a message to the chatbot."""
    message: str = Field(..., min_length=1, max_length=4000, description="User message text")


class ChatSessionCreate(BaseModel):
    """Optional body for creating a new chat session with a custom title."""
    title: Optional[str] = Field("Chat Baru", max_length=200, description="Session title")


# ─── Response Schemas ────────────────────────────────────────────

class ChatMessageResponse(BaseModel):
    """Single chat message in a conversation."""
    id: UUID
    session_id: UUID
    role: str          # 'user' or 'assistant'
    content: str
    created_at: datetime

    class Config:
        from_attributes = True


class ChatSessionResponse(BaseModel):
    """Chat session metadata (without messages)."""
    id: UUID
    user_id: UUID
    title: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ChatSessionWithMessages(ChatSessionResponse):
    """Chat session with all its messages."""
    messages: List[ChatMessageResponse] = []


class ChatBotResponse(BaseModel):
    """Response after sending a message — returns both user and AI messages."""
    user_message: ChatMessageResponse
    ai_message: ChatMessageResponse
