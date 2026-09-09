import sys
from os.path import abspath, dirname
sys.path.insert(0, dirname(dirname(abspath(__file__))))

from app.database.session import SessionLocal
from app.models.models import (
    User,
    TrainingProvider,
    Programme,
    Skill,
    Learner,
    Job,
    LearnerSkill,
    EmploymentOutcome,
    SelfEmploymentOutcome,
    ApprenticeshipOutcome,
    Followup,
    Prediction,
    Intervention,
    ImpactMeasurement,
)

def verify():
    db = SessionLocal()
    counts = {
        "Users": db.query(User).count(),
        "Training Providers": db.query(TrainingProvider).count(),
        "Programmes": db.query(Programme).count(),
        "Skills": db.query(Skill).count(),
        "Learners": db.query(Learner).count(),
        "Learner Skills": db.query(LearnerSkill).count(),
        "Jobs": db.query(Job).count(),
        "Formal Employment Outcomes": db.query(EmploymentOutcome).count(),
        "Self Employment Outcomes": db.query(SelfEmploymentOutcome).count(),
        "Apprenticeship Outcomes": db.query(ApprenticeshipOutcome).count(),
        "Followups": db.query(Followup).count(),
        "Predictions": db.query(Prediction).count(),
        "Interventions": db.query(Intervention).count(),
        "Impact Measurements": db.query(ImpactMeasurement).count(),
    }
    db.close()

    print("=== Database Entity Verification ===")
    for entity, count in counts.items():
        print(f"  {entity:28}: {count}")
    print("====================================")
    assert counts["Learners"] >= 30, "Expected at least 30 learners in seed data"
    assert counts["Training Providers"] >= 5, "Expected at least 5 providers"
    assert counts["Programmes"] >= 5, "Expected at least 5 programmes"
    print("All verification checks PASSED!")

if __name__ == "__main__":
    verify()
