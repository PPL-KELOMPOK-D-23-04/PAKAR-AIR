"""Pydantic schemas for Analysis (submit, result, history)."""
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List, Any
from uuid import UUID
from datetime import datetime


# ─── Manual Input Data ────────────────────────────────────────────

class ManualInputData(BaseModel):
    """Data manual kualitas air dari form user (KF-04)."""
    water_color: str = Field(..., description="jernih / kuning / coklat / hijau / putih")
    water_smell: str = Field(..., description="tidak_berbau / sedikit / menyengat")
    water_source: str = Field(..., description="sumur / sungai / PDAM / mata_air / danau")
    environment_condition: str = Field(..., description="bersih / cukup_bersih / kotor")
    water_ph: Optional[float] = Field(7.0, ge=0, le=14, description="pH air, default 7.0")
    water_temperature: Optional[float] = Field(25.0, description="Suhu air °C, default 25.0")
    additional_notes: Optional[str] = None


# ─── DL Detection Item ───────────────────────────────────────────

class DetectionItem(BaseModel):
    label: str       # e.g. "air_keruh", "sampah"
    confidence: float  # 0.0 – 1.0


# ─── Analysis Result Response ────────────────────────────────────

class AnalysisResultResponse(BaseModel):
    """Response for GET /api/analysis/:id"""
    id: UUID
    analysis_id: UUID
    # Final
    category: Optional[str] = None        # "layak" / "tidak_layak"
    confidence: Optional[float] = None
    # DL
    dl_category: Optional[str] = None
    dl_confidence: Optional[float] = None
    dl_detections: Optional[List[DetectionItem]] = None
    # ML
    ml_category: Optional[str] = None
    ml_confidence: Optional[float] = None
    ml_feature_importance: Optional[dict] = None
    # Explanation
    explanation: Optional[str] = None
    recommendation: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ─── Analysis Summary (for history list) ─────────────────────────

class AnalysisSummary(BaseModel):
    """One item in GET /api/history list."""
    id: UUID
    status: str
    created_at: datetime
    # Inline result summary
    category: Optional[str] = None
    confidence: Optional[float] = None
    image_path: Optional[str] = None
    water_color: Optional[str] = None
    water_source: Optional[str] = None


# ─── Full Analysis Detail ────────────────────────────────────────

class AnalysisDetailResponse(BaseModel):
    """Full detail for GET /api/analysis/:id"""
    id: UUID
    user_id: UUID
    status: str
    created_at: datetime
    image_input: Optional[dict] = None
    manual_input: Optional[dict] = None
    result: Optional[AnalysisResultResponse] = None


# ─── Analysis Submit Response ─────────────────────────────────────

class AnalysisSubmitResponse(BaseModel):
    """Response after POST /api/analysis"""
    analysis_id: UUID
    status: str
    message: str


# ─── History Pagination ──────────────────────────────────────────

class HistoryResponse(BaseModel):
    """Paginated response for GET /api/history"""
    items: List[AnalysisSummary]
    total: int
    page: int
    per_page: int
    total_pages: int
