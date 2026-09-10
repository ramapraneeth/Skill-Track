export interface CohortTrend {
  period: string;
  enrolled: number;
  placed: number;
  retention90d: number;
  avgWage: number;
}

export function computeLongitudinalTrajectory(trends: CohortTrend[]): {
  placementTrend: 'improving' | 'stable' | 'declining';
  retentionTrend: 'improving' | 'stable' | 'declining';
  wageGrowthPct: number;
} {
  if (trends.length < 2) {
    return { placementTrend: 'stable', retentionTrend: 'stable', wageGrowthPct: 0 };
  }

  const first = trends[0];
  const last = trends[trends.length - 1];

  const placementDelta = last.placed / Math.max(1, last.enrolled) - first.placed / Math.max(1, first.enrolled);
  const retentionDelta = last.retention90d - first.retention90d;
  const wageGrowthPct = first.avgWage > 0 ? ((last.avgWage - first.avgWage) / first.avgWage) * 100 : 0;

  return {
    placementTrend: placementDelta > 0.05 ? 'improving' : placementDelta < -0.05 ? 'declining' : 'stable',
    retentionTrend: retentionDelta > 3 ? 'improving' : retentionDelta < -3 ? 'declining' : 'stable',
    wageGrowthPct: Number(wageGrowthPct.toFixed(1)),
  };
}
