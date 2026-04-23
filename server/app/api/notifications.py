"""
Notifications API Router — /api/notifications/*
Handles: GET list, PUT mark-read, GET unread-count
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from app.api.deps import get_current_user
from app.utils.db import get_db
from app.models.models import Profile
from app.schemas.notification_schema import (
    NotificationResponse, NotificationListResponse, UnreadCountResponse,
)
from app.services import notification_service

router = APIRouter()


@router.get("", response_model=NotificationListResponse)
async def list_notifications(
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    KF-13: Get all notifications for current user.
    """
    items = notification_service.get_user_notifications(current_user.id, db)
    return NotificationListResponse(
        items=[NotificationResponse.model_validate(n) for n in items],
        total=len(items),
    )


@router.put("/{notification_id}/read", response_model=NotificationResponse)
async def mark_notification_read(
    notification_id: UUID,
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    KF-13: Mark a notification as read.
    """
    notif = notification_service.mark_as_read(notification_id, current_user.id, db)
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notif


@router.get("/unread-count", response_model=UnreadCountResponse)
async def unread_count(
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    KF-13: Get count of unread notifications.
    """
    count = notification_service.get_unread_count(current_user.id, db)
    return UnreadCountResponse(count=count)
