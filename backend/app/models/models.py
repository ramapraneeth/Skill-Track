import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    Boolean,
    DateTime,
    Date,
    ForeignKey,
    Text,
    JSON,
    Index,
    UniqueConstraint,
    CheckConstraint,
)
from sqlalchemy.orm import relationship
from app.database.session import Base

def gen_uuid() -> str:
    return str(uuid.uuid4())

def utc_now():
    return datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False) # learner, provider, government
    full_name = Column(String(150), nullable=False)
    phone = Column(String(30), nullable=True)
    is_active = Column(Boolean, default=True)
    avatar_url = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    __table_args__ = (
        Index("ix_users_role", "role"),
    )

class TrainingProvider(Base):
    __tablename__ = "training_providers"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    name = Column(String(200), nullable=False)
    code = Column(String(50), unique=True, index=True, nullable=False)
    state = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    accreditation_tier = Column(String(50), default="SMART Grade A")
    contact_email = Column(String(255), nullable=False)
    phone = Column(String(30), nullable=True)
    active_learners_count = Column(Integer, default=0)
    overall_placement_rate = Column(Float, default=0.0)
    overall_retention_rate = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    programmes = relationship("Programme", back_populates="provider")
    learners = relationship("Learner", back_populates="provider")

    __table_args__ = (
        Index("ix_tp_state_district", "state", "district"),
    )

class Programme(Base):
    __tablename__ = "programmes"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    provider_id = Column(String(36), ForeignKey("training_providers.id"), nullable=False)
    code = Column(String(50), unique=True, index=True, nullable=False)
    title = Column(String(200), nullable=False)
    sector = Column(String(100), nullable=False)
    scheme_name = Column(String(150), nullable=False) # e.g. PMKVY 4.0, DDU-GKY
    nsqf_level = Column(Integer, default=4)
    duration_weeks = Column(Integer, default=12)
    total_enrolled = Column(Integer, default=0)
    completed_count = Column(Integer, default=0)
    certified_count = Column(Integer, default=0)
    placed_count = Column(Integer, default=0)
    avg_starting_wage = Column(Float, default=0.0)
    status = Column(String(50), default="active")
    created_at = Column(DateTime(timezone=True), default=utc_now)

    provider = relationship("TrainingProvider", back_populates="programmes")

    __table_args__ = (
        Index("ix_programmes_scheme", "scheme_name"),
        Index("ix_programmes_sector", "sector"),
        Index("ix_programmes_provider", "provider_id"),
    )

class Learner(Base):
    __tablename__ = "learners"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    provider_id = Column(String(36), ForeignKey("training_providers.id"), nullable=False)
    current_programme_id = Column(String(36), ForeignKey("programmes.id"), nullable=True)
    learner_code = Column(String(50), unique=True, index=True, nullable=False)
    full_name = Column(String(150), nullable=False)
    gender = Column(String(20), nullable=False)
    age = Column(Integer, nullable=False)
    state = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    education_level = Column(String(100), nullable=False)
    socio_economic_category = Column(String(50), default="General")
    current_status = Column(String(50), default="enrolled") # enrolled, completed, certified, seeking_job, placed, self_employed, apprenticeship, attrited
    profile_completion_pct = Column(Integer, default=80)
    avatar_url = Column(String(500), nullable=True)
    current_salary = Column(Float, default=0.0)
    retention_milestone_reached = Column(String(50), nullable=True)
    risk_level = Column(String(20), default="Low") # Low, Medium, High
    skill_match_pct = Column(Integer, default=50)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    provider = relationship("TrainingProvider", back_populates="learners")
    skills = relationship("LearnerSkill", back_populates="learner", cascade="all, delete-orphan")
    employment_outcomes = relationship("EmploymentOutcome", back_populates="learner", cascade="all, delete-orphan")
    self_employment_outcomes = relationship("SelfEmploymentOutcome", back_populates="learner", cascade="all, delete-orphan")
    apprenticeship_outcomes = relationship("ApprenticeshipOutcome", back_populates="learner", cascade="all, delete-orphan")
    followups = relationship("Followup", back_populates="learner", cascade="all, delete-orphan")
    predictions = relationship("Prediction", back_populates="learner", cascade="all, delete-orphan")
    interventions = relationship("Intervention", back_populates="learner", cascade="all, delete-orphan")

    __table_args__ = (
        Index("ix_learners_provider", "provider_id"),
        Index("ix_learners_programme", "current_programme_id"),
        Index("ix_learners_status_risk", "current_status", "risk_level"),
        Index("ix_learners_state_district", "state", "district"),
        CheckConstraint("age >= 14", name="chk_learner_age"),
        CheckConstraint("risk_level IN ('Low', 'Medium', 'High')", name="chk_learner_risk_level"),
    )

