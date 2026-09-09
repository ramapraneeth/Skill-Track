from typing import List, Optional, Any, Dict, Union
from pydantic import BaseModel, Field

# ---------------------------------------------------------------------------
# Authentication Schemas
# ---------------------------------------------------------------------------
class Token(BaseModel):
    access_token: str
    token_type: str
    user: Dict[str, Any]

class TokenPayload(BaseModel):
    sub: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str
    role: Optional[str] = "learner"

class UserRegister(BaseModel):
    email: str
    password: str
    fullName: str
    role: str = "learner"
    phone: Optional[str] = None
    avatarUrl: Optional[str] = None

class UserOut(BaseModel):
    id: str
    email: str
    fullName: str
    role: str
    phone: Optional[str] = None
    avatarUrl: Optional[str] = None
    entityId: Optional[str] = None

# ---------------------------------------------------------------------------
# Skills Schemas
# ---------------------------------------------------------------------------
class SkillCreate(BaseModel):
    name: str
    sector: str
    category: str = "technical"
    demandWeight: float = 4.0
    description: Optional[str] = None

class SkillOut(BaseModel):
    id: str
    name: str
    sector: str
    category: str
    demandWeight: float
    description: Optional[str] = None

class LearnerSkillOut(BaseModel):
    id: str
    learnerId: str
    skillId: str
    skillName: str
    category: str
    proficiencyLevel: str
    assessedScore: float
    verified: bool
    acquiredFrom: str

class SkillGapCalculateRequest(BaseModel):
    learner_skills: List[Dict[str, Any]]
    job_requirements: List[Dict[str, Any]]
    market_demand: Optional[Union[Dict[str, Any], List[Dict[str, Any]]]] = None

class SkillGapResponse(BaseModel):
    learnerId: Optional[str] = None
    learnerName: Optional[str] = None
    jobId: Optional[str] = None
    jobTitle: Optional[str] = None
    companyName: Optional[str] = None
    skill_match_percentage: Optional[int] = None
    match_percentage: int
    matched_skills: List[Dict[str, Any]]
    missing_skills: List[Dict[str, Any]]
    priority: Optional[str] = "Medium"
    recommended_training: Optional[Union[List[Dict[str, Any]], str]] = None
    total_training_days: Optional[int] = 0
    gap_severity: str
    diagnosis_notes: str
    calculation_metadata: Optional[Dict[str, Any]] = None

# ---------------------------------------------------------------------------
# Job Schemas
# ---------------------------------------------------------------------------
class JobCreate(BaseModel):
    title: str
    companyName: str
    sector: str
    state: str
    district: str
    minSalary: float = 15000.0
    maxSalary: float = 25000.0
    experienceMonths: int = 0
    vacancies: int = 10
    requiredSkills: List[Dict[str, Any]] = []

class JobOut(BaseModel):
    id: str
    title: str
    companyName: str
    sector: str
    state: str
    district: str
    minSalary: float
    maxSalary: float
    experienceMonths: int
    vacancies: int
    isActive: bool
    requiredSkills: List[Dict[str, Any]]

# ---------------------------------------------------------------------------
# Outcome Schemas (Employment, Self-Employment, Apprenticeship)
# ---------------------------------------------------------------------------
class EmploymentOutcomeCreate(BaseModel):
    learnerId: str
    jobId: Optional[str] = None
    employerName: str
    designation: str
    sector: str
    district: str
    state: str
    monthlySalary: float
    startDate: str
    status: Optional[str] = "active"
    verified: Optional[bool] = True

class EmploymentOutcomeUpdate(BaseModel):
    status: Optional[str] = None
    verified: Optional[bool] = None
    monthlySalary: Optional[float] = None
    designation: Optional[str] = None

class EmploymentOutcomeOut(BaseModel):
    id: str
    learnerId: str
    learnerName: Optional[str] = None
    jobId: Optional[str] = None
    employerName: str
    designation: str
    sector: str
    district: str
    state: str
    monthlySalary: float
    startDate: str
    status: str
    verified: bool

class SelfEmploymentOutcomeCreate(BaseModel):
    learnerId: str
    enterpriseName: str
    sector: str
    district: str
    state: str
    monthlyRevenue: float
    startDate: str
    microfinanceSupport: Optional[bool] = False

class SelfEmploymentOutcomeOut(BaseModel):
    id: str
    learnerId: str
    learnerName: Optional[str] = None
    enterpriseName: str
    sector: str
    district: str
    state: str
    monthlyRevenue: float
    startDate: str
    microfinanceSupport: bool

class ApprenticeshipOutcomeCreate(BaseModel):
    learnerId: str
    establishmentName: str
    sector: str
    stipendAmount: float
    startDate: str
    durationMonths: int = 12
    contractNumber: str

class ApprenticeshipOutcomeOut(BaseModel):
    id: str
    learnerId: str
    learnerName: Optional[str] = None
    establishmentName: str
    sector: str
    stipendAmount: float
    startDate: str
    durationMonths: int
    contractNumber: str

class UnifiedOutcomeOut(BaseModel):
    id: str
    learnerId: str
    learnerName: str
    outcomeType: str # "employment" | "self_employment" | "apprenticeship"
    organizationOrEnterprise: str
    designationOrRole: str
    sector: str
    district: str
    state: str
    monthlyEarning: float
    startDate: str
    status: str
    verified: bool

