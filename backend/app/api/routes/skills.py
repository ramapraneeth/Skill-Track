from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import Skill, Learner, Job
from app.schemas.schemas import SkillOut, SkillGapResponse, SkillGapCalculateRequest
from app.services.skill_gap_engine import skill_gap_engine

router = APIRouter(prefix="/skills", tags=["skills"])

@router.get("", response_model=List[SkillOut])
def list_skills(sector: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Skill)
    if sector:
        query = query.filter(Skill.sector == sector)
    skills = query.all()
    return [
        {
            "id": s.id,
            "name": s.name,
            "sector": s.sector,
            "category": s.category,
            "demandWeight": s.demand_weight,
            "description": s.description,
        }
        for s in skills
    ]

@router.post("/gap/calculate", response_model=SkillGapResponse)
def calculate_skill_gap(request: SkillGapCalculateRequest):
    """
    Transparent deterministic skill gap calculation endpoint.
    Inputs: learner_skills, job_requirements, market_demand.
    Outputs: skill_match_percentage, missing_skills, priority, recommended_training.
    """
    gap_result = skill_gap_engine.calculate_gap(
        learner_skills=request.learner_skills,
        job_requirements=request.job_requirements,
        market_demand=request.market_demand,
    )
    return {
        "jobTitle": "Custom Position Requisition",
        "companyName": "Candidate Assessment",
        **gap_result,
    }

@router.get("/learners/{learner_id}/skill-gap", response_model=SkillGapResponse)
def get_learner_skill_gap(
    learner_id: str,
    job_id: Optional[str] = Query(default="job-1"),
    db: Session = Depends(get_db),
):
    learner = db.query(Learner).filter(Learner.id == learner_id).first()
    if not learner:
        raise HTTPException(status_code=404, detail="Learner not found")

    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        job = db.query(Job).first()

    learner_skills = [
        {
            "skill_id": s.skill_id,
            "skill_name": s.skill_name,
            "assessed_score": s.assessed_score,
            "proficiency_level": s.proficiency_level,
            "verified": s.verified,
        }
        for s in learner.skills
    ]

    job_requirements = job.required_skills or []

    # Query active skills database to build market demand map
    all_skills = db.query(Skill).all()
    market_demand = {
        s.name.lower(): s.demand_weight
        for s in all_skills
    }
    for s in all_skills:
        market_demand[s.id] = s.demand_weight

    gap_result = skill_gap_engine.calculate_gap(
        learner_skills=learner_skills,
        job_requirements=job_requirements,
        market_demand=market_demand,
    )
    return {
        "learnerId": learner.id,
        "learnerName": learner.full_name,
        "jobId": job.id,
        "jobTitle": job.title,
        "companyName": job.company_name,
        **gap_result,
    }
