from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import repositories as repo
from app.core.database import get_db
from app.dependencies import get_current_admin
from app.schemas.schemas import DocumentRead, GalleryImageRead, ServiceCreate, ServiceRead, ServiceUpdate

router = APIRouter(prefix="/services", tags=["services"])


# ── Public ────────────────────────────────────────────────────────────────────

@router.get("/", response_model=list[ServiceRead])
def list_services(
    concluded: bool | None = None,
    skip: int = 0,
    limit: int | None = None,
    db: Session = Depends(get_db),
):
    """
    Returns all services.
    Use ?concluded=true for concluded only, ?concluded=false for active only.
    Use ?skip=N&limit=N to paginate.
    """
    return repo.service.get_all(db, concluded=concluded, skip=skip, limit=limit)


@router.get("/slug/{slug}", response_model=ServiceRead)
def get_service_by_slug(slug: str, db: Session = Depends(get_db)):
    obj = repo.service.get_by_slug(db, slug)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    return obj


@router.get("/{service_id}", response_model=ServiceRead)
def get_service(service_id: int, db: Session = Depends(get_db)):
    obj = repo.service.get_by_id(db, service_id)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    return obj


@router.get("/{service_id}/gallery", response_model=list[GalleryImageRead])
def list_service_gallery(service_id: int, db: Session = Depends(get_db)):
    if not repo.service.get_by_id(db, service_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    return repo.gallery.get_by_service_id(db, service_id)


@router.get("/{service_id}/documents", response_model=list[DocumentRead])
def list_service_documents(service_id: int, db: Session = Depends(get_db)):
    if not repo.service.get_by_id(db, service_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    return repo.document.get_all(db, service_id=service_id)


# ── Admin ─────────────────────────────────────────────────────────────────────

@router.post("/", response_model=ServiceRead, status_code=status.HTTP_201_CREATED)
def create_service(
    body: ServiceCreate,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    if repo.service.get_by_slug(db, body.slug):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Slug already exists")
    return repo.service.create(db, body)


@router.patch("/{service_id}", response_model=ServiceRead)
def update_service(
    service_id: int,
    body: ServiceUpdate,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    obj = repo.service.update(db, service_id, body)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    return obj


@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    if not repo.service.delete(db, service_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
