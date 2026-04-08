from fastapi import APIRouter, HTTPException, status

from app.core.config import settings
from app.core.security import create_access_token, verify_password
from app.schemas.schemas import LoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest):
    """
    Exchange admin credentials for a short-lived JWT + CSRF token pair.
    Both tokens expire together after ACCESS_TOKEN_EXPIRE_MINUTES minutes.
    """
    credentials_ok = (
        body.username == settings.admin_username
        and verify_password(body.password, settings.admin_password_hash)
    )
    if not credentials_ok:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    access_token, csrf_token = create_access_token(body.username)
    return TokenResponse(access_token=access_token, csrf_token=csrf_token)
