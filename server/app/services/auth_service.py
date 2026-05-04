"""
Auth service — wraps Supabase Auth for register, login, logout, refresh.
Supabase handles JWT token generation and user management.
"""
from sqlalchemy.orm import Session
from supabase import Client
from fastapi import HTTPException, status

from app.models.models import Profile
from app.schemas.auth_schema import RegisterRequest, LoginRequest


def register_user(
    data: RegisterRequest,
    supabase: Client,
    db: Session
) -> dict:
    """
    1. Register user in Supabase Auth
    2. Create profile row in our DB (or rely on DB trigger)
    """
    try:
        # Step 1: Create user in Supabase Auth
        auth_response = supabase.auth.sign_up({
            "email": data.email,
            "password": data.password,
            "options": {
                "data": {
                    "full_name": data.full_name,
                    "username": data.username,
                }
            }
        })

        if not auth_response.user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to register user in Supabase Auth"
            )

        user = auth_response.user

        # Step 2: Ensure profile exists in our DB
        # (The DB trigger handle_new_user() should auto-create it,
        #  but we do it here as a fallback.)
        existing = db.query(Profile).filter(Profile.id == user.id).first()
        if not existing:
            profile = Profile(
                id=user.id,
                full_name=data.full_name,
                username=data.username,
            )
            db.add(profile)
            db.commit()

        return {
            "message": "Registration successful",
            "user_id": str(user.id),
            "email": user.email,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Registration failed: {str(e)}"
        )


def login_user(data: LoginRequest, supabase: Client, db: Session) -> dict:
    """
    Authenticate with Supabase Auth → return JWT tokens.
    """
    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": data.email,
            "password": data.password,
        })

        if not auth_response.session:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        session = auth_response.session
        user = auth_response.user

        # Fetch profile to get is_admin, is_active, and full_name
        profile = db.query(Profile).filter(Profile.id == user.id).first()

        # ── FIX: Jika profile belum ada (trigger Supabase belum jalan),
        #         buat otomatis dari data Supabase Auth ──────────────────
        if not profile:
            meta = user.user_metadata or {}
            username = meta.get("username") or data.email.split("@")[0]
            full_name = meta.get("full_name") or username

            # Pastikan username unik — tambah suffix jika sudah ada
            existing_username = db.query(Profile).filter(
                Profile.username == username
            ).first()
            if existing_username:
                username = f"{username}_{str(user.id)[:6]}"

            profile = Profile(
                id=user.id,
                full_name=full_name,
                username=username,
                is_admin=False,
                is_active=True,
            )
            db.add(profile)
            db.commit()
            db.refresh(profile)

        # ── FIX: Cek is_active — blokir login jika akun dinonaktifkan ──
        if not profile.is_active:
            # Sign out dari Supabase agar session tidak menggantung
            try:
                supabase.auth.sign_out()
            except Exception:
                pass
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Akun Anda telah dinonaktifkan oleh admin. Hubungi administrator untuk informasi lebih lanjut."
            )

        return {
            "access_token": session.access_token,
            "refresh_token": session.refresh_token,
            "token_type": "bearer",
            "user_id": str(user.id),
            "email": user.email,
            "full_name": profile.full_name,
            "is_admin": profile.is_admin,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Login failed: {str(e)}"
        )


def logout_user(token: str, supabase: Client) -> dict:
    """Sign out from Supabase (invalidates the session server-side)."""
    try:
        supabase.auth.sign_out(token)
        return {"message": "Logged out successfully"}
    except Exception:
        # Even if Supabase sign-out fails, client should discard the token
        return {"message": "Logged out successfully"}


def refresh_token(refresh_token_str: str, supabase: Client, db: Session) -> dict:
    """Get a new access token using the refresh token."""
    try:
        auth_response = supabase.auth.refresh_session(refresh_token_str)

        if not auth_response.session:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token"
            )

        session = auth_response.session
        user = auth_response.user
        profile = db.query(Profile).filter(Profile.id == user.id).first()

        # Cek is_active juga saat refresh token
        if profile and not profile.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Akun Anda telah dinonaktifkan oleh admin."
            )

        return {
            "access_token": session.access_token,
            "refresh_token": session.refresh_token,
            "token_type": "bearer",
            "user_id": str(user.id),
            "email": user.email,
            "full_name": profile.full_name if profile else None,
            "is_admin": profile.is_admin if profile else False,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token refresh failed: {str(e)}"
        )
