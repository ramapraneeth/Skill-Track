import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SkillTrack"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "skilltrack_longitudinal_super_secret_jwt_key_2024")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 hours

    # Direct Neon PostgreSQL connection URL.
    # Defaults to local SQLite if DATABASE_URL is not set in environment
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./skilltrack.db"
    )

    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]

    model_config = {
        "case_sensitive": True,
        "env_file": ".env",
        "extra": "ignore",
    }

settings = Settings()
