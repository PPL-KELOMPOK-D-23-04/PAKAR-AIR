"""
Auth API Router — /api/auth/*
Handles: register, login, logout, refresh
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from supabase import Client

from app.utils.db import get_db
from app.utils.supabase import get_supabase
from app.schemas.auth_schema import (
    RegisterRequest, LoginRequest, RefreshRequest,
    TokenResponse, MessageResponse,
)
from app.services import auth_service

router = APIRouter()


@router.post("/register", response_model=MessageResponse)
async def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
    supabase: Client = Depends(get_supabase),
):
    """
    KF-01: Registrasi pengguna baru.
    Creates user in Supabase Auth + profile row in DB.
    """
    result = auth_service.register_user(data, supabase, db)
    return MessageResponse(message=result["message"])


@router.post("/login", response_model=TokenResponse)
async def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
    supabase: Client = Depends(get_supabase),
):
    """
    KF-02: Login — returns JWT access_token + refresh_token.
    """
    return auth_service.login_user(data, supabase, db)


from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

auth_bearer = HTTPBearer()

@router.post("/logout", response_model=MessageResponse)
async def logout(
    token: HTTPAuthorizationCredentials = Depends(auth_bearer),
    supabase: Client = Depends(get_supabase),
):
    """
    KF-02: Logout — invalidates session server-side.
    Frontend should also discard the token.
    """
    result = auth_service.logout_user(token.credentials, supabase)
    return MessageResponse(message=result["message"])


@router.post("/refresh", response_model=TokenResponse)
async def refresh(
    data: RefreshRequest,
    db: Session = Depends(get_db),
    supabase: Client = Depends(get_supabase),
):
    """
    Refresh access token using refresh_token.
    """
    return auth_service.refresh_token(data.refresh_token, supabase, db)
