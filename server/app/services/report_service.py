"""
Report service — admin analytics, statistics, and CSV/PDF export.
Supports KF-09 (user stats), KF-11 (analysis stats), KF-12 (reports + export).
"""
import csv
import io
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.models import Profile, Analysis, AnalysisResult, AnalysisStatus


def get_dashboard_stats(db: Session) -> dict:
    """
    KF-09 + KF-11: Combined admin dashboard statistics.
    """
    total_users = db.query(func.count(Profile.id)).scalar()
    active_users = db.query(func.count(Profile.id)).filter(
        Profile.is_active == True
    ).scalar()

    total_analyses = db.query(func.count(Analysis.id)).scalar()
    completed_analyses = db.query(func.count(Analysis.id)).filter(
        Analysis.status == AnalysisStatus.completed
    ).scalar()

    # Result distribution
    layak_count = db.query(func.count(AnalysisResult.id)).filter(
        AnalysisResult.category == "layak"
    ).scalar()
    tidak_layak_count = db.query(func.count(AnalysisResult.id)).filter(
        AnalysisResult.category == "tidak_layak"
    ).scalar()

    # Recent 7 days
    week_ago = datetime.utcnow() - timedelta(days=7)
    recent_analyses = db.query(func.count(Analysis.id)).filter(
        Analysis.created_at >= week_ago
    ).scalar()
    recent_users = db.query(func.count(Profile.id)).filter(
        Profile.created_at >= week_ago
    ).scalar()

    return {
        "users": {
            "total": total_users,
            "active": active_users,
            "new_this_week": recent_users,
        },
        "analyses": {
            "total": total_analyses,
            "completed": completed_analyses,
            "this_week": recent_analyses,
        },
        "results": {
            "layak": layak_count,
            "tidak_layak": tidak_layak_count,
        },
    }


def get_analysis_stats(db: Session) -> dict:
    """KF-11: Detailed analysis statistics."""
    # Monthly trend (last 6 months)
    trends = []
    for i in range(5, -1, -1):
        month_start = datetime.utcnow().replace(day=1) - timedelta(days=30 * i)
        month_end = month_start + timedelta(days=30)
        count = db.query(func.count(Analysis.id)).filter(
            Analysis.created_at >= month_start,
            Analysis.created_at < month_end,
        ).scalar()
        trends.append({
            "month": month_start.strftime("%Y-%m"),
            "count": count,
        })

    # Average confidence
    avg_confidence = db.query(
        func.avg(AnalysisResult.confidence)
    ).scalar() or 0.0

    return {
        "monthly_trend": trends,
        "average_confidence": round(float(avg_confidence), 3),
    }


def get_report_data(
    db: Session,
    date_from: datetime = None,
    date_to: datetime = None,
    category: str = None,
) -> list:
    """KF-12: Filterable report data."""
    query = db.query(Analysis).join(
        AnalysisResult, Analysis.id == AnalysisResult.analysis_id, isouter=True
    ).join(
        Profile, Analysis.user_id == Profile.id
    )

    if date_from:
        query = query.filter(Analysis.created_at >= date_from)
    if date_to:
        query = query.filter(Analysis.created_at <= date_to)
    if category:
        query = query.filter(AnalysisResult.category == category)

    analyses = query.order_by(Analysis.created_at.desc()).all()

    rows = []
    for a in analyses:
        rows.append({
            "analysis_id": str(a.id),
            "user": a.owner.full_name if a.owner else "N/A",
            "username": a.owner.username if a.owner else "N/A",
            "status": a.status.value if a.status else "N/A",
            "category": a.result.category if a.result else "N/A",
            "confidence": a.result.confidence if a.result else None,
            "created_at": a.created_at.isoformat() if a.created_at else "",
        })
    return rows


def export_csv(report_data: list) -> str:
    """Generate CSV string from report data."""
    if not report_data:
        return ""

    output = io.StringIO()
    fieldnames = report_data[0].keys()
    writer = csv.DictWriter(output, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(report_data)
    return output.getvalue()
