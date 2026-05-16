"""
SQLAlchemy ORM models for PAKAR-AIR database.
Maps to Supabase (PostgreSQL) tables defined in database/schema.sql.
"""
from sqlalchemy import (
    Column, String, Float, Boolean, DateTime, ForeignKey,
    Text, Integer, Enum, text
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship, declarative_base
import datetime
import enum


Base = declarative_base()


# ─── Enums ───────────────────────────────────────────────────────

class AnalysisStatus(enum.Enum):
    pending = "pending"
    processing = "processing"
    completed = "completed"
    failed = "failed"


# ─── Profile (maps to Supabase auth.users → profiles) ───────────

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(UUID(as_uuid=True), primary_key=True,
                server_default=text("gen_random_uuid()"))
    full_name = Column(String(100), nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    avatar_url = Column(String(255), nullable=True)
    is_admin = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow,
                        onupdate=datetime.datetime.utcnow)

    # Relationships
    analyses = relationship("Analysis", back_populates="owner",
                            cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user",
                                 cascade="all, delete-orphan")
    chat_sessions = relationship("ChatSession", back_populates="user",
                                 cascade="all, delete-orphan")


# ─── Analysis ────────────────────────────────────────────────────

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(UUID(as_uuid=True), primary_key=True,
                server_default=text("gen_random_uuid()"))
    user_id = Column(UUID(as_uuid=True),
                     ForeignKey("profiles.id", ondelete="CASCADE"))
    status = Column(Enum(AnalysisStatus), default=AnalysisStatus.pending)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)

    # Relationships
    owner = relationship("Profile", back_populates="analyses")
    image_input = relationship("ImageInput", back_populates="analysis",
                               uselist=False, cascade="all, delete-orphan")
    manual_input = relationship("ManualInput", back_populates="analysis",
                                uselist=False, cascade="all, delete-orphan")
    result = relationship("AnalysisResult", back_populates="analysis",
                          uselist=False, cascade="all, delete-orphan")


# ─── Image Input (citra air yang diunggah) ───────────────────────

class ImageInput(Base):
    __tablename__ = "image_inputs"

    id = Column(UUID(as_uuid=True), primary_key=True,
                server_default=text("gen_random_uuid()"))
    analysis_id = Column(UUID(as_uuid=True),
                         ForeignKey("analyses.id", ondelete="CASCADE"))
    image_path = Column(String, nullable=False)
    original_filename = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)

    analysis = relationship("Analysis", back_populates="image_input")


# ─── Manual Input (data manual kualitas air) ─────────────────────

class ManualInput(Base):
    __tablename__ = "manual_inputs"

    id = Column(UUID(as_uuid=True), primary_key=True,
                server_default=text("gen_random_uuid()"))
    analysis_id = Column(UUID(as_uuid=True),
                         ForeignKey("analyses.id", ondelete="CASCADE"))
    data_json = Column(JSONB, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)

    analysis = relationship("Analysis", back_populates="manual_input")


# ─── Analysis Result ─────────────────────────────────────────────

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(UUID(as_uuid=True), primary_key=True,
                server_default=text("gen_random_uuid()"))
    analysis_id = Column(UUID(as_uuid=True),
                         ForeignKey("analyses.id", ondelete="CASCADE"))
    # Final combined result
    category = Column(String(50))          # "layak" / "tidak_layak"
    confidence = Column(Float)             # 0.0 – 1.0
    # Deep Learning result
    dl_category = Column(String(50))
    dl_confidence = Column(Float)
    dl_detections = Column(JSONB)          # [{label, score}]
    # Machine Learning result
    ml_category = Column(String(50))
    ml_confidence = Column(Float)
    ml_feature_importance = Column(JSONB)  # {feature: weight}
    # Explanation
    explanation = Column(Text)
    recommendation = Column(Text)
    raw_output = Column(JSONB)             # Full raw output for debugging
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)

    analysis = relationship("Analysis", back_populates="result")


# ─── Notification ────────────────────────────────────────────────

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(UUID(as_uuid=True), primary_key=True,
                server_default=text("gen_random_uuid()"))
    user_id = Column(UUID(as_uuid=True),
                     ForeignKey("profiles.id", ondelete="CASCADE"))
    analysis_id = Column(UUID(as_uuid=True),
                         ForeignKey("analyses.id", ondelete="SET NULL"),
                         nullable=True)
    title = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String(30), default="info")  # analysis_complete / system / info
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)

    user = relationship("Profile", back_populates="notifications")


# Catatan: Education articles di-hardcode di services/education_service.py,
# tidak disimpan di database.


# ─── Chat Session (AI Chatbot) ───────────────────────────────────

class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True,
                server_default=text("gen_random_uuid()"))
    user_id = Column(UUID(as_uuid=True),
                     ForeignKey("profiles.id", ondelete="CASCADE"),
                     nullable=False)
    title = Column(String(200), default="Chat Baru")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow,
                        onupdate=datetime.datetime.utcnow)

    # Relationships
    user = relationship("Profile", back_populates="chat_sessions")
    messages = relationship("ChatMessage", back_populates="session",
                            cascade="all, delete-orphan",
                            order_by="ChatMessage.created_at")


# ─── Chat Message (AI Chatbot) ───────────────────────────────────

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(UUID(as_uuid=True), primary_key=True,
                server_default=text("gen_random_uuid()"))
    session_id = Column(UUID(as_uuid=True),
                        ForeignKey("chat_sessions.id", ondelete="CASCADE"),
                        nullable=False)
    role = Column(String(20), nullable=False)  # 'user' or 'assistant'
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)

    # Relationships
    session = relationship("ChatSession", back_populates="messages")
