"""
Random Forest classifier wrapper for manual water quality data.
Uses pre-trained model to classify based on user-entered parameters.
"""
import os
import pickle
import logging
import numpy as np

logger = logging.getLogger(__name__)

MODEL_PATH = os.path.join("ml", "saved_models", "water_rf.pkl")
ENCODER_PATH = os.path.join("ml", "saved_models", "label_encoder.pkl")

# Feature encoding maps
COLOR_MAP = {"jernih": 0, "kuning": 1, "coklat": 2, "hijau": 3, "putih": 4}
SMELL_MAP = {"tidak_berbau": 0, "sedikit": 1, "menyengat": 2}
SOURCE_MAP = {"sumur": 0, "sungai": 1, "PDAM": 2, "mata_air": 3, "danau": 4}
ENV_MAP = {"bersih": 0, "cukup_bersih": 1, "kotor": 2}


def preprocess_manual_data(data: dict) -> np.ndarray:
    """
    Convert manual input dict to feature array for RF model.
    Features: [color, smell, source, env, ph, temperature]
    """
    color = COLOR_MAP.get(data.get("water_color", "jernih"), 0)
    smell = SMELL_MAP.get(data.get("water_smell", "tidak_berbau"), 0)
    source = SOURCE_MAP.get(data.get("water_source", "sumur"), 0)
    env = ENV_MAP.get(data.get("environment_condition", "bersih"), 0)
    ph = float(data.get("water_ph", 7.0))
    temp = float(data.get("water_temperature", 25.0))

    return np.array([[color, smell, source, env, ph, temp]])


def predict_manual(data: dict) -> dict:
    """
    Run Random Forest inference on manual water quality data.
    Returns:
        {
            "category": "layak" | "tidak_layak",
            "confidence": float,
            "feature_importance": {feature: weight, ...}
        }
    """
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"RF model not found at {MODEL_PATH}")

    try:
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)

        features = preprocess_manual_data(data)
        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]

        # Get confidence for predicted class
        confidence = float(max(probabilities))
        category = "layak" if prediction == 1 else "tidak_layak"

        # Feature importance
        feature_names = [
            "water_color", "water_smell", "water_source",
            "environment_condition", "water_ph", "water_temperature"
        ]
        importance = {}
        if hasattr(model, "feature_importances_"):
            for name, imp in zip(feature_names, model.feature_importances_):
                importance[name] = round(float(imp), 4)

        return {
            "category": category,
            "confidence": round(confidence, 4),
            "feature_importance": importance,
        }

    except Exception as e:
        logger.error(f"RF prediction error: {e}")
        raise
