from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.utils.db import get_db
from app.utils.supabase import get_supabase
from app.models.models import Profile
from supabase import Client

import time
from typing import Dict, Tuple

security = HTTPBearer()

# Cache for Supabase tokens to prevent rate limits / HTTP hangs during E2E tests
# Format: { token: (timestamp, user_id) }
TOKEN_CACHE: Dict[str, Tuple[float, str]] = {}
CACHE_TTL = 300 # 5 minutes

def get_current_user(
    auth: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
    supabase: Client = Depends(get_supabase)
):
    token = auth.credentials
    current_time = time.time()
    
    # Fast path: check cache
    if token in TOKEN_CACHE:
        timestamp, cached_user_id = TOKEN_CACHE[token]
        if current_time - timestamp < CACHE_TTL:
            profile = db.query(Profile).filter(Profile.id == cached_user_id).first()
            if profile and profile.is_active:
                return profile
                
    try:
        # Verify token with Supabase (makes HTTP request)
        user_response = supabase.auth.get_user(token)
        if not user_response or not user_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
            )
        
        user_id = user_response.user.id
        
        # Save to cache
        TOKEN_CACHE[token] = (current_time, user_id)
        
        # User is authenticated in Supabase, now get profile from local DB
        profile = db.query(Profile).filter(Profile.id == user_id).first()
        
        if not profile:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User profile not found",
            )
            
        if not profile.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is inactive",
            )
            
        return profile
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
        )

def get_admin_user(current_user: Profile = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The user does not have enough privileges",
        )
    return current_user
