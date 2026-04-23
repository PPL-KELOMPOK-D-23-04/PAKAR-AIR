"""User service — profile CRUD operations."""
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from uuid import UUID

from app.models.models import Profile
from app.schemas.user import ProfileUpdate


def get_profile(user_id: UUID, db: Session) -> Profile:
    profile = db.query(Profile).filter(Profile.id == user_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


def update_profile(
    current_user: Profile,
    data: ProfileUpdate,
    db: Session
) -> Profile:
    update_data = data.model_dump(exclude_unset=True)

    # Check username uniqueness if changing
    if "username" in update_data and update_data["username"] != current_user.username:
        existing = db.query(Profile).filter(
            Profile.username == update_data["username"]
        ).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Username already taken"
            )

    for key, value in update_data.items():
        setattr(current_user, key, value)

    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user


def update_avatar(current_user: Profile, avatar_url: str, db: Session) -> Profile:
    current_user.avatar_url = avatar_url
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user
