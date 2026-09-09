from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.outcome_service import outcome_service
from app.schemas.schemas import (
    EmploymentOutcomeCreate,
    EmploymentOutcomeOut,
    SelfEmploymentOutcomeCreate,
    SelfEmploymentOutcomeOut,
    ApprenticeshipOutcomeCreate,
    ApprenticeshipOutcomeOut,
    UnifiedOutcomeOut,
    OutcomeSummaryOut,
)

router = APIRouter(prefix="/outcomes", tags=["outcomes"])

@router.get("", response_model=List[UnifiedOutcomeOut])
def list_all_outcomes(
    learner_id: Optional[str] = None,
    sector: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    List all recorded outcomes across formal employment, self-employment, and apprenticeships.
    """
    return outcome_service.list_all_outcomes(db, learner_id=learner_id, sector=sector, status=status)

@router.get("/summary", response_model=OutcomeSummaryOut)
def get_outcomes_summary(db: Session = Depends(get_db)):
    """
    Aggregated outcome summary metrics including verification rate, salary distribution, and sector breakdown.
    """
    return outcome_service.get_outcomes_summary(db)

@router.get("/employment", response_model=List[EmploymentOutcomeOut])
def list_employment_outcomes(
    learner_id: Optional[str] = None,
    sector: Optional[str] = None,
    status: Optional[str] = None,
    verified: Optional[bool] = None,
    db: Session = Depends(get_db),
):
    """
    List formal wage employment outcomes.
    """
    return outcome_service.list_employment_outcomes(
        db, learner_id=learner_id, sector=sector, status=status, verified=verified
    )

@router.post("/employment", response_model=EmploymentOutcomeOut)
def record_employment_outcome(
    outcome_in: EmploymentOutcomeCreate,
    db: Session = Depends(get_db),
):
    """
    Record a new formal employment outcome for a learner. Automatically updates learner status to 'placed'.
    """
    return outcome_service.create_employment_outcome(db, outcome_in)

@router.patch("/employment/{id}/verify", response_model=EmploymentOutcomeOut)
def verify_employment_outcome(
    id: str,
    verified: bool = Query(default=True),
    db: Session = Depends(get_db),
):
    """
    Verify or unverify an employment outcome with documentary audit proof.
    """
    return outcome_service.verify_employment_outcome(db, outcome_id=id, verified=verified)

@router.get("/self-employment", response_model=List[SelfEmploymentOutcomeOut])
def list_self_employment_outcomes(
    learner_id: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    List self-employment and micro-enterprise outcomes.
    """
    return outcome_service.list_self_employment_outcomes(db, learner_id=learner_id)

@router.post("/self-employment", response_model=SelfEmploymentOutcomeOut)
def record_self_employment_outcome(
    outcome_in: SelfEmploymentOutcomeCreate,
    db: Session = Depends(get_db),
):
    """
    Record a self-employment enterprise outcome. Automatically updates learner status to 'self_employed'.
    """
    return outcome_service.create_self_employment_outcome(db, outcome_in)

@router.get("/apprenticeship", response_model=List[ApprenticeshipOutcomeOut])
def list_apprenticeship_outcomes(
    learner_id: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    List formal apprenticeship contracts.
    """
    return outcome_service.list_apprenticeship_outcomes(db, learner_id=learner_id)

@router.post("/apprenticeship", response_model=ApprenticeshipOutcomeOut)
def record_apprenticeship_outcome(
    outcome_in: ApprenticeshipOutcomeCreate,
    db: Session = Depends(get_db),
):
    """
    Record an apprenticeship outcome. Automatically updates learner status to 'apprenticeship'.
    """
    return outcome_service.create_apprenticeship_outcome(db, outcome_in)
