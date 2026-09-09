from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.followup_service import followup_service
from app.schemas.schemas import FollowupCreate, FollowupOut

router = APIRouter(prefix="/followups", tags=["followups"])

@router.get("", response_model=List[FollowupOut])
def list_followups(learner_id: Optional[str] = None, db: Session = Depends(get_db)):
    """
    List recorded longitudinal retention follow-ups, optionally filtered by learner ID.
    """
    return followup_service.list_followups(db, learner_id=learner_id)

@router.post("", response_model=FollowupOut)
def create_followup(fl_in: FollowupCreate, db: Session = Depends(get_db)):
    """
    Record a new longitudinal follow-up (30-day, 60-day, 90-day, 6-month, 12-month) and automatically update learner status.
    """
    return followup_service.create_followup(db, fl_in=fl_in)
