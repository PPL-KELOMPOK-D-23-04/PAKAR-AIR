"""File upload handler — saves images to local disk or Supabase Storage."""
import os
import uuid
from datetime import datetime
from fastapi import UploadFile
from supabase import Client

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "bmp"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


def _allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


async def upload_to_supabase(
    file: UploadFile,
    supabase: Client,
    bucket_name: str,
    folder: str = ""
) -> str:
    """
    Uploads a file to Supabase Storage and returns the Public URL.
    """
    if not file.filename or not _allowed_file(file.filename):
        raise ValueError(
            f"File type not allowed. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    # Read file content
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise ValueError(f"File too large. Max {MAX_FILE_SIZE // (1024*1024)} MB")

    # Generate unique filename
    ext = file.filename.rsplit(".", 1)[1].lower()
    unique_name = f"{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:8]}.{ext}"
    
    # Path inside the bucket
    storage_path = f"{folder}/{unique_name}" if folder else unique_name

    # Upload to Supabase
    # Note: Using 'content-type' helps Supabase serve the file correctly
    res = supabase.storage.from_(bucket_name).upload(
        path=storage_path,
        file=contents,
        file_options={"content-type": file.content_type}
    )

    # Get Public URL
    # Assuming the bucket is Public as configured by the user
    public_url = supabase.storage.from_(bucket_name).get_public_url(storage_path)
    
    return public_url


async def save_upload_image_local(
    file: UploadFile,
    upload_folder: str = "uploads"
) -> dict:
    """
    (Legacy/Fallback) Save an uploaded image to local disk.
    """
    # ... (logika lama tetap dipertahankan jika sewaktu-waktu dibutuhkan)
    contents = await file.read()
    ext = file.filename.rsplit(".", 1)[1].lower()
    unique_name = f"{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:8]}.{ext}"
    os.makedirs(upload_folder, exist_ok=True)
    filepath = os.path.join(upload_folder, unique_name)
    with open(filepath, "wb") as f:
        f.write(contents)
    return {"image_path": filepath, "original_filename": file.filename}
