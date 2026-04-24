"""
ML Service — wraps the ML/DL inference engine.
Calls yolo_detector, rf_classifier, and fusion modules.
If model files are missing, returns placeholder results.
"""
import os
import logging

logger = logging.getLogger(__name__)

# Model file paths
YOLO_MODEL_PATH = os.path.join("ML_DL", "saved_models", "water_yolo.pt")
RF_MODEL_PATH = os.path.join("ML_DL", "saved_models", "random_forest_model.pkl")
SCALER_PATH = os.path.join("ML_DL", "saved_models", "scaler.pkl")


def _models_available() -> dict:
    """Check which model files are present."""
    return {
        "yolo": os.path.exists(YOLO_MODEL_PATH),
        "rf": os.path.exists(RF_MODEL_PATH) and os.path.exists(SCALER_PATH),
    }


def run_full_inference(image_path: str | None, manual_data: dict) -> dict:
    """
    Run the full DL + ML + Fusion pipeline.
    Returns a dict with all result fields.
    """
    available = _models_available()

    # ── DL Inference (YOLO) ──────────────────────────────
    dl_result = {"category": None, "confidence": 0.0, "detections": []}
    if image_path and available["yolo"]:
        try:
            from ML_DL.yolo_detector import predict_image
            dl_result = predict_image(image_path)
        except Exception as e:
            logger.error(f"YOLO inference failed: {e}")
    elif image_path and not available["yolo"]:
        logger.warning("YOLO model not found, using placeholder")
        dl_result = _placeholder_dl_result()

    # ── ML Inference (Random Forest) ─────────────────────
    ml_result = {"category": None, "confidence": 0.0, "feature_importance": {}}
    if manual_data and available["rf"]:
        try:
            from ML_DL.rf_classifier import predict_manual
            ml_result = predict_manual(manual_data)
        except Exception as e:
            logger.error(f"RF inference failed: {e}")
    elif manual_data and not available["rf"]:
        logger.warning("RF model not found, using placeholder")
        ml_result = _placeholder_ml_result(manual_data)

    # ── Fusion ───────────────────────────────────────────
    from ML_DL.fusion import fuse_results
    final = fuse_results(dl_result, ml_result)

    return {
        # Final
        "category": final["category"],
        "confidence": final["confidence"],
        # DL
        "dl_category": dl_result.get("category"),
        "dl_confidence": dl_result.get("confidence", 0.0),
        "dl_detections": dl_result.get("detections", []),
        # ML
        "ml_category": ml_result.get("category"),
        "ml_confidence": ml_result.get("confidence", 0.0),
        "ml_feature_importance": ml_result.get("feature_importance", {}),
        # Explanation
        "explanation": final.get("explanation", ""),
        "recommendation": final.get("recommendation", ""),
    }


# ─── Placeholder results when models are not available ──────────

def _placeholder_dl_result() -> dict:
    """Return placeholder DL result for when model is not loaded."""
    return {
        "category": "tidak_layak",
        "confidence": 0.0,
        "detections": [
            {"label": "placeholder", "confidence": 0.0}
        ],
    }


def _placeholder_ml_result(manual_data: dict) -> dict:
    """Return placeholder ML result based on simple heuristics."""
    # Simple rule-based fallback based on chemical features
    score = 0.5
    ph = float(manual_data.get("ph", 7.0))
    turbidity = float(manual_data.get("Turbidity", 3.0))

    # Basic heuristic: extreme pH is bad
    if 6.5 <= ph <= 8.5:
        score += 0.2
    else:
        score -= 0.3

    # Basic heuristic: high turbidity is bad
    if turbidity < 4.0:
        score += 0.2
    else:
        score -= 0.3

    score = max(0.0, min(1.0, score))
    category = "layak" if score > 0.5 else "tidak_layak"

    return {
        "category": category,
        "confidence": score,
        "feature_importance": {
            "ph": 0.25,
            "Turbidity": 0.25,
            "Solids": 0.10,
            "Hardness": 0.10,
            "Chloramines": 0.10,
            "Sulfate": 0.05,
            "Conductivity": 0.05,
            "Organic_carbon": 0.05,
            "Trihalomethanes": 0.05,
        },
    }
