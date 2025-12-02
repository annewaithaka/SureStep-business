import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "defaultkey")

    # Database
    db_url = os.getenv("DATABASE_URL")
    if db_url and db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)

    # Fallback to SQLite if no DATABASE_URL is provided
    SQLALCHEMY_DATABASE_URI = db_url or "sqlite:///database.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT
    JWT_SECRET = os.getenv("JWT_SECRET", "default_jwt_secret")
    JWT_REFRESH_SECRET = os.getenv("JWT_REFRESH_SECRET", "default_refresh_secret")

    # Webhook secret
    SCOREAPP_WEBHOOK_SECRET = os.getenv("SCOREAPP_WEBHOOK_SECRET", "no_secret_set")
