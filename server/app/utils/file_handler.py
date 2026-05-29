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
    
    # Compress image if size is > 1MB (1048576 bytes) to avoid Supabase limits
    if len(contents) > 1024 * 1024:
        from io import BytesIO
        from PIL import Image
        try:
            img = Image.open(BytesIO(contents))
            # Convert to RGB to save as JPEG
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            
            # Resize if image is extremely large
            max_dim = 1200
            if img.width > max_dim or img.height > max_dim:
                img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
                
            out_io = BytesIO()
            img.save(out_io, format="JPEG", quality=85, optimize=True)
            contents = out_io.getvalue()
            
            # Update filename and content_type to reflect JPEG conversion
            name_part = file.filename.rsplit(".", 1)[0]
            file.filename = f"{name_part}.jpg"
            file.content_type = "image/jpeg"
        except Exception as e:
            print(f"Warning: Image compression failed: {e}")

    if len(contents) > MAX_FILE_SIZE:
        raise ValueError(f"File too large even after compression. Max {MAX_FILE_SIZE // (1024*1024)} MB")

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