class Skill(Base):
    __tablename__ = "skills"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    name = Column(String(150), unique=True, index=True, nullable=False)
    sector = Column(String(100), nullable=False)
    category = Column(String(50), default="technical")
    demand_weight = Column(Float, default=4.0)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    __table_args__ = (
        Index("ix_skills_sector", "sector"),
        Index("ix_skills_category", "category"),
    )

class LearnerSkill(Base):
    __tablename__ = "learner_skills"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False)
    skill_id = Column(String(36), ForeignKey("skills.id"), nullable=False)
    skill_name = Column(String(150), nullable=False)
    category = Column(String(50), default="technical")
    proficiency_level = Column(String(50), default="intermediate")
    assessed_score = Column(Float, default=70.0)
    verified = Column(Boolean, default=True)
    acquired_from = Column(String(150), default="Training Programme")
    created_at = Column(DateTime(timezone=True), default=utc_now)

    learner = relationship("Learner", back_populates="skills")

    __table_args__ = (
        Index("ix_ls_learner_skill", "learner_id", "skill_id"),
        UniqueConstraint("learner_id", "skill_id", name="uq_learner_skill"),
    )

class Job(Base):
    __tablename__ = "jobs"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    title = Column(String(200), nullable=False)
    company_name = Column(String(200), nullable=False)
    sector = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    min_salary = Column(Float, default=15000.0)
    max_salary = Column(Float, default=25000.0)
    experience_months = Column(Integer, default=0)
    vacancies = Column(Integer, default=10)
    is_active = Column(Boolean, default=True)
    required_skills = Column(JSON, default=list) # [{skillId, skillName, importance, minProficiency}]
    created_at = Column(DateTime(timezone=True), default=utc_now)

    __table_args__ = (
        Index("ix_jobs_sector_state", "sector", "state"),
        Index("ix_jobs_district", "district"),
    )

class EmploymentOutcome(Base):
    __tablename__ = "employment_outcomes"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False)
    job_id = Column(String(36), ForeignKey("jobs.id"), nullable=True)
    employer_name = Column(String(200), nullable=False)
    designation = Column(String(150), nullable=False)
    sector = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    monthly_salary = Column(Float, nullable=False)
    start_date = Column(String(50), nullable=False)
    status = Column(String(50), default="active") # active, resigned, terminated
    verified = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    learner = relationship("Learner", back_populates="employment_outcomes")

    __table_args__ = (
        Index("ix_emp_learner_status", "learner_id", "status"),
        Index("ix_emp_verified", "verified"),
        Index("ix_emp_sector", "sector"),
        CheckConstraint("monthly_salary >= 0", name="chk_emp_salary"),
    )

class SelfEmploymentOutcome(Base):
    __tablename__ = "self_employment_outcomes"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False)
    enterprise_name = Column(String(200), nullable=False)
    sector = Column(String(100), nullable=False)
    district = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    monthly_revenue = Column(Float, nullable=False)
    start_date = Column(String(50), nullable=False)
    microfinance_support = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    learner = relationship("Learner", back_populates="self_employment_outcomes")

    __table_args__ = (
        Index("ix_self_emp_learner", "learner_id"),
        Index("ix_self_emp_sector", "sector"),
        CheckConstraint("monthly_revenue >= 0", name="chk_self_revenue"),
    )

