"""
Analysis service — orchestrates the full analysis pipeline:
1. Save inputs (image + manual data) to DB
2. Run DL inference (YOLO)
3. Run ML inference (Random Forest)
4. Fuse results
5. Save result to DB
6. Create notification
"""
from sqlalchemy.orm import Session
from sqlalchemy import cast, Date
from fastapi import HTTPException
from uuid import UUID
from typing import Optional
import json

from app.models.models import (
    Analysis, ImageInput, ManualInput, AnalysisResult,
    AnalysisStatus, Profile
)
from app.services.ml_service import run_full_inference
from app.services.notification_service import create_notification


def create_analysis(
    user: Profile,
    image_path: str,
    original_filename: str,
    manual_data: dict,
    db: Session
) -> Analysis:
    """Create a new analysis record with inputs."""
    # 1. Create analysis record
    analysis = Analysis(user_id=user.id, status=AnalysisStatus.pending)
    db.add(analysis)
    db.flush()  # get analysis.id

    # 2. Save image input
    img_input = ImageInput(
        analysis_id=analysis.id,
        image_path=image_path,
        original_filename=original_filename,
    )
    db.add(img_input)

    # 3. Save manual input
    man_input = ManualInput(
        analysis_id=analysis.id,
        data_json=manual_data,
    )
    db.add(man_input)

    db.commit()
    db.refresh(analysis)
    return analysis


def run_analysis(analysis_id: UUID, db: Session) -> AnalysisResult:
    """Execute the ML/DL pipeline on an existing analysis."""
    analysis = db.query(Analysis).filter(Analysis.id == analysis_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    # Mark as processing
    analysis.status = AnalysisStatus.processing
    db.commit()

    try:
        # Get inputs
        image_path = analysis.image_input.image_path if analysis.image_input else None
        manual_data = analysis.manual_input.data_json if analysis.manual_input else {}

        # Run inference pipeline
        result_data = run_full_inference(image_path, manual_data)

        # Save result
        result = AnalysisResult(
            analysis_id=analysis.id,
            category=result_data["category"],
            confidence=result_data["confidence"],
            dl_category=result_data.get("dl_category"),
            dl_confidence=result_data.get("dl_confidence"),
            dl_detections=result_data.get("dl_detections"),
            ml_category=result_data.get("ml_category"),
            ml_confidence=result_data.get("ml_confidence"),
            ml_feature_importance=result_data.get("ml_feature_importance"),
            explanation=result_data.get("explanation"),
            recommendation=result_data.get("recommendation"),
            raw_output=result_data,
        )
        db.add(result)

        # Mark as completed
        analysis.status = AnalysisStatus.completed
        db.commit()
        db.refresh(result)

        # Create notification
        category_label = "✅ Layak" if result.category == "layak" else "❌ Tidak Layak"
        create_notification(
            user_id=analysis.user_id,
            analysis_id=analysis.id,
            title="Hasil Analisis Selesai",
            message=f"Analisis air Anda selesai. Hasil: {category_label} "
                    f"(confidence: {result.confidence:.0%})",
            notif_type="analysis_complete",
            db=db,
        )

        return result

    except Exception as e:
        analysis.status = AnalysisStatus.failed
        db.commit()
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )


def get_analysis_detail(analysis_id: UUID, user_id: UUID, db: Session) -> Analysis:
    """Get full analysis detail. User can only view own analyses."""
    analysis = db.query(Analysis).filter(
        Analysis.id == analysis_id,
        Analysis.user_id == user_id
    ).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return analysis


def get_user_history(
    user_id: UUID,
    page: int,
    per_page: int,
    db: Session,
    category: Optional[str] = None,
    date: Optional[str] = None,
    search: Optional[str] = None,
):
    """Get paginated analysis history for a user with optional filters."""
    from app.utils.helpers import paginate
    from app.models.models import AnalysisResult, ManualInput

    query = db.query(Analysis).filter(
        Analysis.user_id == user_id
    )

    # Filter by category (join to AnalysisResult)
    if category:
        query = query.join(AnalysisResult, Analysis.id == AnalysisResult.analysis_id)\
                     .filter(AnalysisResult.category == category)

    # Filter by date (match created_at date portion)
    if date:
        query = query.filter(
            cast(Analysis.created_at, Date) == date
        )

    # Filter by search keyword in water_source field inside manual_input data_json
    if search:
        query = query.join(ManualInput, Analysis.id == ManualInput.analysis_id, isouter=True)\
                     .filter(
                         ManualInput.data_json["water_source"].astext.ilike(f"%{search}%")
                     )

    query = query.order_by(Analysis.created_at.desc())

    items, total, total_pages = paginate(query, page, per_page)
    return items, total, total_pages
