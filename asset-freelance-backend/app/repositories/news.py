from sqlalchemy.orm import Session

from app.models.models import News
from app.schemas.schemas import NewsCreate, NewsUpdate


def get_all(
    db: Session,
    published_only: bool = True,
    skip: int = 0,
    limit: int | None = None,
) -> list[News]:
    q = db.query(News)
    if published_only:
        q = q.filter(News.is_published == True)
    q = q.order_by(News.published_at.desc()).offset(skip)
    if limit is not None:
        q = q.limit(limit)
    return q.all()


def get_by_id(db: Session, news_id: int) -> News | None:
    return db.query(News).filter(News.id == news_id).first()


def get_by_slug(db: Session, slug: str) -> News | None:
    return db.query(News).filter(News.slug == slug).first()


def create(db: Session, data: NewsCreate) -> News:
    obj = News(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def update(db: Session, news_id: int, data: NewsUpdate) -> News | None:
    obj = get_by_id(db, news_id)
    if not obj:
        return None
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


def delete(db: Session, news_id: int) -> bool:
    obj = get_by_id(db, news_id)
    if not obj:
        return False
    db.delete(obj)
    db.commit()
    return True
