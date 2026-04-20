from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID
from datetime import datetime

class ProfileBase(BaseModel):
    full_name: str
    username: str
    avatar_url: Optional[str] = None

class ProfileCreate(ProfileBase):
    id: UUID # Must match Supabase Auth UUID

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    username: Optional[str] = None
    avatar_url: Optional[str] = None

class ProfileResponse(ProfileBase):
    id: UUID
    is_admin: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
