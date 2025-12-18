import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "defaultkey")

    db_url = os.getenv("DATABASE_URL")
    if db_url and db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)

    SQLALCHEMY_DATABASE_URI = (
        db_url
        or "sqlite:///" + os.path.join(BASE_DIR, "instance", "surestep.db")
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET = os.getenv("JWT_SECRET", "default_jwt_secret")
    JWT_REFRESH_SECRET = os.getenv("JWT_REFRESH_SECRET", "default_refresh_secret")
