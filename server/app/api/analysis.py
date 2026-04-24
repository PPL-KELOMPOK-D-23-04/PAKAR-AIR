"""
Analysis API Router — /api/analysis/*
Handles: POST submit analysis, GET analysis result
"""
import json
from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.utils.db import get_db
from app.utils.file_handler import save_upload_image
from app.models.models import Profile
from app.schemas.analysis_schema import (
    AnalysisSubmitResponse, AnalysisDetailResponse, AnalysisResultResponse,
)
from app.services import analysis_service
from app.config import settings
from uuid import UUID

router = APIRouter()


@router.post("", response_model=AnalysisSubmitResponse)
async def submit_analysis(
    image: UploadFile = File(..., description="Foto/citra air"),
    manual_data: str = Form(..., description="JSON string of manual input data"),
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    KF-03 + KF-04 + KF-05: Submit analysis.
    Uploads image + manual data → runs DL + ML → returns result.

    manual_data should be a JSON string with fields:
    - ph: float (0 - 14)
    - Hardness: float
    - Solids: float
    - Chloramines: float
    - Sulfate: float
    - Conductivity: float
    - Organic_carbon: float
    - Trihalomethanes: float
    - Turbidity: float
    """
    # Parse manual data JSON
    try:
        manual_dict = json.loads(manual_data)
    except json.JSONDecodeError:
        from fastapi import HTTPException
        raise HTTPException(status_code=400, detail="Invalid JSON in manual_data")

    # Save image
    file_info = await save_upload_image(image, upload_folder=settings.UPLOAD_FOLDER)

    # Create analysis record
    analysis = analysis_service.create_analysis(
        user=current_user,
        image_path=file_info["image_path"],
        original_filename=file_info["original_filename"],
        manual_data=manual_dict,
        db=db,
    )

    # Run ML/DL pipeline
    result = analysis_service.run_analysis(analysis.id, db)

    return AnalysisSubmitResponse(
        analysis_id=analysis.id,
        status="completed",
        message="Analisis berhasil diselesaikan",
    )


@router.get("/{analysis_id}")
async def get_analysis(
    analysis_id: UUID,
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    KF-06: Get analysis detail with results.
    """
    analysis = analysis_service.get_analysis_detail(
        analysis_id, current_user.id, db
    )

    return {
        "id": str(analysis.id),
        "user_id": str(analysis.user_id),
        "status": analysis.status.value if analysis.status else None,
        "created_at": analysis.created_at.isoformat() if analysis.created_at else None,
        "image_input": {
            "image_path": analysis.image_input.image_path,
            "original_filename": analysis.image_input.original_filename,
        } if analysis.image_input else None,
        "manual_input": analysis.manual_input.data_json if analysis.manual_input else None,
        "result": {
            "id": str(analysis.result.id),
            "category": analysis.result.category,
            "confidence": analysis.result.confidence,
            "dl_category": analysis.result.dl_category,
            "dl_confidence": analysis.result.dl_confidence,
            "dl_detections": analysis.result.dl_detections,
            "ml_category": analysis.result.ml_category,
            "ml_confidence": analysis.result.ml_confidence,
            "ml_feature_importance": analysis.result.ml_feature_importance,
            "explanation": analysis.result.explanation,
            "recommendation": analysis.result.recommendation,
        } if analysis.result else None,
    }
