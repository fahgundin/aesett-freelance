from sqlalchemy.orm import Session

from app.models.models import GalleryImage
from app.schemas.schemas import GalleryImageCreate, GalleryImageUpdate


def get_all_by_category(db: Session, category: str | None = None) -> list[GalleryImage]:
    q = db.query(GalleryImage)
    if category:
        q = q.filter(GalleryImage.category == category)
        return q.order_by(GalleryImage.created_at.desc()).all()

def get_all(db: Session) -> list[GalleryImage]:
    q = db.query(GalleryImage)
    return q.order_by(GalleryImage.created_at.desc()).all()


def get_by_news_id(db: Session, news_id: int) -> list[GalleryImage]:
    return (
        db.query(GalleryImage)
        .filter(GalleryImage.news_id == news_id)
        .order_by(GalleryImage.created_at.desc())
        .all()
    )


def get_by_service_id(db: Session, service_id: int) -> list[GalleryImage]:
    return (
        db.query(GalleryImage)
        .filter(GalleryImage.service_id == service_id)
        .order_by(GalleryImage.created_at.desc())
        .all()
    )


def get_by_id(db: Session, image_id: int) -> GalleryImage | None:
    return db.query(GalleryImage).filter(GalleryImage.id == image_id).first()


def create(db: Session, data: GalleryImageCreate) -> GalleryImage:
    obj = GalleryImage(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update(db: Session, image_id: int, data: GalleryImageUpdate) -> GalleryImage | None:
    obj = get_by_id(db, image_id)
    if not obj:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


def delete(db: Session, image_id: int) -> bool:
    obj = get_by_id(db, image_id)
    if not obj:
        return False
    db.delete(obj)
    db.commit()
    return True
