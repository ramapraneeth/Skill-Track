from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.learner_service import learner_service
from app.schemas.schemas import LearnerOut, LearnerDetailOut, LearnerCreate, LearnerUpdate

router = APIRouter(prefix="/learners", tags=["learners"])

@router.get("", response_model=List[LearnerOut])
def list_learners(
    provider_id: Optional[str] = None,
    programme_id: Optional[str] = None,
    district: Optional[str] = None,
    risk_level: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    List learners with optional filtering by provider, programme, district, risk level, or status.
    """
    return learner_service.list_learners(
        db=db,
        provider_id=provider_id,
        programme_id=programme_id,
        district=district,
        risk_level=risk_level,
        status=status,
    )

@router.post("", response_model=LearnerOut)
def create_learner(learner_in: LearnerCreate, db: Session = Depends(get_db)):
    """
    Register a new learner in the skilling ecosystem.
    """
    return learner_service.create_learner(db, learner_in)

@router.get("/{id}", response_model=LearnerDetailOut)
def get_learner(id: str, db: Session = Depends(get_db)):
    """
    Get detailed learner profile including competencies, outcomes, followups, predictions, and interventions.
    """
    return learner_service.get_learner_detail(db, learner_id=id)

@router.patch("/{id}", response_model=LearnerOut)
def update_learner(id: str, update_in: LearnerUpdate, db: Session = Depends(get_db)):
    """
    Update learner profile attributes (status, current salary, retention milestone, risk level).
    """
    return learner_service.update_learner(db, learner_id=id, update_in=update_in)

@router.get("/{id}/timeline")
def get_learner_timeline(id: str, db: Session = Depends(get_db)):
    """
    Get the longitudinal milestone timeline for a learner.
    """
    return learner_service.get_learner_timeline(db, learner_id=id)
