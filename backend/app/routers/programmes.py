from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import Programme, TrainingProvider

router = APIRouter(prefix="/programmes", tags=["programmes"])

@router.get("")
def list_programmes(
    sector: Optional[str] = Query(None),
    scheme_name: Optional[str] = Query(None),
    provider_id: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Programme)
    if sector and "All" not in sector:
        clean_sector = sector.split("&")[0].split("/")[0].strip()
        query = query.filter(Programme.sector.ilike(f"%{clean_sector}%"))
    if scheme_name and "All" not in scheme_name:
        clean_scheme = scheme_name.split()[0].replace(",", "").replace("(", "").strip()
        query = query.filter(Programme.scheme_name.ilike(f"%{clean_scheme}%"))
    if provider_id and "All" not in provider_id:
        query = query.filter(Programme.provider_id == provider_id)
    if status and "All" not in status:
        query = query.filter(Programme.status == status)

    programmes = query.all()

    return [
        {
            "id": prg.id,
            "providerId": prg.provider_id,
            "providerName": prg.provider.name if prg.provider else "Accredited Partner",
            "code": prg.code,
            "title": prg.title,
            "name": prg.title,
            "sector": prg.sector,
            "schemeName": prg.scheme_name,
            "scheme": prg.scheme_name,
            "nsqfLevel": prg.nsqf_level,
            "durationWeeks": prg.duration_weeks,
            "duration": f"{prg.duration_weeks} Weeks",
            "totalEnrolled": prg.total_enrolled,
            "enrolledCount": prg.total_enrolled,
            "completedCount": prg.completed_count,
            "certifiedCount": prg.certified_count,
            "placedCount": prg.placed_count,
            "avgStartingWage": prg.avg_starting_wage,
            "placementRate": round((prg.placed_count / prg.total_enrolled * 100), 1) if prg.total_enrolled > 0 else 0.0,
            "status": prg.status,
        }
        for prg in programmes
    ]

@router.get("/{programme_id}")
def get_programme(programme_id: str, db: Session = Depends(get_db)):
    prg = db.query(Programme).filter(Programme.id == programme_id).first()
    if not prg:
        raise HTTPException(status_code=404, detail="Programme not found")
    return {
        "id": prg.id,
        "providerId": prg.provider_id,
        "providerName": prg.provider.name if prg.provider else "Accredited Partner",
        "code": prg.code,
        "title": prg.title,
        "name": prg.title,
        "sector": prg.sector,
        "schemeName": prg.scheme_name,
        "scheme": prg.scheme_name,
        "nsqfLevel": prg.nsqf_level,
        "durationWeeks": prg.duration_weeks,
        "duration": f"{prg.duration_weeks} Weeks",
        "totalEnrolled": prg.total_enrolled,
        "enrolledCount": prg.total_enrolled,
        "completedCount": prg.completed_count,
        "certifiedCount": prg.certified_count,
        "placedCount": prg.placed_count,
        "avgStartingWage": prg.avg_starting_wage,
        "placementRate": round((prg.placed_count / prg.total_enrolled * 100), 1) if prg.total_enrolled > 0 else 0.0,
        "status": prg.status,
    }
