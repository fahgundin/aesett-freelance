import base64
import hashlib
import uuid
from datetime import datetime, timedelta, timezone

import bcrypt
from jose import JWTError, jwt

from app.core.config import settings

ALGORITHM = "HS256"


def _prehash(password: str) -> bytes:
    """SHA-256 + base64 encode to keep input under bcrypt's 72-byte limit."""
    digest = hashlib.sha256(password.encode()).digest()
    return base64.b64encode(digest)


def hash_password(password: str) -> str:
    return bcrypt.hashpw(_prehash(password), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(_prehash(plain), hashed.encode())


def create_access_token(username: str) -> tuple[str, str]:
    """
    Returns (jwt_token, csrf_token).
    The csrf_token is embedded inside the JWT so we can validate it later
    without any server-side state.
    """
    csrf_token = str(uuid.uuid4())
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )
    payload = {
        "sub": username,
        "csrf": csrf_token,
        "exp": expire,
    }
    token = jwt.encode(payload, settings.secret_key, algorithm=ALGORITHM)
    return token, csrf_token


def decode_token(token: str) -> dict:
    """Raises JWTError if token is invalid or expired."""
    return jwt.decode(token, settings.secret_key, algorithms=[ALGORITHM])


def validate_csrf(token_payload: dict, csrf_header: str) -> bool:
    """True when the X-CSRF-Token header matches the claim inside the JWT."""
    return token_payload.get("csrf") == csrf_header
