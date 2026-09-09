from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import Learner, Prediction
from app.schemas.schemas import PredictionOut
from app.services.prediction_engine import prediction_engine

router = APIRouter(prefix="/predictions", tags=["predictions"])

@router.get("/{learner_id}/placement", response_model=PredictionOut)
def get_placement_prediction(learner_id: str, db: Session = Depends(get_db)):
    l = db.query(Learner).filter(Learner.id == learner_id).first()
    if not l:
        raise HTTPException(status_code=404, detail="Learner not found")

    # If database already has a recorded prediction, return it
    existing = (
        db.query(Prediction)
        .filter(Prediction.learner_id == learner_id, Prediction.prediction_type == "placement")
        .first()
    )
    if existing:
        return {
            "id": existing.id,
            "learnerId": existing.learner_id,
            "predictionType": existing.prediction_type,
            "probability": existing.probability,
            "riskLevel": existing.risk_level,
            "positiveFactors": existing.positive_factors or [],
            "riskFactors": existing.risk_factors or [],
            "modelVersion": existing.model_version,
            "recommendedInterventions": existing.recommended_interventions or [],
        }

    # Dynamically compute via prediction engine
    result = prediction_engine.predict_placement(
        attendance_pct=88.0,
        practical_score=84.0,
        skill_match_pct=float(l.skill_match_pct),
        mock_interview_score=45.0,
    )
    return {
        "id": f"pred-dyn-{l.id}",
        "learnerId": l.id,
        "predictionType": result["prediction_type"],
        "probability": result["probability"],
        "riskLevel": result["risk_level"],
        "positiveFactors": result["positive_factors"],
        "riskFactors": result["risk_factors"],
        "modelVersion": result["model_version"],
        "recommendedInterventions": result["recommended_interventions"],
    }

@router.get("/{learner_id}/attrition", response_model=PredictionOut)
def get_attrition_prediction(learner_id: str, db: Session = Depends(get_db)):
    l = db.query(Learner).filter(Learner.id == learner_id).first()
    if not l:
        raise HTTPException(status_code=404, detail="Learner not found")

    result = prediction_engine.predict_attrition(
        monthly_salary=l.current_salary or 18000.0,
        benchmark_wage=19500.0,
        commute_km=15.0,
        skill_relevance_score=4,
        job_satisfaction=4,
    )
    return {
        "id": f"pred-attr-{l.id}",
        "learnerId": l.id,
        "predictionType": result["prediction_type"],
        "probability": result["probability"],
        "riskLevel": result["risk_level"],
        "positiveFactors": result["positive_factors"],
        "riskFactors": result["risk_factors"],
        "modelVersion": result["model_version"],
        "recommendedInterventions": result["recommended_interventions"],
    }
