from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.intervention_service import intervention_service
from app.schemas.schemas import InterventionCreate, InterventionUpdate, InterventionOut

router = APIRouter(prefix="/interventions", tags=["interventions"])

@router.get("", response_model=List[InterventionOut])
def list_interventions(
    learner_id: Optional[str] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    List prescribed and active interventions with optional filtering.
    """
    return intervention_service.list_interventions(
        db, learner_id=learner_id, category=category, status=status
    )

@router.post("", response_model=InterventionOut)
def create_intervention(int_in: InterventionCreate, db: Session = Depends(get_db)):
    """
    Prescribe a targeted support intervention (upskilling, mock interview, stipend, relocation) for an at-risk learner.
    """
    return intervention_service.create_intervention(db, int_in=int_in)

@router.patch("/{id}", response_model=InterventionOut)
def update_intervention(id: str, int_update: InterventionUpdate, db: Session = Depends(get_db)):
    """
    Update intervention status (e.g. assigned -> in_progress -> completed) and log outcome notes.
    """
    return intervention_service.update_intervention(db, id=id, int_update=int_update)
