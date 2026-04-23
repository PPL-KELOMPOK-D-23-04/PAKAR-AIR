"""
History API Router — /api/history
Handles: GET paginated analysis history for current user
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.utils.db import get_db
from app.models.models import Profile
from app.schemas.analysis_schema import HistoryResponse, AnalysisSummary
from app.services import analysis_service

router = APIRouter()


@router.get("", response_model=HistoryResponse)
async def get_history(
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(10, ge=1, le=50, description="Items per page"),
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    KF-07: Get paginated analysis history for current user.
    """
    items, total, total_pages = analysis_service.get_user_history(
        user_id=current_user.id,
        page=page,
        per_page=per_page,
        db=db,
    )

    summaries = []
    for a in items:
        summaries.append(AnalysisSummary(
            id=a.id,
            status=a.status.value if a.status else "unknown",
            created_at=a.created_at,
            category=a.result.category if a.result else None,
            confidence=a.result.confidence if a.result else None,
            image_path=a.image_input.image_path if a.image_input else None,
            water_color=(a.manual_input.data_json or {}).get("water_color")
                if a.manual_input else None,
            water_source=(a.manual_input.data_json or {}).get("water_source")
                if a.manual_input else None,
        ))

    return HistoryResponse(
        items=summaries,
        total=total,
        page=page,
        per_page=per_page,
        total_pages=total_pages,
    )
