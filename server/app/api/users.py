from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from supabase import Client

from app.api.deps import get_current_user
from app.utils.db import get_db
from app.utils.supabase import get_supabase
from app.utils.file_handler import upload_to_supabase
from app.models.models import Profile
from app.schemas.user import ProfileResponse, ProfileUpdate, PasswordChange
from app.services import user_service

router = APIRouter()

@router.post("/change-password")
async def change_password(
    data: PasswordChange,
    supabase: Client = Depends(get_supabase),
):
    """
    KF-08: Change user password.
    """
    return user_service.change_password(data.new_password, supabase)


@router.delete("/me")
async def delete_account(
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    KF-08: Delete current user account (local profile).
    """
    return user_service.delete_account(current_user, db)

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
    supabase: Client = Depends(get_supabase),
):
    """
    KF-08: Upload profile avatar image to Supabase Storage.
    """
    # Upload to Supabase Bucket 'avatars'
    public_url = await upload_to_supabase(
        file=file, 
        supabase=supabase, 
        bucket_name="avatars",
        folder=str(current_user.id)
    )
    
    return user_service.update_avatar(current_user, public_url, db)
