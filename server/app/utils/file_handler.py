"""File upload handler — saves images to local disk or Supabase Storage."""
import os
import uuid
from datetime import datetime
from fastapi import UploadFile


ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "bmp"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


def _allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


async def save_upload_image(
    file: UploadFile,
    upload_folder: str = "uploads"
) -> dict:
    """
    Save an uploaded image to local disk.
    Returns dict with image_path and original_filename.
    """
    if not file.filename or not _allowed_file(file.filename):
        raise ValueError(
            f"File type not allowed. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise ValueError(f"File too large. Max {MAX_FILE_SIZE // (1024*1024)} MB")

    # Generate unique filename
    ext = file.filename.rsplit(".", 1)[1].lower()
    unique_name = f"{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:8]}.{ext}"

    # Ensure upload directory exists
    os.makedirs(upload_folder, exist_ok=True)
    filepath = os.path.join(upload_folder, unique_name)

    with open(filepath, "wb") as f:
        f.write(contents)

    return {
        "image_path": filepath,
        "original_filename": file.filename,
    }
