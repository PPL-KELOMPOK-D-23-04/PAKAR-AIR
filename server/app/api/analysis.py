import json
import csv
import io
from fastapi import APIRouter, Depends, UploadFile, File, Form, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from uuid import UUID
from supabase import Client

from app.api.deps import get_current_user
from app.utils.db import get_db
from app.utils.supabase import get_supabase
from app.utils.file_handler import upload_to_supabase
from app.models.models import Profile
from app.schemas.analysis_schema import (
    AnalysisSubmitResponse, AnalysisDetailResponse, AnalysisResultResponse, HistoryResponse
)
from app.services import analysis_service

router = APIRouter()

@router.post("", response_model=AnalysisSubmitResponse)
async def submit_analysis(
    image: UploadFile = File(..., description="Foto/citra air"),
    manual_data: str = Form(..., description="JSON string of manual input data"),
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
    supabase: Client = Depends(get_supabase),
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
    try:
        manual_dict = json.loads(manual_data)
    except json.JSONDecodeError:
        from fastapi import HTTPException
        raise HTTPException(status_code=400, detail="Invalid JSON in manual_data")

    # Save image to Supabase Bucket 'analyses'
    public_url = await upload_to_supabase(
        file=image,
        supabase=supabase,
        bucket_name="analyses",
        folder=str(current_user.id)
    )

    # Create analysis record
    analysis = analysis_service.create_analysis(
        user=current_user,
        image_path=public_url,
        original_filename=image.filename,
        manual_data=manual_dict,
        db=db,
    )

    # Run ML/DL pipeline without blocking the async event loop
    from starlette.concurrency import run_in_threadpool
    result = await run_in_threadpool(analysis_service.run_analysis, analysis.id, db)

    return AnalysisSubmitResponse(
        analysis_id=analysis.id,
        status="completed",
        message="Analisis berhasil diselesaikan",
    )


@router.get("/history", response_model=HistoryResponse)
async def get_history(
    page: int = 1,
    per_page: int = 10,
    category: str = None,
    date: str = None,
    search: str = None,
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    KF-07: Get analysis history for current user with optional filters.
    Query params: category (layak|tidak_layak), date (YYYY-MM-DD), search (water_source keyword)
    """
    items, total, total_pages = analysis_service.get_user_history(
        current_user.id, page, per_page, db,
        category=category,
        date=date,
        search=search,
    )

    # Map models to Summary schema
    history_items = []
    for a in items:
        # Extract display fields from manual_input.data_json
        manual_data = a.manual_input.data_json if a.manual_input else {}
        history_items.append({
            "id": a.id,
            "status": a.status.value if a.status else "unknown",
            "created_at": a.created_at,
            "category": a.result.category if a.result else None,
            "confidence": a.result.confidence if a.result else None,
            "image_path": a.image_input.image_path if a.image_input else None,
            "ph": manual_data.get("ph"),
            "Turbidity": manual_data.get("Turbidity"),
        })

    return {
        "items": history_items,
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages
    }

@router.get("/export/csv", summary="Export riwayat analisis ke CSV")
async def export_history_csv(
    category: str = Query(None, description="Filter hasil: layak / tidak_layak"),
    date: str = Query(None, description="Filter tanggal format YYYY-MM-DD"),
    search: str = Query(None, description="Kata kunci sumber air"),
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    KF-08: Export seluruh riwayat analisis user sebagai file CSV siap unduh.

    - Mendukung filter kategori, tanggal, dan kata kunci sumber air.
    - Kolom: No, Tanggal, Sumber Air, Warna Air, pH, Turb., Hasil, Confidence (%), Status.
    - Nama file otomatis menyertakan username dan tanggal ekspor.
    - Response header X-Total-Count berisi jumlah baris data yang diekspor.
    """
    items, total, _ = analysis_service.get_user_history(
        current_user.id, page=1, per_page=10000, db=db,
        category=category,
        date=date,
        search=search,
    )

    output = io.StringIO()
    fieldnames = [
        "No", "Tanggal", "Sumber Air", "Warna Air", "pH", "Turbidity",
        "Hasil", "Confidence (%)", "Status"
    ]
    writer = csv.DictWriter(output, fieldnames=fieldnames)
    writer.writeheader()

    for idx, a in enumerate(items, start=1):
        manual_data = a.manual_input.data_json if a.manual_input else {}
        category_val = a.result.category if a.result else "N/A"
        confidence_val = a.result.confidence if a.result else None
        writer.writerow({
            "No": idx,
            "Tanggal": a.created_at.strftime("%d/%m/%Y %H:%M") if a.created_at else "",
            "Sumber Air": manual_data.get("water_source", "N/A"),
            "Warna Air": manual_data.get("water_color", "N/A"),
            "pH": manual_data.get("water_ph", "N/A"),
            "Turbidity": manual_data.get("Turbidity", "N/A"),
            "Hasil": "Layak" if category_val == "layak" else ("Tidak Layak" if category_val == "tidak_layak" else "N/A"),
            "Confidence (%)": f"{confidence_val * 100:.1f}" if confidence_val is not None else "N/A",
            "Status": a.status.value if a.status else "N/A",
        })

    output.seek(0)

    from datetime import date as dt_date
    today = dt_date.today().strftime("%Y%m%d")
    filename = f"riwayat_analisis_{current_user.username}_{today}.csv"

    return StreamingResponse(
        output,
        media_type="text/csv; charset=utf-8",
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
            "X-Total-Count": str(total),
            "Access-Control-Expose-Headers": "X-Total-Count",
        },
    )


@router.get("/export/{analysis_id}/detail")
async def export_single_analysis(
    analysis_id: UUID,
    current_user: Profile = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    analysis = analysis_service.get_analysis_detail(
        analysis_id, current_user.id, db
    )
    manual = analysis.manual_input.data_json if analysis.manual_input else {}
    result = analysis.result
    return {
        "id": str(analysis.id),
        "created_at": analysis.created_at.isoformat() if analysis.created_at else None,
        "user": {
            "full_name": analysis.owner.full_name if analysis.owner else current_user.full_name,
            "username": analysis.owner.username if analysis.owner else current_user.username,
        },
        "manual_input": {
            "water_source": manual.get("water_source", "N/A"),
            "water_color": manual.get("water_color", "N/A"),
            "water_smell": manual.get("water_smell", "N/A"),
            "water_ph": manual.get("water_ph", "N/A"),
            "water_temperature": manual.get("water_temperature", "N/A"),
            "environment_condition": manual.get("environment_condition", "N/A"),
            "additional_notes": manual.get("additional_notes", ""),
        },
        "result": {
            "category": result.category if result else None,
            "confidence": result.confidence if result else None,
            "dl_category": result.dl_category if result else None,
            "dl_confidence": result.dl_confidence if result else None,
            "ml_category": result.ml_category if result else None,
            "ml_confidence": result.ml_confidence if result else None,
            "explanation": result.explanation if result else None,
            "recommendation": result.recommendation if result else None,
        } if result else None,
        "image_path": analysis.image_input.image_path if analysis.image_input else None,
    }

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
