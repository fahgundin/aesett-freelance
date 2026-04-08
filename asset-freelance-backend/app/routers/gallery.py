from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app import repositories as repo
from app.core.database import get_db
from app.core.uploads import save_image
from app.dependencies import get_current_admin
from app.schemas.schemas import GalleryImageCreate, GalleryImageRead, GalleryImageUpdate

router = APIRouter(prefix="/gallery", tags=["gallery"])


# ── Public ────────────────────────────────────────────────────────────────────

@router.get("/{category}", response_model=list[GalleryImageRead])
def list_images_by_category(category: str , db: Session = Depends(get_db)):
    return repo.gallery.get_all_by_category(db, category=category)
    """Returns all images. Use ?category=<value> to filter."""

@router.get("/", response_model=list[GalleryImageRead])
def list_images(db: Session = Depends(get_db)):
    return repo.gallery.get_all(db)
    """Returns all images. Use ?category=<value> to filter."""


@router.get("/{image_id}", response_model=GalleryImageRead)
def get_image(image_id: int, db: Session = Depends(get_db)):
    obj = repo.gallery.get_by_id(db, image_id)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    return obj


# ── Admin ─────────────────────────────────────────────────────────────────────

@router.post("/", response_model=GalleryImageRead, status_code=status.HTTP_201_CREATED)
async def create_image(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: str | None = Form(None),
    category: str | None = Form(None),
    news_id: int | None = Form(None),
    service_id: int | None = Form(None),
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    image_url = await save_image(file)
    return repo.gallery.create(
        db,
        GalleryImageCreate(
            title=title,
            image_url=image_url,
            description=description,
            category=category,
            news_id=news_id,
            service_id=service_id,
        ),
    )


@router.patch("/{image_id}", response_model=GalleryImageRead)
def update_image(
    image_id: int,
    body: GalleryImageUpdate,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    obj = repo.gallery.update(db, image_id, body)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    return obj


@router.delete("/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_image(
    image_id: int,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    if not repo.gallery.delete(db, image_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
