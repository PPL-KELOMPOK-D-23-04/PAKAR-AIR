"""Pydantic schemas for Notifications."""
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from uuid import UUID
from datetime import datetime


class NotificationResponse(BaseModel):
    id: UUID
    analysis_id: Optional[UUID] = None
    title: str
    message: str
    type: str
    is_read: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class NotificationListResponse(BaseModel):
    items: List[NotificationResponse]
    total: int


class UnreadCountResponse(BaseModel):
    count: int
