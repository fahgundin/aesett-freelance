from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import repositories as repo
from app.core.database import get_db
from app.dependencies import get_current_admin
from app.schemas.schemas import GalleryImageRead, NewsCreate, NewsRead, NewsUpdate

router = APIRouter(prefix="/news", tags=["news"])


# ── Public ────────────────────────────────────────────────────────────────────

@router.get("/", response_model=list[NewsRead])
def list_news(skip: int = 0, limit: int | None = None, db: Session = Depends(get_db)):
    return repo.news.get_all(db, published_only=True, skip=skip, limit=limit)


@router.get("/{news_id}", response_model=NewsRead)
def get_news(news_id: int, db: Session = Depends(get_db)):
    obj = repo.news.get_by_id(db, news_id)
    if not obj or not obj.is_published:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News not found")
    return obj


@router.get("/{news_id}/gallery", response_model=list[GalleryImageRead])
def list_news_gallery(news_id: int, db: Session = Depends(get_db)):
    if not repo.news.get_by_id(db, news_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News not found")
    return repo.gallery.get_by_news_id(db, news_id)


@router.get("/slug/{slug}", response_model=NewsRead)
def get_news_by_slug(slug: str, db: Session = Depends(get_db)):
    obj = repo.news.get_by_slug(db, slug)
    if not obj or not obj.is_published:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News not found")
    return obj


# ── Admin ─────────────────────────────────────────────────────────────────────

@router.get("/admin/all", response_model=list[NewsRead])
def admin_list_all_news(
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    return repo.news.get_all(db, published_only=False)


@router.post("/", response_model=NewsRead, status_code=status.HTTP_201_CREATED)
def create_news(
    body: NewsCreate,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    if repo.news.get_by_slug(db, body.slug):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Slug already exists")
    return repo.news.create(db, body)


@router.patch("/{news_id}", response_model=NewsRead)
def update_news(
    news_id: int,
    body: NewsUpdate,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    obj = repo.news.update(db, news_id, body)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News not found")
    return obj


@router.delete("/{news_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_news(
    news_id: int,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    if not repo.news.delete(db, news_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News not found")