class OutcomeSummaryOut(BaseModel):
    totalRecorded: int
    totalFormalEmployment: int
    totalSelfEmployment: int
    totalApprenticeship: int
    overallVerificationRate: float
    averageStartingMonthlyWage: float
    salaryDistribution: List[Dict[str, Any]]
    sectorBreakdown: List[Dict[str, Any]]

# ---------------------------------------------------------------------------
# Followup Schemas
# ---------------------------------------------------------------------------
class FollowupCreate(BaseModel):
    learnerId: str
    milestone: str # "30_day", "60_day", "90_day", "6_month", "12_month"
    followupDate: str
    employmentStatus: str
    currentSalary: float
    retentionStatus: str # "retained", "attrited"
    jobSatisfactionScore: int = Field(default=4, ge=1, le=5)
    skillRelevanceScore: int = Field(default=4, ge=1, le=5)
    attritionReason: Optional[str] = None
    notes: Optional[str] = None
    surveyorRole: Optional[str] = "provider"

class FollowupOut(BaseModel):
    id: str
    learnerId: str
    milestone: str
    followupDate: str
    employmentStatus: str
    currentSalary: float
    retentionStatus: str
    jobSatisfactionScore: int
    skillRelevanceScore: int
    attritionReason: Optional[str] = None
    notes: Optional[str] = None
    surveyorRole: str

# ---------------------------------------------------------------------------
# Prediction Schemas
# ---------------------------------------------------------------------------
class PredictionRequest(BaseModel):
    attendancePct: Optional[float] = 85.0
    practicalScore: Optional[float] = 80.0
    skillMatchPct: Optional[float] = 70.0
    mockInterviewScore: Optional[float] = 60.0

class PredictionOut(BaseModel):
    id: str
    learnerId: str
    predictionType: str
    probability: float
    riskLevel: str
    positiveFactors: List[str]
    riskFactors: List[str]
    modelVersion: str
    recommendedInterventions: List[str]

# ---------------------------------------------------------------------------
# Intervention Schemas
# ---------------------------------------------------------------------------
class InterventionCreate(BaseModel):
    learnerId: str
    recommendedBy: str
    category: str
    title: str
    description: str
    status: Optional[str] = "assigned"
    targetCompletionDate: str
    outcomeNotes: Optional[str] = None

class InterventionUpdate(BaseModel):
    status: Optional[str] = None
    outcomeNotes: Optional[str] = None
    completedDate: Optional[str] = None

class InterventionOut(BaseModel):
    id: str
    learnerId: str
    learnerName: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    recommendedBy: str
    category: str
    title: str
    description: str
    status: str
    targetCompletionDate: str
    completedDate: Optional[str] = None
    outcomeNotes: Optional[str] = None

# ---------------------------------------------------------------------------
# Impact Schemas
# ---------------------------------------------------------------------------
class ImpactCreate(BaseModel):
    entityType: str
    entityTitle: str
    period: str
    baselinePlacementRate: float
    postPlacementRate: float
    baselineRetentionRate: float
    postRetentionRate: float
    baselineAvgWage: float
    postAvgWage: float
    sampleSize: int = 100
    evaluationMethod: str = "before_after_cohort"
    notes: Optional[str] = None

class ImpactOut(BaseModel):
    id: str
    entityType: str
    entityTitle: str
    period: str
    baselinePlacementRate: float
    postPlacementRate: float
    baselineRetentionRate: float
    postRetentionRate: float
    baselineAvgWage: float
    postAvgWage: float
    sampleSize: int
    evaluationMethod: str
    notes: Optional[str] = None

# ---------------------------------------------------------------------------
# Learner Schemas
# ---------------------------------------------------------------------------
class LearnerCreate(BaseModel):
    providerId: str
    currentProgrammeId: Optional[str] = None
    learnerCode: str
    fullName: str
    gender: str
    age: int
    state: str
    district: str
    educationLevel: str
    socioEconomicCategory: Optional[str] = "General"
    currentStatus: Optional[str] = "enrolled"
    avatarUrl: Optional[str] = None

class LearnerUpdate(BaseModel):
    currentStatus: Optional[str] = None
    currentSalary: Optional[float] = None
    retentionMilestoneReached: Optional[str] = None
    riskLevel: Optional[str] = None
    skillMatchPct: Optional[int] = None
    profileCompletionPct: Optional[int] = None

class LearnerOut(BaseModel):
    id: str
    userId: Optional[str] = None
    providerId: str
    providerName: str
    currentProgrammeId: Optional[str] = None
    programmeTitle: str
    learnerCode: str
    fullName: str
    gender: str
    age: int
    state: str
    district: str
    educationLevel: str
    socioEconomicCategory: str
    currentStatus: str
    profileCompletionPct: int
    avatarUrl: Optional[str] = None
    currentSalary: Optional[float] = None
    retentionMilestoneReached: Optional[str] = None
    riskLevel: str
    skillMatchPct: int

class LearnerDetailOut(LearnerOut):
    skills: List[LearnerSkillOut] = []
    employmentOutcomes: List[EmploymentOutcomeOut] = []
    followups: List[FollowupOut] = []
    predictions: List[PredictionOut] = []
    interventions: List[InterventionOut] = []
