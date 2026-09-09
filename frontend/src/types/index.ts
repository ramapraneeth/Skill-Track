export type UserRole = 'learner' | 'provider' | 'government'

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  phone?: string
  avatarUrl?: string
  entityId?: string // learner_id or provider_id
}

export interface TrainingProvider {
  id: string
  userId: string
  name: string
  code: string
  state: string
  district: string
  accreditationTier: string
  contactEmail: string
  phone: string
  activeLearnersCount: number
  overallPlacementRate: number
  overallRetentionRate: number
}

export interface Programme {
  id: string
  providerId: string
  providerName: string
  code: string
  title: string
  sector: string
  schemeName: string // e.g. 'PMKVY 4.0', 'DDU-GKY', 'NULM', 'PM-Vishwakarma'
  nsqfLevel: number
  durationWeeks: number
  totalEnrolled: number
  completedCount: number
  certifiedCount: number
  placedCount: number
  avgStartingWage: number
  status: 'active' | 'completed' | 'upcoming'
}

export interface Skill {
  id: string
  name: string
  sector: string
  category: 'technical' | 'soft_skill' | 'domain_knowledge' | 'digital_tool'
  demandWeight: number // 1 to 5
  description: string
}

export interface LearnerSkill {
  id: string
  learnerId: string
  skillId: string
  skillName: string
  category: string
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced'
  assessedScore: number // 0-100
  verified: boolean
  acquiredFrom: string
}

export interface Job {
  id: string
  title: string
  companyName: string
  sector: string
  state: string
  district: string
  minSalary: number
  maxSalary: number
  experienceMonths: number
  vacancies: number
  isActive: boolean
  requiredSkills: {
    skillId: string
    skillName: string
    importance: 'mandatory' | 'preferred'
    minProficiency: string
  }[]
}

export interface EmploymentOutcome {
  id: string
  learnerId: string
  jobId?: string
  employerName: string
  designation: string
  sector: string
  district: string
  state: string
  monthlySalary: number
  startDate: string
  status: 'placed' | 'active' | 'resigned' | 'terminated'
  verified: boolean
}

export interface SelfEmploymentOutcome {
  id: string
  learnerId: string
  enterpriseName: string
  sector: string
  district: string
  state: string
  monthlyRevenue: number
  startDate: string
  microfinanceSupport: boolean
}

export interface ApprenticeshipOutcome {
  id: string
  learnerId: string
  establishmentName: string
  sector: string
  stipendAmount: number
  startDate: string
  durationMonths: number
  contractNumber: string
}

export type TimelineMilestone =
  | 'enrollment'
  | 'training'
  | 'assessment'
  | 'certification'
  | 'job_search'
  | 'placement'
  | '30_day'
  | '60_day'
  | '90_day'
  | '6_month'
  | '12_month'

export interface TimelineEvent {
  id: string
  milestone: TimelineMilestone
  title: string
  date: string
  status: 'completed' | 'in_progress' | 'pending' | 'at_risk' | 'failed'
  description: string
  details?: Record<string, string | number | boolean>
}

export interface Followup {
  id: string
  learnerId: string
  milestone: '30_day' | '60_day' | '90_day' | '6_month' | '12_month'
  followupDate: string
  employmentStatus: 'retained' | 'attrited' | 'unemployed' | 'promoted'
  currentSalary: number
  retentionStatus: 'retained' | 'attrited'
  jobSatisfactionScore: number // 1-5
  skillRelevanceScore: number // 1-5
  attritionReason?: string
  notes: string
  surveyorRole: 'provider' | 'call_center' | 'self_reported'
}

export interface SkillGap {
  id: string
  learnerId: string
  targetJobId: string
  targetJobTitle: string
  matchPercentage: number
  matchedSkills: { name: string; score: number }[]
  missingSkills: { name: string; importance: 'mandatory' | 'preferred'; recommendation: string }[]
  gapSeverity: 'low' | 'medium' | 'high'
  diagnosisNotes: string
}

export interface Prediction {
  id: string
  learnerId: string
  predictionType: 'placement' | 'attrition'
  probability: number // 0.00 to 1.00
  riskLevel: 'Low' | 'Medium' | 'High'
  positiveFactors: string[]
  riskFactors: string[]
  modelVersion: string
  recommendedInterventions: string[]
}

export interface Intervention {
  id: string
  learnerId: string
  learnerName: string
  recommendedBy: string
  category:
    | 'upskilling'
    | 'mock_interview'
    | 'relocation_support'
    | 'job_matching'
    | 'counseling'
    | 'employer_liaison'
  title: string
  description: string
  status: 'recommended' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
  targetCompletionDate: string
  completedDate?: string
  outcomeNotes?: string
}

export interface ImpactMeasurement {
  id: string
  entityType: 'programme' | 'provider' | 'district' | 'intervention_type'
  entityTitle: string
  period: string
  baselinePlacementRate: number
  postPlacementRate: number
  baselineRetentionRate: number
  postRetentionRate: number
  baselineAvgWage: number
  postAvgWage: number
  sampleSize: number
  evaluationMethod: 'before_after_cohort'
  notes: string
}

export interface Learner {
  id: string
  userId: string
  providerId: string
  providerName: string
  currentProgrammeId: string
  programmeTitle: string
  learnerCode: string
  fullName: string
  gender: string
  age: number
  state: string
  district: string
  educationLevel: string
  socioEconomicCategory: string
  currentStatus:
    | 'enrolled'
    | 'completed'
    | 'certified'
    | 'seeking_job'
    | 'placed'
    | 'self_employed'
    | 'apprenticeship'
    | 'attrited'
  profileCompletionPct: number
  avatarUrl?: string
  currentSalary?: number
  retentionMilestoneReached?: string
  riskLevel: 'Low' | 'Medium' | 'High'
  skillMatchPct: number
  timeline: TimelineEvent[]
  skills: LearnerSkill[]
  employmentOutcomes: EmploymentOutcome[]
  selfEmploymentOutcomes: SelfEmploymentOutcome[]
  apprenticeshipOutcomes: ApprenticeshipOutcome[]
  followups: Followup[]
  predictions: Prediction[]
  interventions: Intervention[]
}
