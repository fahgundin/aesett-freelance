from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.core.database import Base, engine
from app.routers import auth, documents, gallery, news, publishes, satisfaction, services

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Asset Freelance API",
    description="Landing page backend — news, services, transparency documents, gallery, and unified publish feed.",
    version="1.0.0",
)

uploads_path = Path(settings.uploads_dir)
uploads_path.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(uploads_path)), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(publishes.router, prefix="/api/v1")
app.include_router(news.router, prefix="/api/v1")
app.include_router(services.router, prefix="/api/v1")
app.include_router(documents.router, prefix="/api/v1")
app.include_router(gallery.router, prefix="/api/v1")
app.include_router(satisfaction.router, prefix="/api/v1")


@app.get("/", tags=["health"])
def health():
    return {"status": "ok"}
