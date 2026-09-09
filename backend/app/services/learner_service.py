from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.models import Learner, Programme, TrainingProvider, LearnerSkill, EmploymentOutcome, Followup, Prediction, Intervention
from app.schemas.schemas import LearnerCreate, LearnerUpdate

class LearnerService:
    @staticmethod
    def list_learners(
        db: Session,
        provider_id: Optional[str] = None,
        programme_id: Optional[str] = None,
        district: Optional[str] = None,
        risk_level: Optional[str] = None,
        status: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        query = db.query(Learner)
        if provider_id:
            query = query.filter(Learner.provider_id == provider_id)
        if programme_id:
            query = query.filter(Learner.current_programme_id == programme_id)
        if district:
            query = query.filter(Learner.district.ilike(f"%{district}%"))
        if risk_level:
            query = query.filter(Learner.risk_level == risk_level)
        if status:
            query = query.filter(Learner.current_status == status)

        learners = query.all()
        results = []
        for l in learners:
            prog = db.query(Programme).filter(Programme.id == l.current_programme_id).first()
            prov = db.query(TrainingProvider).filter(TrainingProvider.id == l.provider_id).first()
            results.append({
                "id": l.id,
                "userId": l.user_id,
                "providerId": l.provider_id,
                "providerName": prov.name if prov else "Apex Academy",
                "currentProgrammeId": l.current_programme_id,
                "programmeTitle": prog.title if prog else "Vocational Course",
                "learnerCode": l.learner_code,
                "fullName": l.full_name,
                "gender": l.gender,
                "age": l.age,
                "state": l.state,
                "district": l.district,
                "educationLevel": l.education_level,
                "socioEconomicCategory": l.socio_economic_category,
                "currentStatus": l.current_status,
                "profileCompletionPct": l.profile_completion_pct,
                "avatarUrl": l.avatar_url,
                "currentSalary": l.current_salary,
                "retentionMilestoneReached": l.retention_milestone_reached,
                "riskLevel": l.risk_level,
                "skillMatchPct": l.skill_match_pct,
            })
        return results

    @staticmethod
    def get_learner_detail(db: Session, learner_id: str) -> Dict[str, Any]:
        l = db.query(Learner).filter(Learner.id == learner_id).first()
        if not l:
            raise HTTPException(status_code=404, detail="Learner not found")

        prog = db.query(Programme).filter(Programme.id == l.current_programme_id).first()
        prov = db.query(TrainingProvider).filter(TrainingProvider.id == l.provider_id).first()

        return {
            "id": l.id,
            "userId": l.user_id,
            "providerId": l.provider_id,
            "providerName": prov.name if prov else "Apex Academy",
            "currentProgrammeId": l.current_programme_id,
            "programmeTitle": prog.title if prog else "Vocational Course",
            "learnerCode": l.learner_code,
            "fullName": l.full_name,
            "gender": l.gender,
            "age": l.age,
            "state": l.state,
            "district": l.district,
            "educationLevel": l.education_level,
            "socioEconomicCategory": l.socio_economic_category,
            "currentStatus": l.current_status,
            "profileCompletionPct": l.profile_completion_pct,
            "avatarUrl": l.avatar_url,
            "currentSalary": l.current_salary,
            "retentionMilestoneReached": l.retention_milestone_reached,
            "riskLevel": l.risk_level,
            "skillMatchPct": l.skill_match_pct,
            "skills": [
                {
                    "id": s.id,
                    "learnerId": s.learner_id,
                    "skillId": s.skill_id,
                    "skillName": s.skill_name,
                    "category": s.category,
                    "proficiencyLevel": s.proficiency_level,
                    "assessedScore": s.assessed_score,
                    "verified": s.verified,
                    "acquiredFrom": s.acquired_from,
                }
                for s in l.skills
            ],
            "employmentOutcomes": [
                {
                    "id": e.id,
                    "learnerId": e.learner_id,
                    "jobId": e.job_id,
                    "employerName": e.employer_name,
                    "designation": e.designation,
                    "sector": e.sector,
                    "district": e.district,
                    "state": e.state,
                    "monthlySalary": e.monthly_salary,
                    "startDate": e.start_date,
                    "status": e.status,
                    "verified": e.verified,
                }
                for e in l.employment_outcomes
            ],
            "followups": [
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
                for f in l.followups
            ],
            "predictions": [
                {
                    "id": p.id,
                    "learnerId": p.learner_id,
                    "predictionType": p.prediction_type,
                    "probability": p.probability,
                    "riskLevel": p.risk_level,
                    "positiveFactors": p.positive_factors or [],
                    "riskFactors": p.risk_factors or [],
                    "modelVersion": p.model_version,
                    "recommendedInterventions": p.recommended_interventions or [],
                }
                for p in l.predictions
            ],
            "interventions": [
                {
                    "id": i.id,
                    "learnerId": i.learner_id,
                    "learnerName": l.full_name,
                    "recommendedBy": i.recommended_by,
                    "category": i.category,
                    "title": i.title,
                    "description": i.description,
                    "status": i.status,
                    "targetCompletionDate": i.target_completion_date,
                    "completedDate": i.completed_date,
                    "outcomeNotes": i.outcome_notes,
                }
                for i in l.interventions
            ],
        }

    @staticmethod
    def create_learner(db: Session, learner_in: LearnerCreate) -> Dict[str, Any]:
        l = Learner(
            provider_id=learner_in.providerId,
            current_programme_id=learner_in.currentProgrammeId,
            learner_code=learner_in.learnerCode,
            full_name=learner_in.fullName,
            gender=learner_in.gender,
            age=learner_in.age,
            state=learner_in.state,
            district=learner_in.district,
            education_level=learner_in.educationLevel,
            socio_economic_category=learner_in.socioEconomicCategory or "General",
            current_status=learner_in.currentStatus or "enrolled",
            avatar_url=learner_in.avatarUrl,
        )
        db.add(l)
        db.commit()
        db.refresh(l)

        prog = db.query(Programme).filter(Programme.id == l.current_programme_id).first()
        prov = db.query(TrainingProvider).filter(TrainingProvider.id == l.provider_id).first()

        return {
            "id": l.id,
            "userId": l.user_id,
            "providerId": l.provider_id,
            "providerName": prov.name if prov else "Apex Academy",
            "currentProgrammeId": l.current_programme_id,
            "programmeTitle": prog.title if prog else "Vocational Course",
            "learnerCode": l.learner_code,
            "fullName": l.full_name,
            "gender": l.gender,
            "age": l.age,
            "state": l.state,
            "district": l.district,
            "educationLevel": l.education_level,
            "socioEconomicCategory": l.socio_economic_category,
            "currentStatus": l.current_status,
            "profileCompletionPct": l.profile_completion_pct,
            "avatarUrl": l.avatar_url,
            "currentSalary": l.current_salary,
            "retentionMilestoneReached": l.retention_milestone_reached,
            "riskLevel": l.risk_level,
            "skillMatchPct": l.skill_match_pct,
        }

    @staticmethod
    def update_learner(db: Session, learner_id: str, update_in: LearnerUpdate) -> Dict[str, Any]:
        l = db.query(Learner).filter(Learner.id == learner_id).first()
        if not l:
            raise HTTPException(status_code=404, detail="Learner not found")

        if update_in.currentStatus is not None:
            l.current_status = update_in.currentStatus
        if update_in.currentSalary is not None:
            l.current_salary = update_in.currentSalary
        if update_in.retentionMilestoneReached is not None:
            l.retention_milestone_reached = update_in.retentionMilestoneReached
        if update_in.riskLevel is not None:
            l.risk_level = update_in.riskLevel
        if update_in.skillMatchPct is not None:
            l.skill_match_pct = update_in.skillMatchPct
        if update_in.profileCompletionPct is not None:
            l.profile_completion_pct = update_in.profileCompletionPct

        db.commit()
        db.refresh(l)

        prog = db.query(Programme).filter(Programme.id == l.current_programme_id).first()
        prov = db.query(TrainingProvider).filter(TrainingProvider.id == l.provider_id).first()

        return {
            "id": l.id,
            "userId": l.user_id,
            "providerId": l.provider_id,
            "providerName": prov.name if prov else "Apex Academy",
            "currentProgrammeId": l.current_programme_id,
            "programmeTitle": prog.title if prog else "Vocational Course",
            "learnerCode": l.learner_code,
            "fullName": l.full_name,
            "gender": l.gender,
            "age": l.age,
            "state": l.state,
            "district": l.district,
            "educationLevel": l.education_level,
            "socioEconomicCategory": l.socio_economic_category,
            "currentStatus": l.current_status,
            "profileCompletionPct": l.profile_completion_pct,
            "avatarUrl": l.avatar_url,
            "currentSalary": l.current_salary,
            "retentionMilestoneReached": l.retention_milestone_reached,
            "riskLevel": l.risk_level,
            "skillMatchPct": l.skill_match_pct,
        }

    @staticmethod
    def get_learner_timeline(db: Session, learner_id: str) -> List[Dict[str, Any]]:
        l = db.query(Learner).filter(Learner.id == learner_id).first()
        if not l:
            raise HTTPException(status_code=404, detail="Learner not found")

        return [
            {
                "id": f"tl-{l.id}-1",
                "milestone": "enrollment",
                "title": "Batch Enrollment",
                "date": "2024-01-15",
                "status": "completed",
                "description": f"Enrolled in {l.district} training center under PMKVY 4.0.",
            },
            {
                "id": f"tl-{l.id}-2",
                "milestone": "training",
                "title": "Training & Practical Lab Completed",
                "date": "2024-05-10",
                "status": "completed",
                "description": "Completed 480 hours of classroom and practical lab work.",
            },
            {
                "id": f"tl-{l.id}-3",
                "milestone": "certification",
                "title": "NCVET Assessment & Certification",
                "date": "2024-05-25",
                "status": "completed",
                "description": "NCVET NSQF Level qualification certified.",
            },
            {
                "id": f"tl-{l.id}-4",
                "milestone": "job_search",
                "title": "Placement Drive & Screening",
                "date": "2024-06-05",
                "status": "completed" if l.current_status == "placed" else "at_risk" if l.risk_level != "Low" else "in_progress",
                "description": "Participating in regional corporate recruitment drives.",
            },
            {
                "id": f"tl-{l.id}-5",
                "milestone": "placement",
                "title": "Formal Job Placement",
                "date": "2024-07-15",
                "status": "completed" if l.current_status == "placed" else "pending",
                "description": "Transition to wage employment or self-employment.",
            },
            {
                "id": f"tl-{l.id}-6",
                "milestone": "30_day",
                "title": "30-Day Retention Check-in",
                "date": "2024-08-15",
                "status": "completed" if len(l.followups) > 0 else "pending",
                "description": "Follow-up verification of job continuity and initial adjustment.",
            },
            {
                "id": f"tl-{l.id}-7",
                "milestone": "90_day",
                "title": "90-Day Sustainable Outcome Verification",
                "date": "2024-10-15",
                "status": "completed" if l.retention_milestone_reached in ["90_day", "6_month", "12_month"] else "pending",
                "description": "Milestone audit for sustainable employment tracking.",
            },
        ]

learner_service = LearnerService()
