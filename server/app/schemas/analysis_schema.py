"""Pydantic schemas for Analysis (submit, result, history)."""
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List, Any
from uuid import UUID
from datetime import datetime


# ─── Manual Input Data ────────────────────────────────────────────

class ManualInputData(BaseModel):
    """Data manual kualitas air (Parameter Kimia) untuk model Random Forest."""
    ph: float = Field(7.0, ge=0, le=14, description="Derajat keasaman")
    Hardness: float = Field(..., description="Tingkat kesadahan air")
    Solids: float = Field(..., description="Total padatan terlarut (TDS)")
    Chloramines: float = Field(..., description="Kandungan kloramin")
    Sulfate: float = Field(..., description="Kandungan sulfat")
    Conductivity: float = Field(..., description="Daya hantar listrik")
    Organic_carbon: float = Field(..., description="Kandungan karbon organik")
    Trihalomethanes: float = Field(..., description="Kandungan trihalometana")
    Turbidity: float = Field(..., description="Tingkat kekeruhan")


# ─── DL Detection Item ───────────────────────────────────────────

class DetectionItem(BaseModel):
    label: str       # e.g. "air_keruh", "sampah"
    confidence: float  # 0.0 – 1.0
    bbox: Optional[List[float]] = None  # [x1, y1, x2, y2]


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
    """Ringkasan satu item riwayat analisis."""
    id: UUID
    status: str
    created_at: datetime
    # Ringkasan hasil
    category: Optional[str] = None
    confidence: Optional[float] = None
    image_path: Optional[str] = None
    # Parameter kunci yang ditampilkan di daftar
    ph: Optional[float] = None
    turbidity: Optional[float] = Field(None, alias="Turbidity")


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
