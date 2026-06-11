"""
Fusion layer — combines DL (YOLO) and ML (Random Forest) results.
Formula: Final Score = DL×0.4 + ML×0.6
Threshold: score > 0.5 → LAYAK, else → TIDAK LAYAK
"""


DL_WEIGHT = 0.4
ML_WEIGHT = 0.6
THRESHOLD = 0.5


def fuse_results(dl_result: dict, ml_result: dict) -> dict:
    # Convert categories to scores
    dl_score = _category_to_score(dl_result.get("category"), dl_result.get("confidence", 0.0))
    ml_score = _category_to_score(ml_result.get("category"), ml_result.get("confidence", 0.0))

    # Weighted fusion
    final_score = (dl_score * DL_WEIGHT) + (ml_score * ML_WEIGHT)
    final_category = "layak" if final_score > THRESHOLD else "tidak_layak"

    # Generate explanation
    explanation = _generate_explanation(dl_result, ml_result, final_score, final_category)
    recommendation = _generate_recommendation(final_category, dl_result, ml_result)

    return {
        "category": final_category,
        "confidence": round(final_score, 4),
        "explanation": explanation,
        "recommendation": recommendation,
    }


def _category_to_score(category: str | None, confidence: float) -> float:
    """Convert category + confidence to a 0-1 score where 1 = layak."""
    if category is None:
        return 0.5  # neutral if no result
    if category == "layak":
        return confidence
    else:
        return 1.0 - confidence


def _generate_explanation(dl_result, ml_result, score, category) -> str:
    """Generate human-readable explanation of the fusion result."""
    parts = []

    # DL explanation
    detections = dl_result.get("detections", [])
    if detections:
        labels = [f"{d['label']} ({d['confidence']:.0%})" for d in detections[:5]]
        parts.append(f"• Analisis Citra (Deep Learning): Terdeteksi {', '.join(labels)}.")
    else:
        parts.append("• Analisis Citra (Deep Learning): Tidak ada objek signifikan yang terdeteksi.")

    # ML explanation
    ml_cat = ml_result.get("category")
    ml_conf = ml_result.get("confidence", 0)
    if ml_cat:
        status = "LAYAK" if ml_cat == "layak" else "TIDAK LAYAK"
        parts.append(f"• Analisis Parameter (Machine Learning): Diprediksi {status} dengan confidence {ml_conf:.0%}.")

    # Final
    final_status = "LAYAK" if category == "layak" else "TIDAK LAYAK"
    parts.append(f"• Kesimpulan Akhir (Pembobotan DL {DL_WEIGHT*100:.0f}% + ML {ML_WEIGHT*100:.0f}%): Kualitas air dinyatakan {final_status} ({score:.0%}).")

    return "\n".join(parts)


def _generate_recommendation(category, dl_result, ml_result) -> str:
    """Generate recommendation based on results."""
    if category == "layak":
        return (
            "Air ini layak digunakan berdasarkan analisis citra dan data manual. "
            "Tetap perhatikan kondisi air secara berkala dan pastikan sumber air "
            "terjaga kebersihannya."
        )
    else:
        issues = []
        for d in dl_result.get("detections", []):
            if d["label"] != "air_jernih":
                issues.append(d["label"].replace("_", " "))

        ml_data = ml_result.get("feature_importance", {})

        rec = "Air ini TIDAK LAYAK digunakan secara langsung. "
        if issues:
            rec += f"Masalah visual: {', '.join(issues)}. "
        rec += (
            "Rekomendasi: lakukan pengolahan air terlebih dahulu (filtrasi, "
            "penjernihan, dan/atau perebusan) sebelum digunakan untuk kebutuhan "
            "sehari-hari. Konsultasikan dengan dinas kesehatan setempat jika "
            "diperlukan pengujian laboratorium lebih lanjut."
        )
        return rec
