export interface NationalKpis {
  totalLearners: number;
  trainingCompleted: number;
  certifiedCount: number;
  placedCount: number;
  certificationRate: number;
  employmentRate: number;
  retentionRate90Day: number;
  averageStartingWage: number;
  skillMatchRate: number;
  retentionCohortTracked: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
  rate: number;
  description: string;
}

export interface FailureMode {
  mode: string;
  count: number;
  percentage: number;
  description: string;
}

export interface StateBreakdown {
  state: string;
  learners: number;
  placed: number;
  placementRate: number;
  retentionRate: number;
  avgWage: number;
}

export interface SchemeBreakdown {
  schemeName: string;
  enrolled: number;
  placed: number;
  placementRate: number;
  retentionRate: number;
}

export interface GovernmentAnalyticsResponse {
  kpis: NationalKpis;
  funnel: FunnelStage[];
  failureModes: FailureMode[];
  stateBreakdown: StateBreakdown[];
  schemeComparison: SchemeBreakdown[];
  filterContext: {
    appliedFilters: Record<string, string>;
    recordSampleCount: number;
    dataSource: string;
  };
}

export interface AnalyticsFilterParams {
  state?: string;
  district?: string;
  programmeId?: string;
  providerId?: string;
  sector?: string;
  schemeName?: string;
}
