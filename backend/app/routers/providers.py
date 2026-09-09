from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import TrainingProvider

router = APIRouter(prefix="/providers", tags=["providers"])

@router.get("")
def list_providers(
    state: Optional[str] = Query(None),
    tier: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(TrainingProvider)
    if state and "All" not in state:
        query = query.filter(TrainingProvider.state.ilike(f"%{state}%"))
    if tier and "All" not in tier:
        query = query.filter(TrainingProvider.accreditation_tier == tier)
    providers = query.all()

    return [
        {
            "id": p.id,
            "name": p.name,
            "code": p.code,
            "state": p.state,
            "district": p.district,
            "accreditationTier": p.accreditation_tier,
            "tier": p.accreditation_tier,
            "activeLearnersCount": p.active_learners_count,
            "activeCapacity": p.active_learners_count,
            "overallPlacementRate": p.overall_placement_rate,
            "placementRate": p.overall_placement_rate,
            "overallRetentionRate": p.overall_retention_rate,
            "retentionRate": p.overall_retention_rate,
            "contactEmail": p.contact_email,
            "contactPhone": p.contact_phone,
        }
        for p in providers
    ]

@router.get("/{provider_id}")
def get_provider(provider_id: str, db: Session = Depends(get_db)):
    provider = db.query(TrainingProvider).filter(TrainingProvider.id == provider_id).first()
    if not provider:
        raise HTTPException(status_code=404, detail="Training Provider not found")
    return {
        "id": provider.id,
        "name": provider.name,
        "code": provider.code,
        "state": provider.state,
        "district": provider.district,
        "accreditationTier": provider.accreditation_tier,
        "tier": provider.accreditation_tier,
        "activeLearnersCount": provider.active_learners_count,
        "activeCapacity": provider.active_learners_count,
        "overallPlacementRate": provider.overall_placement_rate,
        "placementRate": provider.overall_placement_rate,
        "overallRetentionRate": provider.overall_retention_rate,
        "retentionRate": provider.overall_retention_rate,
        "contactEmail": provider.contact_email,
        "contactPhone": provider.contact_phone,
    }
