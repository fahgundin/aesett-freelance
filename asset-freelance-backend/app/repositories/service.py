from sqlalchemy.orm import Session

from app.models.models import Service
from app.schemas.schemas import ServiceCreate, ServiceUpdate


def get_all(
    db: Session,
    concluded: bool | None = None,
    skip: int = 0,
    limit: int | None = None,
) -> list[Service]:
    q = db.query(Service)
    if concluded is not None:
        q = q.filter(Service.is_concluded == concluded)
    q = q.order_by(Service.created_at.desc()).offset(skip)
    if limit is not None:
        q = q.limit(limit)
    return q.all()


def get_by_id(db: Session, service_id: int) -> Service | None:
    return db.query(Service).filter(Service.id == service_id).first()


def get_by_slug(db: Session, slug: str) -> Service | None:
    return db.query(Service).filter(Service.slug == slug).first()


def create(db: Session, data: ServiceCreate) -> Service:
    obj = Service(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update(db: Session, service_id: int, data: ServiceUpdate) -> Service | None:
    obj = get_by_id(db, service_id)
    if not obj:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


def delete(db: Session, service_id: int) -> bool:
    obj = get_by_id(db, service_id)
    if not obj:
        return False
    db.delete(obj)
    db.commit()
    return True
