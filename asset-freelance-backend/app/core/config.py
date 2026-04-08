from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# Always resolve paths relative to this file's location (project root = parent of app/)
BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    secret_key: str = "insecure-default-key-change-in-production"
    # Store the bcrypt hash of the admin password in .env as ADMIN_PASSWORD_HASH
    # Generate with: python -c "import base64,hashlib; from passlib.context import CryptContext; p='your-password'; print(CryptContext(['bcrypt']).hash(base64.b64encode(hashlib.sha256(p.encode()).digest()).decode()))"
    admin_username: str = "admin"
    admin_password_hash: str = "$2b$12$placeholder-replace-this-with-a-real-hash"
    database_url: str = f"sqlite:///{BASE_DIR}/database.db"
    access_token_expire_minutes: int = 30
    uploads_dir: str = str(BASE_DIR / "uploads")
    base_url: str = "http://localhost:8000"


settings = Settings()
