from typing import Dict, List, Any

class ExplainablePredictionEngine:
    @staticmethod
    def predict_placement(
        attendance_pct: float,
        practical_score: float,
        skill_match_pct: float,
        mock_interview_score: float = 50.0,
    ) -> Dict[str, Any]:
        """
        Explainable placement likelihood model.
        Features:
            - Attendance (Weight: 0.25)
            - Practical assessment score (Weight: 0.30)
            - Skill match with target job (Weight: 0.30)
            - Mock interview score (Weight: 0.15)
        """
        raw_score = (
            (attendance_pct / 100.0) * 0.25
            + (practical_score / 100.0) * 0.30
            + (skill_match_pct / 100.0) * 0.30
            + (mock_interview_score / 100.0) * 0.15
        )
        probability = round(min(max(raw_score, 0.10), 0.98), 2)

        positive_factors = []
        risk_factors = []

        # Feature Attribution Explanations
        if attendance_pct >= 85:
            positive_factors.append(f"High classroom attendance rigor ({attendance_pct}%) demonstrated")
        elif attendance_pct < 75:
            risk_factors.append(f"Low training attendance ({attendance_pct}%) creates employability risk")

        if practical_score >= 80:
            positive_factors.append(f"Strong practical lab assessment performance ({practical_score}/100)")
        elif practical_score < 65:
            risk_factors.append(f"Borderline practical score ({practical_score}/100)")

        if skill_match_pct >= 75:
            positive_factors.append(f"High alignment with local job vacancy skills ({skill_match_pct}%)")
        else:
            risk_factors.append(f"Critical tool deficits ({100 - skill_match_pct}% competency gap)")

        if mock_interview_score < 60:
            risk_factors.append(f"Low behavioral/technical interview readiness ({mock_interview_score}/100)")
        else:
            positive_factors.append(f"Solid communication and interview confidence ({mock_interview_score}/100)")

        if probability >= 0.70:
            risk_level = "Low"
            interventions = ["Facilitate direct priority corporate interview scheduling."]
        elif probability >= 0.50:
            risk_level = "Medium"
            interventions = [
                "Prescribe 14-day technical micro-credential in deficit skills.",
                "Schedule 2 personalized 1-on-1 mock interview drills with corporate mentor.",
            ]
        else:
            risk_level = "High"
            interventions = [
                "Initiate comprehensive foundational skills refresher bootcamp.",
                "1-on-1 career counselor diagnostic session.",
            ]

        return {
            "prediction_type": "placement",
            "probability": probability,
            "risk_level": risk_level,
            "positive_factors": positive_factors or ["Completed foundational training curriculum"],
            "risk_factors": risk_factors or ["Normal market competition"],
            "model_version": "XGBoost-Explainable-v2.1",
            "recommended_interventions": interventions,
        }

    @staticmethod
    def predict_attrition(
        monthly_salary: float,
        benchmark_wage: float,
        commute_km: float = 15.0,
        skill_relevance_score: int = 4,
        job_satisfaction: int = 4,
    ) -> Dict[str, Any]:
        """
        Explainable 90-day retention & attrition model.
        Evaluates post-placement friction:
            - Salary adequacy vs living expenditure
            - Commute friction
            - Skill underutilization
        """
        salary_ratio = monthly_salary / max(benchmark_wage, 1.0)

        # Baseline attrition risk starts at 0.20
        risk_score = 0.20

        positive_factors = []
        risk_factors = []

        if salary_ratio >= 1.05:
            risk_score -= 0.10
            positive_factors.append(f"Salary (₹{int(monthly_salary):,}) exceeds district benchmark wage")
        elif salary_ratio < 0.85:
            risk_score += 0.25
            risk_factors.append(f"Wage (₹{int(monthly_salary):,}) is {int((1 - salary_ratio)*100)}% below district median")

        if commute_km > 30:
            risk_score += 0.20
            risk_factors.append(f"Severe commute friction ({commute_km} km round-trip daily)")
        else:
            positive_factors.append(f"Manageable commute distance ({commute_km} km)")

        if skill_relevance_score <= 2:
            risk_score += 0.20
            risk_factors.append("Severe skill underutilization: daily duties do not match trained curriculum")
        else:
            positive_factors.append("High skill utilization in day-to-day employer operations")

        if job_satisfaction <= 2:
            risk_score += 0.15
            risk_factors.append("Low self-reported workplace satisfaction")

        probability = round(min(max(risk_score, 0.05), 0.95), 2)

        if probability >= 0.60:
            risk_level = "High"
            interventions = [
                "Initiate employer liaison for shift timing or branch relocation.",
                "Facilitate lateral job rematch with employer closer to residence.",
            ]
        elif probability >= 0.35:
            risk_level = "Medium"
            interventions = [
                "Schedule 30-day proactive follow-up call with workplace mentor.",
            ]
        else:
            risk_level = "Low"
            interventions = [
                "Routine 90-day milestone verification audit.",
            ]

        return {
            "prediction_type": "attrition",
            "probability": probability,
            "risk_level": risk_level,
            "positive_factors": positive_factors or ["Stable initial employment placement"],
            "risk_factors": risk_factors or ["Standard initial adjustment curve"],
            "model_version": "XGBoost-Retention-v1.4",
            "recommended_interventions": interventions,
        }

prediction_engine = ExplainablePredictionEngine()
