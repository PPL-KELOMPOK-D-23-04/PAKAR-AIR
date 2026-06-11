from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List, Any
from uuid import UUID
from datetime import datetime



class ManualInputData(BaseModel):
    ph: float = Field(7.0, ge=0, le=14, description="Derajat keasaman")
    Hardness: float = Field(..., description="Tingkat kesadahan air")
    Solids: float = Field(..., description="Total padatan terlarut (TDS)")
    Chloramines: float = Field(..., description="Kandungan kloramin")
    Sulfate: float = Field(..., description="Kandungan sulfat")
    Conductivity: float = Field(..., description="Daya hantar listrik")
    Organic_carbon: float = Field(..., description="Kandungan karbon organik")
    Trihalomethanes: float = Field(..., description="Kandungan trihalometana")
    Turbidity: float = Field(..., description="Tingkat kekeruhan")



class DetectionItem(BaseModel):
    label: str      
    confidence: float 
    bbox: Optional[List[float]] = None  


class AnalysisResultResponse(BaseModel):
    id: UUID
    analysis_id: UUID
    category: Optional[str] = None        
    confidence: Optional[float] = None    
    dl_category: Optional[str] = None
    dl_confidence: Optional[float] = None
    dl_detections: Optional[List[DetectionItem]] = None
    ml_category: Optional[str] = None
    ml_confidence: Optional[float] = None
    ml_feature_importance: Optional[dict] = None
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
    category: Optional[str] = None
    confidence: Optional[float] = None
    image_path: Optional[str] = None
    original_filename: Optional[str] = None
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
