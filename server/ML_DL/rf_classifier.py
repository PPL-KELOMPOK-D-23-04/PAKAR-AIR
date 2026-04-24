import os
import pickle
import logging
import numpy as np

logger = logging.getLogger(__name__)

# Paths to saved models
# Using relative paths from server root
MODEL_PATH = os.path.join("ml", "saved_models", "random_forest_model.pkl")
SCALER_PATH = os.path.join("ml", "saved_models", "scaler.pkl")

def preprocess_manual_data(data: dict, scaler) -> np.ndarray:
    """
    Convert manual input dict (from API_DOCUMENTATION) to scaled feature array for RF model.
    Features (9): [ph, Hardness, Solids, Chloramines, Sulfate, 
                  Conductivity, Organic_carbon, Trihalomethanes, Turbidity]
    """
    try:
        features = [
            float(data.get("ph", 7.0)),
            float(data.get("Hardness", 0.0)),
            float(data.get("Solids", 0.0)),
            float(data.get("Chloramines", 0.0)),
            float(data.get("Sulfate", 0.0)),
            float(data.get("Conductivity", 0.0)),
            float(data.get("Organic_carbon", 0.0)),
            float(data.get("Trihalomethanes", 0.0)),
            float(data.get("Turbidity", 0.0))
        ]
        
        features_array = np.array([features])
        return scaler.transform(features_array)
    except Exception as e:
        logger.error(f"Preprocessing error: {e}")
        raise ValueError(f"Input data format error: {e}")
def predict_manual(data: dict) -> dict:
    """
    Run Random Forest inference on manual water quality data.
    """
    if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
        logger.error(f"RF model or scaler not found at {MODEL_PATH}")
        return {"category": "unknown", "confidence": 0.0, "error": "Model files missing"}

    try:
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        
        with open(SCALER_PATH, "rb") as f:
            scaler = pickle.load(f)

        # Preprocess and Scale
        features_scaled = preprocess_manual_data(data, scaler)
        
        # Predict
        prediction = model.predict(features_scaled)[0]
        probabilities = model.predict_proba(features_scaled)[0]

        # Get confidence
        confidence = float(max(probabilities))
        category = "layak" if prediction == 1 else "tidak_layak"

        # Feature importance mapping
        feature_names = [
            "ph", "Hardness", "Solids", "Chloramines", "Sulfate",
            "Conductivity", "Organic_carbon", "Trihalomethanes", "Turbidity"
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
        return {"category": "error", "confidence": 0.0, "detail": str(e)}
