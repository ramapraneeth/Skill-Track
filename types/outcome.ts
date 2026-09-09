export type OutcomeType = 'employment' | 'self_employment' | 'apprenticeship';

export interface EmploymentOutcome {
  id: string;
  learnerId: string;
  jobId?: string | null;
  employerName: string;
  designation: string;
  sector: string;
  district: string;
  state: string;
  monthlySalary: number;
  startDate: string;
  status: 'active' | 'resigned' | 'terminated';
  verified: boolean;
  createdAt?: string;
  learnerName?: string;
}

export interface SelfEmploymentOutcome {
  id: string;
  learnerId: string;
  enterpriseName: string;
  sector: string;
  district: string;
  state: string;
  monthlyRevenue: number;
  startDate: string;
  microfinanceSupport: boolean;
  createdAt?: string;
  learnerName?: string;
}

export interface ApprenticeshipOutcome {
  id: string;
  learnerId: string;
  establishmentName: string;
  sector: string;
  stipendAmount: number;
  startDate: string;
  durationMonths: number;
  contractNumber: string;
  createdAt?: string;
  learnerName?: string;
}

export interface OutcomeSummary {
  totalOutcomes: number;
  wageEmploymentCount: number;
  selfEmploymentCount: number;
  apprenticeshipCount: number;
  averageStartingSalary: number;
  verificationRate: number;
}
