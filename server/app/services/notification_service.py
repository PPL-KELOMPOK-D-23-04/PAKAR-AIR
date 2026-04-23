"""Notification service — create, list, mark-read."""
from sqlalchemy.orm import Session
from uuid import UUID

from app.models.models import Notification


def create_notification(
    user_id: UUID,
    title: str,
    message: str,
    db: Session,
    analysis_id: UUID = None,
    notif_type: str = "info",
) -> Notification:
    """Create a new notification for a user."""
    notif = Notification(
        user_id=user_id,
        analysis_id=analysis_id,
        title=title,
        message=message,
        type=notif_type,
    )
    db.add(notif)
    db.commit()
    db.refresh(notif)
    return notif


def get_user_notifications(user_id: UUID, db: Session):
    """Get all notifications for a user, newest first."""
    return db.query(Notification).filter(
        Notification.user_id == user_id
    ).order_by(Notification.created_at.desc()).all()


def mark_as_read(notification_id: UUID, user_id: UUID, db: Session) -> Notification:
    """Mark a single notification as read."""
    notif = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.user_id == user_id,
    ).first()
    if not notif:
        return None
    notif.is_read = True
    db.commit()
    db.refresh(notif)
    return notif


def get_unread_count(user_id: UUID, db: Session) -> int:
    """Count unread notifications for a user."""
    return db.query(Notification).filter(
        Notification.user_id == user_id,
        Notification.is_read == False,
    ).count()
