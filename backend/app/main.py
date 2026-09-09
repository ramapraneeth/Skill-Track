from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database.session import engine, Base
from app.routers import (
    auth,
    learners,
    outcomes,
    skills,
    jobs,
    predictions,
    interventions,
    followups,
    analytics,
    impact,
    reports,
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables if not exist
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="SkillTrack: Longitudinal Skilling Outcome Intelligence & Impact Measurement Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "platform": "SkillTrack",
        "tagline": "From Skill Completion to Real-World Outcomes",
        "version": "1.0.0",
        "status": "online",
        "docs": "/docs",
    }

# Mount modular routers under /api/v1
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(learners.router, prefix=settings.API_V1_STR)
app.include_router(outcomes.router, prefix=settings.API_V1_STR)
app.include_router(skills.router, prefix=settings.API_V1_STR)
app.include_router(jobs.router, prefix=settings.API_V1_STR)
app.include_router(predictions.router, prefix=settings.API_V1_STR)
app.include_router(interventions.router, prefix=settings.API_V1_STR)
app.include_router(followups.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(impact.router, prefix=settings.API_V1_STR)
app.include_router(reports.router, prefix=settings.API_V1_STR)
