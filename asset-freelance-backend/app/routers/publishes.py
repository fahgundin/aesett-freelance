from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

_EPOCH = datetime.min.replace(tzinfo=timezone.utc)

from app import repositories as repo
from app.core.database import get_db
from app.schemas.schemas import PublishRead, PublishType

router = APIRouter(prefix="/publishes", tags=["publishes"])


@router.get("/", response_model=list[PublishRead])
def list_publishes(db: Session = Depends(get_db)):
    """
    Unified public feed of published news and concluded services,
    sorted by date descending (newest first).
    Each item carries a `type` field — "news" or "service" — so the
    frontend knows which detail endpoint to call for the full content.
    """
    items: list[PublishRead] = []

    for news in repo.news.get_all(db, published_only=True):
        items.append(
            PublishRead(
                type=PublishType.news,
                ref_id=news.id,
                slug=news.slug,
                title=news.title,
                summary=news.summary,
                thumbnail_url=news.thumbnail_url,
                date=news.published_at,
            )
        )

    for service in repo.service.get_all(db, concluded=True):
        items.append(
            PublishRead(
                type=PublishType.service,
                ref_id=service.id,
                slug=service.slug,
                title=service.title,
                summary=service.description[:500],
                thumbnail_url=service.thumbnail_url,
                date=service.concluded_at,
            )
        )

    # sort by date descending; items without a date fall to the bottom
    items.sort(key=lambda x: x.date or _EPOCH, reverse=True)

    return items
