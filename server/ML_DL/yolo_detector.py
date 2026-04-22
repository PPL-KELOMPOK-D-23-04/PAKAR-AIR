"""
YOLOv8 inference wrapper for water image analysis.
Detects objects/conditions in water images:
  0: air_jernih, 1: air_keruh, 2: air_berwarna,
  3: sampah, 4: alga, 5: busa, 6: minyak
"""
import os
import logging

logger = logging.getLogger(__name__)

MODEL_PATH = os.path.join("ml", "saved_models", "water_yolo.pt")

# Class labels for YOLOv8 model (based on notebook/data.yaml)
CLASS_LABELS = {
    0: {"label": "floater", "positive": False},
}


def predict_image(image_path: str) -> dict:
    """
    Run YOLOv8 inference on a water image.
    Returns:
        {
            "category": "layak" | "tidak_layak",
            "confidence": float,
            "detections": [{"label": str, "confidence": float}, ...]
        }
    """
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"YOLO model not found at {MODEL_PATH}")

    try:
        from ultralytics import YOLO

        model = YOLO(MODEL_PATH)
        results = model(image_path, verbose=False)

        detections = []
        negative_scores = []
        positive_scores = []

        for result in results:
            for box in result.boxes:
                cls_id = int(box.cls[0])
                conf = float(box.conf[0])
                class_info = CLASS_LABELS.get(cls_id, {"label": f"unknown_{cls_id}", "positive": False})

                detections.append({
                    "label": class_info["label"],
                    "confidence": round(conf, 4),
                })

                if class_info["positive"]:
                    positive_scores.append(conf)
                else:
                    negative_scores.append(conf)

        # Calculate overall DL score
        if not detections:
            # No detections — assume neutral
            dl_score = 0.5
        elif negative_scores:
            # Average of negative detection confidences → more negative = lower score
            avg_neg = sum(negative_scores) / len(negative_scores)
            dl_score = max(0.0, 1.0 - avg_neg)
        else:
            # Only positive detections
            dl_score = sum(positive_scores) / len(positive_scores)

        category = "layak" if dl_score > 0.5 else "tidak_layak"

        return {
            "category": category,
            "confidence": round(dl_score, 4),
            "detections": detections,
        }

    except Exception as e:
        logger.error(f"YOLO prediction error: {e}")
        raise
