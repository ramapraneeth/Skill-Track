export type Milestone = '30_day' | '60_day' | '90_day' | '6_month' | '12_month';

export interface FollowupRecord {
  id: string;
  learnerId: string;
  milestone: Milestone;
  followupDate: string;
  employmentStatus: 'retained' | 'promoted' | 'switched' | 'unemployed';
  currentSalary: number;
  retentionStatus: 'retained' | 'attrited';
  jobSatisfactionScore: number;
  skillRelevanceScore: number;
  attritionReason?: string | null;
  notes?: string | null;
  surveyorRole: string;
  createdAt?: string;
  learnerName?: string;
}

export interface EvidenceStats {
  totalMilestoneChecks: number;
  retention30DayPct: number;
  retention90DayPct: number;
  retention180DayPct: number;
  averageSatisfactionScore: number;
  averageSkillRelevanceScore: number;
}
