from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import Job
from app.schemas.schemas import JobOut

router = APIRouter(prefix="/jobs", tags=["jobs"])

@router.get("", response_model=List[JobOut])
def list_jobs(sector: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Job)
    if sector:
        query = query.filter(Job.sector.ilike(f"%{sector}%"))
    jobs = query.all()
    return [
        {
            "id": j.id,
            "title": j.title,
            "companyName": j.company_name,
            "sector": j.sector,
            "state": j.state,
            "district": j.district,
            "minSalary": j.min_salary,
            "maxSalary": j.max_salary,
            "experienceMonths": j.experience_months,
            "vacancies": j.vacancies,
            "isActive": j.is_active,
            "requiredSkills": [
                {
                    "skillId": r.get("skill_id"),
                    "skillName": r.get("skill_name"),
                    "importance": r.get("importance"),
                    "minProficiency": r.get("min_proficiency"),
                }
                for r in (j.required_skills or [])
            ],
        }
        for j in jobs
    ]

@router.get("/demand")
def get_job_demand():
    return {
        "topSectors": [
            {"sector": "IT-ITeS & Data Operations", "vacancies": 14200, "growth": "+34% YoY", "avgWage": 22500},
            {"sector": "Logistics, Warehousing & Supply Chain", "vacancies": 18500, "growth": "+28% YoY", "avgWage": 18000},
            {"sector": "Healthcare & Patient Care", "vacancies": 12400, "growth": "+22% YoY", "avgWage": 19000},
            {"sector": "Green Energy & Solar Installation", "vacancies": 8900, "growth": "+46% YoY", "avgWage": 17500},
        ]
    }

@router.get("/{id}", response_model=JobOut)
def get_job(id: str, db: Session = Depends(get_db)):
    j = db.query(Job).filter(Job.id == id).first()
    if not j:
        raise HTTPException(status_code=404, detail="Job not found")
    return {
        "id": j.id,
        "title": j.title,
        "companyName": j.company_name,
        "sector": j.sector,
        "state": j.state,
        "district": j.district,
        "minSalary": j.min_salary,
        "maxSalary": j.max_salary,
        "experienceMonths": j.experience_months,
        "vacancies": j.vacancies,
        "isActive": j.is_active,
        "requiredSkills": [
            {
                "skillId": r.get("skill_id"),
                "skillName": r.get("skill_name"),
                "importance": r.get("importance"),
                "minProficiency": r.get("min_proficiency"),
            }
            for r in (j.required_skills or [])
        ],
    }
