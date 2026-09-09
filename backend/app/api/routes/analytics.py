from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.analytics_service import analytics_service

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/government")
def get_government_analytics(db: Session = Depends(get_db)):
    """
    Get national and scheme-level macro KPIs, longitudinal outcome funnel, failure modes, and high-growth skills.
    """
    return analytics_service.get_government_analytics(db)

@router.get("/providers")
def get_providers_analytics(db: Session = Depends(get_db)):
    """
    Get training provider performance rankings and active cohort capacities.
    """
    return analytics_service.get_providers_analytics(db)

@router.get("/skills")
def get_skills_analytics(db: Session = Depends(get_db)):
    """
    Get skill ecosystem demand metrics and categorization.
    """
    return analytics_service.get_skills_analytics(db)
