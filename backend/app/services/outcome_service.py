from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.models import EmploymentOutcome, SelfEmploymentOutcome, ApprenticeshipOutcome, Learner
from app.schemas.schemas import (
    EmploymentOutcomeCreate,
    EmploymentOutcomeUpdate,
    SelfEmploymentOutcomeCreate,
    ApprenticeshipOutcomeCreate,
)

class OutcomeService:
    @staticmethod
    def get_outcomes_summary(db: Session) -> Dict[str, Any]:
        emp_list = db.query(EmploymentOutcome).all()
        self_list = db.query(SelfEmploymentOutcome).all()
        app_list = db.query(ApprenticeshipOutcome).all()

        total_emp = len(emp_list)
        total_self = len(self_list)
        total_app = len(app_list)
        total_all = total_emp + total_self + total_app

        verified_emp = sum(1 for e in emp_list if e.verified)
        verification_rate = round((verified_emp / total_emp * 100), 1) if total_emp > 0 else 100.0

        all_earnings = [e.monthly_salary for e in emp_list] + [s.monthly_revenue for s in self_list]
        avg_earning = round(sum(all_earnings) / len(all_earnings), 0) if all_earnings else 18500.0

        salary_distribution = [
            {"range": "< ₹15,000", "count": sum(1 for w in all_earnings if w < 15000)},
            {"range": "₹15,000 - ₹20,000", "count": sum(1 for w in all_earnings if 15000 <= w < 20000)},
            {"range": "₹20,000 - ₹25,000", "count": sum(1 for w in all_earnings if 20000 <= w < 25000)},
            {"range": "₹25,000+", "count": sum(1 for w in all_earnings if w >= 25000)},
        ]

        sectors_count: Dict[str, int] = {}
        for e in emp_list:
            sectors_count[e.sector] = sectors_count.get(e.sector, 0) + 1
        for s in self_list:
            sectors_count[s.sector] = sectors_count.get(s.sector, 0) + 1
        for a in app_list:
            sectors_count[a.sector] = sectors_count.get(a.sector, 0) + 1

        sector_breakdown = [
            {"sector": sec, "count": cnt, "percentage": round(cnt / total_all * 100, 1) if total_all > 0 else 0}
            for sec, cnt in sectors_count.items()
        ]

        return {
            "totalRecorded": total_all,
            "totalFormalEmployment": total_emp,
            "totalSelfEmployment": total_self,
            "totalApprenticeship": total_app,
            "overallVerificationRate": verification_rate,
            "averageStartingMonthlyWage": avg_earning,
            "salaryDistribution": salary_distribution,
            "sectorBreakdown": sector_breakdown,
        }

    @staticmethod
    def list_all_outcomes(
        db: Session,
        learner_id: Optional[str] = None,
        sector: Optional[str] = None,
        status: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        results = []

        # 1. Formal employment
        emp_query = db.query(EmploymentOutcome)
        if learner_id:
            emp_query = emp_query.filter(EmploymentOutcome.learner_id == learner_id)
        if sector:
            emp_query = emp_query.filter(EmploymentOutcome.sector.ilike(f"%{sector}%"))
        if status:
            emp_query = emp_query.filter(EmploymentOutcome.status == status)

        for e in emp_query.all():
            l = db.query(Learner).filter(Learner.id == e.learner_id).first()
            results.append({
                "id": e.id,
                "learnerId": e.learner_id,
                "learnerName": l.full_name if l else "Learner",
                "outcomeType": "employment",
                "organizationOrEnterprise": e.employer_name,
                "designationOrRole": e.designation,
                "sector": e.sector,
                "district": e.district,
                "state": e.state,
                "monthlyEarning": e.monthly_salary,
                "startDate": e.start_date,
                "status": e.status,
                "verified": e.verified,
            })

        # 2. Self employment
        self_query = db.query(SelfEmploymentOutcome)
        if learner_id:
            self_query = self_query.filter(SelfEmploymentOutcome.learner_id == learner_id)
        if sector:
            self_query = self_query.filter(SelfEmploymentOutcome.sector.ilike(f"%{sector}%"))

        for s in self_query.all():
            l = db.query(Learner).filter(Learner.id == s.learner_id).first()
            results.append({
                "id": s.id,
                "learnerId": s.learner_id,
                "learnerName": l.full_name if l else "Learner",
                "outcomeType": "self_employment",
                "organizationOrEnterprise": s.enterprise_name,
                "designationOrRole": "Proprietor / Micro-Entrepreneur",
                "sector": s.sector,
                "district": s.district,
                "state": s.state,
                "monthlyEarning": s.monthly_revenue,
                "startDate": s.start_date,
                "status": "active",
                "verified": True,
            })

        # 3. Apprenticeship
        app_query = db.query(ApprenticeshipOutcome)
        if learner_id:
            app_query = app_query.filter(ApprenticeshipOutcome.learner_id == learner_id)
        if sector:
            app_query = app_query.filter(ApprenticeshipOutcome.sector.ilike(f"%{sector}%"))

        for a in app_query.all():
            l = db.query(Learner).filter(Learner.id == a.learner_id).first()
            results.append({
                "id": a.id,
                "learnerId": a.learner_id,
                "learnerName": l.full_name if l else "Learner",
                "outcomeType": "apprenticeship",
                "organizationOrEnterprise": a.establishment_name,
                "designationOrRole": f"Apprentice ({a.duration_months} mo)",
                "sector": a.sector,
                "district": "Designated Cluster",
                "state": l.state if l else "National",
                "monthlyEarning": a.stipend_amount,
                "startDate": a.start_date,
                "status": "active",
                "verified": True,
            })

        return results

    @staticmethod
    def list_employment_outcomes(
        db: Session,
        learner_id: Optional[str] = None,
        sector: Optional[str] = None,
        status: Optional[str] = None,
        verified: Optional[bool] = None,
    ) -> List[Dict[str, Any]]:
        query = db.query(EmploymentOutcome)
        if learner_id:
            query = query.filter(EmploymentOutcome.learner_id == learner_id)
        if sector:
            query = query.filter(EmploymentOutcome.sector.ilike(f"%{sector}%"))
        if status:
            query = query.filter(EmploymentOutcome.status == status)
        if verified is not None:
            query = query.filter(EmploymentOutcome.verified == verified)

        items = query.all()
        results = []
        for e in items:
            l = db.query(Learner).filter(Learner.id == e.learner_id).first()
            results.append({
                "id": e.id,
                "learnerId": e.learner_id,
                "learnerName": l.full_name if l else "Learner",
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
            })
        return results

    @staticmethod
    def create_employment_outcome(db: Session, outcome_in: EmploymentOutcomeCreate) -> Dict[str, Any]:
        l = db.query(Learner).filter(Learner.id == outcome_in.learnerId).first()
        if not l:
            raise HTTPException(status_code=404, detail="Learner not found")

        item = EmploymentOutcome(
            learner_id=outcome_in.learnerId,
            job_id=outcome_in.jobId,
            employer_name=outcome_in.employerName,
            designation=outcome_in.designation,
            sector=outcome_in.sector,
            district=outcome_in.district,
            state=outcome_in.state,
            monthly_salary=outcome_in.monthlySalary,
            start_date=outcome_in.startDate,
            status=outcome_in.status or "active",
            verified=outcome_in.verified if outcome_in.verified is not None else True,
        )
        db.add(item)

        # Update learner placement status and salary
        l.current_status = "placed"
        l.current_salary = outcome_in.monthlySalary
        l.risk_level = "Low"

        db.commit()
        db.refresh(item)

        return {
            "id": item.id,
            "learnerId": item.learner_id,
            "learnerName": l.full_name,
            "jobId": item.job_id,
            "employerName": item.employer_name,
            "designation": item.designation,
            "sector": item.sector,
            "district": item.district,
            "state": item.state,
            "monthlySalary": item.monthly_salary,
            "startDate": item.start_date,
            "status": item.status,
            "verified": item.verified,
        }

    @staticmethod
    def verify_employment_outcome(db: Session, outcome_id: str, verified: bool = True) -> Dict[str, Any]:
        item = db.query(EmploymentOutcome).filter(EmploymentOutcome.id == outcome_id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Employment outcome not found")

        item.verified = verified
        db.commit()
        db.refresh(item)

        l = db.query(Learner).filter(Learner.id == item.learner_id).first()
        return {
            "id": item.id,
            "learnerId": item.learner_id,
            "learnerName": l.full_name if l else "Learner",
            "jobId": item.job_id,
            "employerName": item.employer_name,
            "designation": item.designation,
            "sector": item.sector,
            "district": item.district,
            "state": item.state,
            "monthlySalary": item.monthly_salary,
            "startDate": item.start_date,
            "status": item.status,
            "verified": item.verified,
        }

    @staticmethod
    def list_self_employment_outcomes(db: Session, learner_id: Optional[str] = None) -> List[Dict[str, Any]]:
        query = db.query(SelfEmploymentOutcome)
        if learner_id:
            query = query.filter(SelfEmploymentOutcome.learner_id == learner_id)
        results = []
        for s in query.all():
            l = db.query(Learner).filter(Learner.id == s.learner_id).first()
            results.append({
                "id": s.id,
                "learnerId": s.learner_id,
                "learnerName": l.full_name if l else "Learner",
                "enterpriseName": s.enterprise_name,
                "sector": s.sector,
                "district": s.district,
                "state": s.state,
                "monthlyRevenue": s.monthly_revenue,
                "startDate": s.start_date,
                "microfinanceSupport": s.microfinance_support,
            })
        return results

    @staticmethod
    def create_self_employment_outcome(db: Session, outcome_in: SelfEmploymentOutcomeCreate) -> Dict[str, Any]:
        l = db.query(Learner).filter(Learner.id == outcome_in.learnerId).first()
        if not l:
            raise HTTPException(status_code=404, detail="Learner not found")

        item = SelfEmploymentOutcome(
            learner_id=outcome_in.learnerId,
            enterprise_name=outcome_in.enterpriseName,
            sector=outcome_in.sector,
            district=outcome_in.district,
            state=outcome_in.state,
            monthly_revenue=outcome_in.monthlyRevenue,
            start_date=outcome_in.startDate,
            microfinance_support=outcome_in.microfinanceSupport or False,
        )
        db.add(item)

        l.current_status = "self_employed"
        l.current_salary = outcome_in.monthlyRevenue
        l.risk_level = "Low"

        db.commit()
        db.refresh(item)

        return {
            "id": item.id,
            "learnerId": item.learner_id,
            "learnerName": l.full_name,
            "enterpriseName": item.enterprise_name,
            "sector": item.sector,
            "district": item.district,
            "state": item.state,
            "monthlyRevenue": item.monthly_revenue,
            "startDate": item.start_date,
            "microfinanceSupport": item.microfinance_support,
        }

    @staticmethod
    def list_apprenticeship_outcomes(db: Session, learner_id: Optional[str] = None) -> List[Dict[str, Any]]:
        query = db.query(ApprenticeshipOutcome)
        if learner_id:
            query = query.filter(ApprenticeshipOutcome.learner_id == learner_id)
        results = []
        for a in query.all():
            l = db.query(Learner).filter(Learner.id == a.learner_id).first()
            results.append({
                "id": a.id,
                "learnerId": a.learner_id,
                "learnerName": l.full_name if l else "Learner",
                "establishmentName": a.establishment_name,
                "sector": a.sector,
                "stipendAmount": a.stipend_amount,
                "startDate": a.start_date,
                "durationMonths": a.duration_months,
                "contractNumber": a.contract_number,
            })
        return results

    @staticmethod
    def create_apprenticeship_outcome(db: Session, outcome_in: ApprenticeshipOutcomeCreate) -> Dict[str, Any]:
        l = db.query(Learner).filter(Learner.id == outcome_in.learnerId).first()
        if not l:
            raise HTTPException(status_code=404, detail="Learner not found")

        item = ApprenticeshipOutcome(
            learner_id=outcome_in.learnerId,
            establishment_name=outcome_in.establishmentName,
            sector=outcome_in.sector,
            stipend_amount=outcome_in.stipendAmount,
            start_date=outcome_in.startDate,
            duration_months=outcome_in.durationMonths,
            contract_number=outcome_in.contractNumber,
        )
        db.add(item)

        l.current_status = "apprenticeship"
        l.current_salary = outcome_in.stipendAmount
        l.risk_level = "Low"

        db.commit()
        db.refresh(item)

        return {
            "id": item.id,
            "learnerId": item.learner_id,
            "learnerName": l.full_name,
            "establishmentName": item.establishment_name,
            "sector": item.sector,
            "stipendAmount": item.stipend_amount,
            "startDate": item.start_date,
            "durationMonths": item.duration_months,
            "contractNumber": item.contract_number,
        }

outcome_service = OutcomeService()
