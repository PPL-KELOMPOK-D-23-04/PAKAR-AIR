from sqlalchemy import Column, String, Float, Boolean, DateTime, ForeignKey, Enum, text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime
import enum

Base = declarative_base()

class AnalysisStatus(enum.Enum):
    pending = "pending"
    processing = "processing"
    completed = "completed"
    failed = "failed"

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    full_name = Column(String(100), nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    avatar_url = Column(String(255), nullable=True)
    is_admin = Column(Boolean, default=False) # Sederhana: True/False
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    analyses = relationship("Analysis", back_populates="owner")
    notifications = relationship("Notification", back_populates="user")

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="CASCADE"))
    status = Column(Enum(AnalysisStatus), default=AnalysisStatus.pending)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)

    owner = relationship("Profile", back_populates="analyses")
    image_input = relationship("ImageInput", back_populates="analysis", uselist=False)
    manual_input = relationship("ManualInput", back_populates="analysis", uselist=False)
    result = relationship("AnalysisResult", back_populates="analysis", uselist=False)

class ImageInput(Base):
    __tablename__ = "image_inputs"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    analysis_id = Column(UUID(as_uuid=True), ForeignKey("analyses.id", ondelete="CASCADE"))
    image_path = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)

    analysis = relationship("Analysis", back_populates="image_input")

class ManualInput(Base):
    __tablename__ = "manual_inputs"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    analysis_id = Column(UUID(as_uuid=True), ForeignKey("analyses.id", ondelete="CASCADE"))
    data_json = Column(JSONB, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)

    analysis = relationship("Analysis", back_populates="manual_input")

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    analysis_id = Column(UUID(as_uuid=True), ForeignKey("analyses.id", ondelete="CASCADE"))
    category = Column(String(50))
    confidence = Column(Float)
    recommendation = Column(String)
    raw_output = Column(JSONB)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)

    analysis = relationship("Analysis", back_populates="result")

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="CASCADE"))
    analysis_id = Column(UUID(as_uuid=True), ForeignKey("analyses.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(100), nullable=False)
    message = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)

    user = relationship("Profile", back_populates="notifications")
