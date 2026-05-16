import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "PAKAR-AIR API"
    SECRET_KEY: str = "supersecretkey_please_change"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # DB
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/pakar_air"
    
    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    
    # Storage
    UPLOAD_FOLDER: str = "uploads"
    
    # Google AI (Gemini)
    GEMINI_API_KEY: str = ""
    
    class Config:
        env_file = ".env"

settings = Settings()
