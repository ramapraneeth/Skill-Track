from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.models import Intervention, Learner
from app.schemas.schemas import InterventionCreate, InterventionUpdate

class InterventionService:
    @staticmethod
    def list_interventions(
        db: Session,
        learner_id: Optional[str] = None,
        category: Optional[str] = None,
        status: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        query = db.query(Intervention)
        if learner_id:
            query = query.filter(Intervention.learner_id == learner_id)
        if category:
            query = query.filter(Intervention.category == category)
        if status:
            query = query.filter(Intervention.status == status)

        items = query.all()
        results = []
        for item in items:
            learner = db.query(Learner).filter(Learner.id == item.learner_id).first()
            results.append({
                "id": item.id,
                "learnerId": item.learner_id,
                "learnerName": learner.full_name if learner else "Learner",
                "recommendedBy": item.recommended_by,
                "category": item.category,
                "title": item.title,
                "description": item.description,
                "status": item.status,
                "targetCompletionDate": item.target_completion_date,
                "completedDate": item.completed_date,
                "outcomeNotes": item.outcome_notes,
            })
        return results

    @staticmethod
    def create_intervention(db: Session, int_in: InterventionCreate) -> Dict[str, Any]:
        learner = db.query(Learner).filter(Learner.id == int_in.learnerId).first()
        if not learner:
            raise HTTPException(status_code=404, detail="Learner not found")

        item = Intervention(
            learner_id=int_in.learnerId,
            recommended_by=int_in.recommendedBy,
            category=int_in.category,
            title=int_in.title,
            description=int_in.description,
            status=int_in.status or "assigned",
            target_completion_date=int_in.targetCompletionDate,
            outcome_notes=int_in.outcomeNotes,
        )
        db.add(item)
        db.commit()
        db.refresh(item)

        return {
            "id": item.id,
            "learnerId": item.learner_id,
            "learnerName": learner.full_name,
            "recommendedBy": item.recommended_by,
            "category": item.category,
            "title": item.title,
            "description": item.description,
            "status": item.status,
            "targetCompletionDate": item.target_completion_date,
            "completedDate": item.completed_date,
            "outcomeNotes": item.outcome_notes,
        }

    @staticmethod
    def update_intervention(db: Session, id: str, int_update: InterventionUpdate) -> Dict[str, Any]:
        item = db.query(Intervention).filter(Intervention.id == id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Intervention not found")

        if int_update.status is not None:
            item.status = int_update.status
        if int_update.outcomeNotes is not None:
            item.outcome_notes = int_update.outcomeNotes
        if int_update.completedDate is not None:
            item.completed_date = int_update.completedDate

        db.commit()
        db.refresh(item)

        learner = db.query(Learner).filter(Learner.id == item.learner_id).first()
        return {
            "id": item.id,
            "learnerId": item.learner_id,
            "learnerName": learner.full_name if learner else "Learner",
            "recommendedBy": item.recommended_by,
            "category": item.category,
            "title": item.title,
            "description": item.description,
            "status": item.status,
            "targetCompletionDate": item.target_completion_date,
            "completedDate": item.completed_date,
            "outcomeNotes": item.outcome_notes,
        }

intervention_service = InterventionService()
