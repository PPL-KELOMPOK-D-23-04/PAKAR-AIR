"""
ML Service — wraps the ML/DL inference engine.
Calls yolo_detector, rf_classifier, and fusion modules.
If model files are missing, returns placeholder results.
"""
import os
import logging

logger = logging.getLogger(__name__)

# Model file paths
YOLO_MODEL_PATH = os.path.join("ml", "saved_models", "water_yolo.pt")
RF_MODEL_PATH = os.path.join("ml", "saved_models", "water_rf.pkl")
LABEL_ENCODER_PATH = os.path.join("ml", "saved_models", "label_encoder.pkl")


def _models_available() -> dict:
    """Check which model files are present."""
    return {
        "yolo": os.path.exists(YOLO_MODEL_PATH),
        "rf": os.path.exists(RF_MODEL_PATH),
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
            from ml.yolo_detector import predict_image
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
            from ml.rf_classifier import predict_manual
            ml_result = predict_manual(manual_data)
        except Exception as e:
            logger.error(f"RF inference failed: {e}")
    elif manual_data and not available["rf"]:
        logger.warning("RF model not found, using placeholder")
        ml_result = _placeholder_ml_result(manual_data)

    # ── Fusion ───────────────────────────────────────────
    from ml.fusion import fuse_results
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
    # Simple rule-based fallback
    score = 0.5
    smell = manual_data.get("water_smell", "tidak_berbau")
    color = manual_data.get("water_color", "jernih")
    env = manual_data.get("environment_condition", "bersih")

    if color == "jernih":
        score += 0.2
    elif color in ("coklat", "hijau"):
        score -= 0.3

    if smell == "tidak_berbau":
        score += 0.1
    elif smell == "menyengat":
        score -= 0.3

    if env == "bersih":
        score += 0.1
    elif env == "kotor":
        score -= 0.2

    score = max(0.0, min(1.0, score))
    category = "layak" if score > 0.5 else "tidak_layak"

    return {
        "category": category,
        "confidence": score,
        "feature_importance": {
            "water_color": 0.25,
            "water_smell": 0.20,
            "environment_condition": 0.15,
            "water_source": 0.15,
            "water_ph": 0.15,
            "water_temperature": 0.10,
        },
    }
