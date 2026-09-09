from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.analytics_service import analytics_service

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/government")
def get_government_analytics(
    state: Optional[str] = Query(None, description="Filter by state or UT"),
    district: Optional[str] = Query(None, description="Filter by district"),
    programme_id: Optional[str] = Query(None, description="Filter by programme ID"),
    provider_id: Optional[str] = Query(None, description="Filter by training provider ID"),
    sector: Optional[str] = Query(None, description="Filter by priority sector"),
    scheme_name: Optional[str] = Query(None, description="Filter by central/state scheme"),
    skill_id: Optional[str] = Query(None, description="Filter by skill ID"),
    db: Session = Depends(get_db),
):
    """
    Get national and scheme-level macro KPIs, longitudinal outcome funnel, failure modes, and high-growth skills.
    Calculated in real-time via live SQL aggregations against Neon PostgreSQL.
    """
    return analytics_service.get_government_analytics(
        db=db,
        state=state,
        district=district,
        programme_id=programme_id,
        provider_id=provider_id,
        sector=sector,
        scheme_name=scheme_name,
        skill_id=skill_id,
    )

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
