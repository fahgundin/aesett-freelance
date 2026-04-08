from sqlalchemy.orm import Session

from app.models.models import TransparencyDocument
from app.schemas.schemas import DocumentCreate, DocumentUpdate


def get_all(
    db: Session,
    category: str | None = None,
    service_id: int | None = None,
) -> list[TransparencyDocument]:
    q = db.query(TransparencyDocument)
    if category:
        q = q.filter(TransparencyDocument.category == category)
    if service_id is not None:
        q = q.filter(TransparencyDocument.service_id == service_id)
    return q.order_by(TransparencyDocument.published_at.desc()).all()


def get_by_id(db: Session, doc_id: int) -> TransparencyDocument | None:
    return db.query(TransparencyDocument).filter(TransparencyDocument.id == doc_id).first()


def create(db: Session, data: DocumentCreate) -> TransparencyDocument:
    obj = TransparencyDocument(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update(db: Session, doc_id: int, data: DocumentUpdate) -> TransparencyDocument | None:
    obj = get_by_id(db, doc_id)
    if not obj:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


def delete(db: Session, doc_id: int) -> bool:
    obj = get_by_id(db, doc_id)
    if not obj:
        return False
    db.delete(obj)
    db.commit()
    return True
