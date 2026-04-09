from sqlalchemy import update as sa_update
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
    if not get_by_id(db, doc_id):
        return None
    update_data = data.model_dump(exclude_unset=True)
    if update_data:
        db.execute(sa_update(TransparencyDocument).where(TransparencyDocument.id == doc_id).values(**update_data))
        db.commit()
    return get_by_id(db, doc_id)


def delete(db: Session, doc_id: int) -> bool:
    obj = get_by_id(db, doc_id)
    if not obj:
        return False
    db.delete(obj)
    db.commit()
    return True
