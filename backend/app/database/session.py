from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

url = settings.DATABASE_URL
# Handle postgres prefix for modern SQLAlchemy 2.0 with psycopg v3
if url.startswith("postgres://"):
    url = url.replace("postgres://", "postgresql+psycopg://", 1)
elif url.startswith("postgresql://") and not url.startswith("postgresql+"):
    url = url.replace("postgresql://", "postgresql+psycopg://", 1)

connect_args = {}
if "sqlite" in url:
    connect_args["check_same_thread"] = False

engine = create_engine(
    url,
    connect_args=connect_args,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
