export interface SchemeIndicator {
  id: string;
  schemeName: string;
  enrolled: number;
  certified: number;
  placed: number;
  certificationRate: number;
  placementRate: number;
  retention90DayRate: number;
  avgWage: number;
}

export interface ProviderIndicator {
  id: string;
  code: string;
  name: string;
  state: string;
  district: string;
  tier: string;
  activeLearners: number;
  placementRate: number;
  retentionRate: number;
  complianceScore: number;
}
