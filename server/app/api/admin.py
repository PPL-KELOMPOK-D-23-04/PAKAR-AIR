"""
Admin API Router — /api/admin/*
Handles: dashboard stats, user management, analysis stats,
         reports (filterable), CSV export
"""
from fastapi import APIRouter, Depends, Query, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime
from uuid import UUID
import io

from app.api.deps import get_admin_user
from app.utils.db import get_db
from app.models.models import Profile
from app.schemas.user import ProfileResponse
from app.services import report_service

router = APIRouter()


# ─── Dashboard Stats (KF-09 + KF-11) ────────────────────────────

@router.get("/dashboard/stats")
async def dashboard_stats(
    admin: Profile = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """
    KF-09 + KF-11: Get combined dashboard statistics.
    """
    return report_service.get_dashboard_stats(db)


# ─── User Management (KF-10) ─────────────────────────────────────

@router.get("/users", response_model=List[ProfileResponse])
async def list_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    admin: Profile = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """
    KF-10: List all users with pagination.
    """
    users = db.query(Profile).offset(skip).limit(limit).all()
    return users


@router.put("/users/{user_id}/status")
async def toggle_user_status(
    user_id: UUID,
    is_active: bool = Query(..., description="Set user active/inactive"),
    admin: Profile = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """
    KF-10: Activate or deactivate a user.
    """
    user = db.query(Profile).filter(Profile.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_active = is_active
    db.commit()
    db.refresh(user)
    return {"message": f"User {'activated' if is_active else 'deactivated'}", "user_id": str(user.id)}


@router.delete("/users/{user_id}")
async def delete_user(
    user_id: UUID,
    admin: Profile = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """
    KF-10: Delete a user (cascades to analyses, notifications, etc).
    """
    user = db.query(Profile).filter(Profile.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted", "user_id": str(user_id)}


# ─── Analysis Stats (KF-11) ──────────────────────────────────────

@router.get("/analysis/stats")
async def analysis_stats(
    admin: Profile = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """
    KF-11: Get detailed analysis statistics (monthly trend, avg confidence).
    """
    return report_service.get_analysis_stats(db)


# ─── Reports (KF-12) ─────────────────────────────────────────────

@router.get("/reports")
async def get_reports(
    date_from: Optional[str] = Query(None, description="Start date (YYYY-MM-DD)"),
    date_to: Optional[str] = Query(None, description="End date (YYYY-MM-DD)"),
    category: Optional[str] = Query(None, description="Filter: layak / tidak_layak"),
    admin: Profile = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """
    KF-12: Get filterable report data.
    """
    dt_from = datetime.fromisoformat(date_from) if date_from else None
    dt_to = datetime.fromisoformat(date_to) if date_to else None
    data = report_service.get_report_data(db, dt_from, dt_to, category)
    return {"items": data, "total": len(data)}


@router.get("/reports/export")
async def export_reports(
    date_from: Optional[str] = Query(None),
    date_to: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    admin: Profile = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """
    KF-12: Export report data as CSV.
    """
    dt_from = datetime.fromisoformat(date_from) if date_from else None
    dt_to = datetime.fromisoformat(date_to) if date_to else None
    data = report_service.get_report_data(db, dt_from, dt_to, category)
    csv_content = report_service.export_csv(data)

    return StreamingResponse(
        io.StringIO(csv_content),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=pakar_air_report.csv"},
    )
