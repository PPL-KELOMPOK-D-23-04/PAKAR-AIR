"""Pydantic schemas for Authentication (register, login, token)."""
from pydantic import BaseModel, Field
from typing import Optional


class RegisterRequest(BaseModel):
    """POST /api/auth/register"""
    email: str = Field(..., description="Email address for Supabase Auth")
    password: str = Field(..., min_length=6, description="Min 6 characters")
    full_name: str = Field(..., min_length=1, max_length=100)
    username: str = Field(..., min_length=3, max_length=50)


class LoginRequest(BaseModel):
    """POST /api/auth/login"""
    email: str
    password: str


class TokenResponse(BaseModel):
    """Response after login / refresh"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    full_name: Optional[str] = None
    is_admin: bool = False


class RefreshRequest(BaseModel):
    """POST /api/auth/refresh"""
    refresh_token: str


class MessageResponse(BaseModel):
    """Generic message response"""
    message: str
