from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict


# ── Auth ──────────────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    csrf_token: str
    token_type: str = "bearer"


# ── News ──────────────────────────────────────────────────────────────────────

class NewsBase(BaseModel):
    title: str
    slug: str
    summary: str
    content: str
    thumbnail_url: str
    is_published: bool = False
    published_at: datetime | None = None


class NewsCreate(NewsBase):
    pass


class NewsUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    summary: str | None = None
    content: str | None = None
    thumbnail_url: str | None = None
    is_published: bool | None = None
    published_at: datetime | None = None


class NewsRead(NewsBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


# ── Services ──────────────────────────────────────────────────────────────────

class ServiceBase(BaseModel):
    title: str
    slug: str
    description: str
    client_name: str | None = None
    tags: str | None = None  # comma-separated, e.g. "web,design,ux"
    thumbnail_url: str
    is_concluded: bool = False
    concluded_at: datetime | None = None


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    description: str | None = None
    client_name: str | None = None
    tags: str | None = None
    thumbnail_url: str | None = None
    is_concluded: bool | None = None
    concluded_at: datetime | None = None


class ServiceRead(ServiceBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


# ── Transparency Documents ────────────────────────────────────────────────────

class DocumentBase(BaseModel):
    title: str
    description: str | None = None
    file_url: str
    category: str
    service_id: int | None = None
    published_at: datetime | None = None


class DocumentCreate(DocumentBase):
    pass


class DocumentUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    file_url: str | None = None
    category: str | None = None
    service_id: int | None = None
    published_at: datetime | None = None


class DocumentRead(DocumentBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


# ── Gallery ───────────────────────────────────────────────────────────────────

class GalleryImageBase(BaseModel):
    title: str
    description: str | None = None
    image_url: str
    category: str | None = None
    news_id: int | None = None
    service_id: int | None = None


class GalleryImageCreate(GalleryImageBase):
    pass


class GalleryImageUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    image_url: str | None = None
    category: str | None = None
    news_id: int | None = None
    service_id: int | None = None


class GalleryImageRead(GalleryImageBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime


# ── Publishes (unified feed: news + concluded services) ───────────────────────

class PublishType(str, Enum):
    news = "news"
    service = "service"


class PublishRead(BaseModel):
    """
    A single item in the unified publish feed.
    `type` tells the frontend whether this came from News or a concluded Service.
    `ref_id` is the original record's id — use it to fetch full details from
    /api/v1/news/{id} or /api/v1/services/{id}.
    """
    type: PublishType
    ref_id: int
    title: str
    summary: str        # news.summary  OR  service.description (first 500 chars)
    thumbnail_url: str | None
    date: datetime | None   # news.published_at  OR  service.concluded_at
