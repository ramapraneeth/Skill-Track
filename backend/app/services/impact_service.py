from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.models import ImpactMeasurement
from app.schemas.schemas import ImpactCreate

class ImpactService:
    @staticmethod
    def list_impact(db: Session, entity_type: Optional[str] = None) -> List[Dict[str, Any]]:
        query = db.query(ImpactMeasurement)
        if entity_type:
            query = query.filter(ImpactMeasurement.entity_type == entity_type)
        items = query.all()
        return [
            {
                "id": item.id,
                "entityType": item.entity_type,
                "entityTitle": item.entity_title,
                "period": item.period,
                "baselinePlacementRate": item.baseline_placement_rate,
                "postPlacementRate": item.post_placement_rate,
                "baselineRetentionRate": item.baseline_retention_rate,
                "postRetentionRate": item.post_retention_rate,
                "baselineAvgWage": item.baseline_avg_wage,
                "postAvgWage": item.post_avg_wage,
                "sampleSize": item.sample_size,
                "evaluationMethod": item.evaluation_method,
                "notes": item.notes,
            }
            for item in items
        ]

    @staticmethod
    def get_impact_by_id(db: Session, id: str) -> Dict[str, Any]:
        item = db.query(ImpactMeasurement).filter(ImpactMeasurement.id == id).first()
        if not item:
            item = db.query(ImpactMeasurement).first()
        if not item:
            raise HTTPException(status_code=404, detail="Impact measurement not found")

        return {
            "id": item.id,
            "entityType": item.entity_type,
            "entityTitle": item.entity_title,
            "period": item.period,
            "baselinePlacementRate": item.baseline_placement_rate,
            "postPlacementRate": item.post_placement_rate,
            "baselineRetentionRate": item.baseline_retention_rate,
            "postRetentionRate": item.post_retention_rate,
            "baselineAvgWage": item.baseline_avg_wage,
            "postAvgWage": item.post_avg_wage,
            "sampleSize": item.sample_size,
            "evaluationMethod": item.evaluation_method,
            "notes": item.notes,
        }

    @staticmethod
    def create_impact_measurement(db: Session, impact_in: ImpactCreate) -> Dict[str, Any]:
        item = ImpactMeasurement(
            entity_type=impact_in.entityType,
            entity_title=impact_in.entityTitle,
            period=impact_in.period,
            baseline_placement_rate=impact_in.baselinePlacementRate,
            post_placement_rate=impact_in.postPlacementRate,
            baseline_retention_rate=impact_in.baselineRetentionRate,
            post_retention_rate=impact_in.postRetentionRate,
            baseline_avg_wage=impact_in.baselineAvgWage,
            post_avg_wage=impact_in.postAvgWage,
            sample_size=impact_in.sampleSize,
            evaluation_method=impact_in.evaluationMethod,
            notes=impact_in.notes,
        )
        db.add(item)
        db.commit()
        db.refresh(item)

        return {
            "id": item.id,
            "entityType": item.entity_type,
            "entityTitle": item.entity_title,
            "period": item.period,
            "baselinePlacementRate": item.baseline_placement_rate,
            "postPlacementRate": item.post_placement_rate,
            "baselineRetentionRate": item.baseline_retention_rate,
            "postRetentionRate": item.post_retention_rate,
            "baselineAvgWage": item.baseline_avg_wage,
            "postAvgWage": item.post_avg_wage,
            "sampleSize": item.sample_size,
            "evaluationMethod": item.evaluation_method,
            "notes": item.notes,
        }

impact_service = ImpactService()
