import uuid
from pathlib import Path

import aiofiles
from fastapi import HTTPException, UploadFile, status

from app.core.config import settings

_ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
}

_ALLOWED_DOC_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
}


async def save_upload(file: UploadFile, subdir: str, allowed_types: set[str]) -> str:
    """Validate, persist, and return the public URL for an uploaded file."""
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Unsupported file type '{file.content_type}'. Allowed: {sorted(allowed_types)}",
        )

    dest_dir = Path(settings.uploads_dir) / subdir
    dest_dir.mkdir(parents=True, exist_ok=True)

    ext = Path(file.filename).suffix if file.filename else ""
    filename = f"{uuid.uuid4().hex}{ext}"

    async with aiofiles.open(dest_dir / filename, "wb") as f:
        await f.write(await file.read())

    return f"{settings.base_url}/uploads/{subdir}/{filename}"


async def save_image(file: UploadFile) -> str:
    return await save_upload(file, "gallery", _ALLOWED_IMAGE_TYPES)


async def save_document(file: UploadFile) -> str:
    return await save_upload(file, "documents", _ALLOWED_DOC_TYPES)
