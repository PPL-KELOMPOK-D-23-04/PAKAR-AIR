"""
Chatbot Tools — Database interaction functions for AI.
These functions are designed to be called by Gemini via Function Calling.
"""
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.models import Profile, Analysis, ChatSession

def get_system_stats(db: Session):
    """
    Mengambil statistik umum sistem PAKAR-AIR seperti total pengguna, 
    total data analisis, dan total sesi chat.
    """
    try:
        total_users = db.query(Profile).count()
        total_analyses = db.query(Analysis).count()
        total_sessions = db.query(ChatSession).count()
        
        return {
            "total_users": total_users,
            "total_analyses": total_analyses,
            "total_chat_sessions": total_sessions,
            "status": "success"
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

def get_water_quality_summary(db: Session):
    """
    Mengambil ringkasan statistik kualitas air berdasarkan seluruh data analisis.
    """
    try:
        # Menghitung berdasarkan kolom 'status' di Analysis
        stats = db.query(
            Analysis.status, 
            func.count(Analysis.id)
        ).group_by(Analysis.status).all()
        
        # Mapping enum value ke string
        summary = {str(row[0].value if hasattr(row[0], 'value') else row[0]): row[1] for row in stats}
        
        return {
            "summary": summary,
            "total_records": sum(summary.values()),
            "status": "success"
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

def get_latest_analyses_brief(db: Session, limit: int = 5):
    """
    Mengambil ringkasan singkat dari beberapa laporan analisis terbaru.
    """
    try:
        analyses = (
            db.query(Analysis)
            .order_by(Analysis.created_at.desc())
            .limit(limit)
            .all()
        )
        
        result = []
        for a in analyses:
            result.append({
                "id": str(a.id),
                "created_at": a.created_at.strftime("%Y-%m-%d %H:%M"),
                "status": a.status.value if hasattr(a.status, 'value') else str(a.status),
                "user_id": str(a.user_id)
            })
            
        return {
            "latest_analyses": result,
            "status": "success"
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
