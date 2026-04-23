"""
Preprocessor — image and data preprocessing utilities.
Used by yolo_detector and rf_classifier before inference.
"""
from PIL import Image
import os


def validate_image(image_path: str) -> bool:
    """Check that the file is a valid image."""
    if not os.path.exists(image_path):
        return False
    try:
        with Image.open(image_path) as img:
            img.verify()
        return True
    except Exception:
        return False


def resize_image(image_path: str, max_size: int = 640) -> str:
    """
    Resize image to max_size (keeping aspect ratio) for YOLO inference.
    Saves resized image in-place and returns the path.
    """
    try:
        with Image.open(image_path) as img:
            if max(img.size) > max_size:
                img.thumbnail((max_size, max_size), Image.LANCZOS)
                img.save(image_path)
        return image_path
    except Exception:
        return image_path


def validate_manual_data(data: dict) -> dict:
    """
    Validate and normalize manual input data.
    Returns cleaned data dict.
    """
    valid_colors = {"jernih", "kuning", "coklat", "hijau", "putih"}
    valid_smells = {"tidak_berbau", "sedikit", "menyengat"}
    valid_sources = {"sumur", "sungai", "PDAM", "mata_air", "danau"}
    valid_envs = {"bersih", "cukup_bersih", "kotor"}

    cleaned = {}
    cleaned["water_color"] = data.get("water_color", "jernih")
    if cleaned["water_color"] not in valid_colors:
        cleaned["water_color"] = "jernih"

    cleaned["water_smell"] = data.get("water_smell", "tidak_berbau")
    if cleaned["water_smell"] not in valid_smells:
        cleaned["water_smell"] = "tidak_berbau"

    cleaned["water_source"] = data.get("water_source", "sumur")
    if cleaned["water_source"] not in valid_sources:
        cleaned["water_source"] = "sumur"

    cleaned["environment_condition"] = data.get("environment_condition", "bersih")
    if cleaned["environment_condition"] not in valid_envs:
        cleaned["environment_condition"] = "bersih"

    cleaned["water_ph"] = float(data.get("water_ph", 7.0))
    cleaned["water_temperature"] = float(data.get("water_temperature", 25.0))
    cleaned["additional_notes"] = data.get("additional_notes", "")

    return cleaned
