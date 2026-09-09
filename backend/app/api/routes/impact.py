from typing import List, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.impact_service import impact_service
from app.schemas.schemas import ImpactOut, ImpactCreate

router = APIRouter(prefix="/impact", tags=["impact"])

@router.get("", response_model=List[ImpactOut])
def list_impact(entity_type: Optional[str] = None, db: Session = Depends(get_db)):
    """
    List causal impact measurement evaluations (counterfactual comparisons, wage progression).
    """
    return impact_service.list_impact(db, entity_type=entity_type)

@router.post("", response_model=ImpactOut)
def record_impact_measurement(impact_in: ImpactCreate, db: Session = Depends(get_db)):
    """
    Record an empirical before-and-after cohort impact evaluation.
    """
    return impact_service.create_impact_measurement(db, impact_in=impact_in)

@router.get("/{id}", response_model=ImpactOut)
def get_impact(id: str, db: Session = Depends(get_db)):
    """
    Get detailed impact study evaluation by ID.
    """
    return impact_service.get_impact_by_id(db, id=id)