class ApprenticeshipOutcome(Base):
    __tablename__ = "apprenticeship_outcomes"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False)
    establishment_name = Column(String(200), nullable=False)
    sector = Column(String(100), nullable=False)
    stipend_amount = Column(Float, nullable=False)
    start_date = Column(String(50), nullable=False)
    duration_months = Column(Integer, default=12)
    contract_number = Column(String(100), nullable=False)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    learner = relationship("Learner", back_populates="apprenticeship_outcomes")

    __table_args__ = (
        Index("ix_app_learner", "learner_id"),
        Index("ix_app_sector", "sector"),
        CheckConstraint("stipend_amount >= 0", name="chk_app_stipend"),
    )

class Followup(Base):
    __tablename__ = "followups"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False)
    milestone = Column(String(50), nullable=False) # 30_day, 60_day, 90_day, 6_month, 12_month
    followup_date = Column(String(50), nullable=False)
    employment_status = Column(String(50), default="retained")
    current_salary = Column(Float, default=0.0)
    retention_status = Column(String(50), default="retained") # retained, attrited
    job_satisfaction_score = Column(Integer, default=4)
    skill_relevance_score = Column(Integer, default=4)
    attrition_reason = Column(String(255), nullable=True)
    notes = Column(Text, nullable=True)
    surveyor_role = Column(String(50), default="provider")
    created_at = Column(DateTime(timezone=True), default=utc_now)

    learner = relationship("Learner", back_populates="followups")

    __table_args__ = (
        Index("ix_followup_learner_milestone", "learner_id", "milestone"),
        Index("ix_followup_retention", "retention_status"),
        UniqueConstraint("learner_id", "milestone", name="uq_learner_milestone"),
        CheckConstraint("job_satisfaction_score BETWEEN 1 AND 5", name="chk_followup_job_sat"),
        CheckConstraint("skill_relevance_score BETWEEN 1 AND 5", name="chk_followup_skill_rel"),
    )

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False)
    prediction_type = Column(String(50), nullable=False) # placement, attrition
    probability = Column(Float, nullable=False) # 0.0 to 1.0
    risk_level = Column(String(20), default="Medium") # Low, Medium, High
    positive_factors = Column(JSON, default=list)
    risk_factors = Column(JSON, default=list)
    model_version = Column(String(50), default="XGBoost-Explainable-v2.1")
    recommended_interventions = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    learner = relationship("Learner", back_populates="predictions")

    __table_args__ = (
        Index("ix_pred_learner_type", "learner_id", "prediction_type"),
        Index("ix_pred_risk_level", "risk_level"),
        CheckConstraint("probability BETWEEN 0.0 AND 1.0", name="chk_pred_probability"),
    )

class Intervention(Base):
    __tablename__ = "interventions"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    learner_id = Column(String(36), ForeignKey("learners.id"), nullable=False)
    recommended_by = Column(String(150), nullable=False)
    category = Column(String(50), nullable=False) # upskilling, mock_interview, relocation_support, job_matching, counseling, employer_liaison
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(String(50), default="assigned") # recommended, assigned, in_progress, completed, cancelled
    target_completion_date = Column(String(50), nullable=False)
    completed_date = Column(String(50), nullable=True)
    outcome_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    learner = relationship("Learner", back_populates="interventions")

    __table_args__ = (
        Index("ix_int_learner_status", "learner_id", "status"),
        Index("ix_int_category", "category"),
    )

class ImpactMeasurement(Base):
    __tablename__ = "impact_measurements"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    entity_type = Column(String(50), nullable=False) # programme, provider, district, intervention_type
    entity_title = Column(String(255), nullable=False)
    period = Column(String(100), nullable=False)
    baseline_placement_rate = Column(Float, default=0.0)
    post_placement_rate = Column(Float, default=0.0)
    baseline_retention_rate = Column(Float, default=0.0)
    post_retention_rate = Column(Float, default=0.0)
    baseline_avg_wage = Column(Float, default=0.0)
    post_avg_wage = Column(Float, default=0.0)
    sample_size = Column(Integer, default=100)
    evaluation_method = Column(String(50), default="before_after_cohort")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    __table_args__ = (
        Index("ix_impact_entity_period", "entity_type", "period"),
    )
