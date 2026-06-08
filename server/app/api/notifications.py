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
def list_notifications(
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    items = notification_service.get_user_notifications(current_user.id, db)
    return NotificationListResponse(
        items=[NotificationResponse.model_validate(n) for n in items],
        total=len(items),
    )


@router.put("/{notification_id}/read", response_model=NotificationResponse)
def mark_notification_read(
    notification_id: UUID,
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    notif = notification_service.mark_as_read(notification_id, current_user.id, db)
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notif


@router.get("/unread-count", response_model=UnreadCountResponse)
def unread_count(
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    count = notification_service.get_unread_count(current_user.id, db)
    return UnreadCountResponse(count=count)
