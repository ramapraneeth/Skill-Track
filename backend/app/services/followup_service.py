from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.models import Followup, Learner
from app.schemas.schemas import FollowupCreate

class FollowupService:
    @staticmethod
    def list_followups(db: Session, learner_id: Optional[str] = None) -> List[Dict[str, Any]]:
        query = db.query(Followup)
        if learner_id:
            query = query.filter(Followup.learner_id == learner_id)
        items = query.all()
        return [
            {
                "id": f.id,
                "learnerId": f.learner_id,
                "milestone": f.milestone,
                "followupDate": f.followup_date,
                "employmentStatus": f.employment_status,
                "currentSalary": f.current_salary,
                "retentionStatus": f.retention_status,
                "jobSatisfactionScore": f.job_satisfaction_score,
                "skillRelevanceScore": f.skill_relevance_score,
                "attritionReason": f.attrition_reason,
                "notes": f.notes,
                "surveyorRole": f.surveyor_role,
            }
            for f in items
        ]

    @staticmethod
    def create_followup(db: Session, fl_in: FollowupCreate) -> Dict[str, Any]:
        learner = db.query(Learner).filter(Learner.id == fl_in.learnerId).first()
        if not learner:
            raise HTTPException(status_code=404, detail="Learner not found")

        item = Followup(
            learner_id=fl_in.learnerId,
            milestone=fl_in.milestone,
            followup_date=fl_in.followupDate,
            employment_status=fl_in.employmentStatus,
            current_salary=fl_in.currentSalary,
            retention_status=fl_in.retentionStatus,
            job_satisfaction_score=fl_in.jobSatisfactionScore,
            skill_relevance_score=fl_in.skillRelevanceScore,
            attrition_reason=fl_in.attritionReason,
            notes=fl_in.notes,
            surveyor_role=fl_in.surveyorRole or "provider",
        )
        db.add(item)

        # Update learner's longitudinal retention milestone and status
        if fl_in.retentionStatus == "retained":
            learner.retention_milestone_reached = fl_in.milestone
            learner.current_salary = fl_in.currentSalary
            learner.current_status = "placed"
            learner.risk_level = "Low"
        else:
            learner.current_status = "attrited"
            learner.risk_level = "High"

        db.commit()
        db.refresh(item)

        return {
            "id": item.id,
            "learnerId": item.learner_id,
            "milestone": item.milestone,
            "followupDate": item.followup_date,
            "employmentStatus": item.employment_status,
            "currentSalary": item.current_salary,
            "retentionStatus": item.retention_status,
            "jobSatisfactionScore": item.job_satisfaction_score,
            "skillRelevanceScore": item.skill_relevance_score,
            "attritionReason": item.attrition_reason,
            "notes": item.notes,
            "surveyorRole": item.surveyor_role,
        }

followup_service = FollowupService()
