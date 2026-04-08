from datetime import datetime

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app import repositories as repo
from app.core.database import get_db
from app.core.uploads import save_document
from app.dependencies import get_current_admin
from app.schemas.schemas import DocumentCreate, DocumentRead, DocumentUpdate

router = APIRouter(prefix="/documents", tags=["documents"])


# ── Public ────────────────────────────────────────────────────────────────────

@router.get("/", response_model=list[DocumentRead])
def list_documents(
    category: str | None = None,
    service_id: int | None = None,
    db: Session = Depends(get_db),
):
    """Returns all documents. Filter with ?category=<value> and/or ?service_id=<id>."""
    return repo.document.get_all(db, category=category, service_id=service_id)


@router.get("/{doc_id}", response_model=DocumentRead)
def get_document(doc_id: int, db: Session = Depends(get_db)):
    obj = repo.document.get_by_id(db, doc_id)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
    return obj


# ── Admin ─────────────────────────────────────────────────────────────────────

@router.post("/", response_model=DocumentRead, status_code=status.HTTP_201_CREATED)
async def create_document(
    file: UploadFile = File(...),
    title: str = Form(...),
    category: str = Form(...),
    description: str | None = Form(None),
    service_id: int | None = Form(None),
    published_at: datetime | None = Form(None),
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    file_url = await save_document(file)
    return repo.document.create(
        db,
        DocumentCreate(
            title=title,
            category=category,
            file_url=file_url,
            description=description,
            service_id=service_id,
            published_at=published_at,
        ),
    )


@router.patch("/{doc_id}", response_model=DocumentRead)
def update_document(
    doc_id: int,
    body: DocumentUpdate,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    obj = repo.document.update(db, doc_id, body)
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
    return obj


@router.delete("/{doc_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document(
    doc_id: int,
    db: Session = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    if not repo.document.delete(db, doc_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
