"""
Users API Router — /api/users/*
Handles: GET/PUT profile, POST avatar upload
"""
from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.utils.db import get_db
from app.utils.file_handler import save_upload_image
from app.models.models import Profile
from app.schemas.user import ProfileResponse, ProfileUpdate
from app.services import user_service
from app.config import settings

router = APIRouter()


@router.get("/profile", response_model=ProfileResponse)
async def get_profile(
    current_user: Profile = Depends(get_current_user),
):
    """
    KF-08: Get current user profile.
    """
    return current_user


@router.put("/profile", response_model=ProfileResponse)
async def update_profile(
    data: ProfileUpdate,
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    KF-08: Update current user profile (name, username).
    """
    return user_service.update_profile(current_user, data, db)


@router.post("/profile/avatar", response_model=ProfileResponse)
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    KF-08: Upload profile avatar image.
    """
    file_info = await save_upload_image(file, upload_folder=settings.UPLOAD_FOLDER)
    return user_service.update_avatar(current_user, file_info["image_path"], db)
