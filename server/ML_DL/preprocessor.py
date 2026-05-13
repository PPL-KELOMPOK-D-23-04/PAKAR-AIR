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
    Validate and normalize manual input data for Random Forest model.
    Features: [ph, Hardness, Solids, Chloramines, Sulfate, 
               Conductivity, Organic_carbon, Trihalomethanes, Turbidity]
    """
    cleaned = {}
    
    # Required fields with default values if missing
    cleaned["ph"] = float(data.get("ph", 7.0))
    cleaned["Hardness"] = float(data.get("Hardness", 0.0))
    cleaned["Solids"] = float(data.get("Solids", 0.0))
    cleaned["Chloramines"] = float(data.get("Chloramines", 0.0))
    cleaned["Sulfate"] = float(data.get("Sulfate", 0.0))
    cleaned["Conductivity"] = float(data.get("Conductivity", 0.0))
    cleaned["Organic_carbon"] = float(data.get("Organic_carbon", 0.0))
    cleaned["Trihalomethanes"] = float(data.get("Trihalomethanes", 0.0))
    cleaned["Turbidity"] = float(data.get("Turbidity", 0.0))

    return cleaned
