export function calculateCertificationRate(completed: number, certified: number): number {
  if (!completed || completed === 0) return 0;
  return Number(((certified / completed) * 100).toFixed(1));
}

export function calculatePlacementRate(certified: number, placed: number): number {
  if (!certified || certified === 0) return 0;
  return Number(((placed / certified) * 100).toFixed(1));
}

export function calculateRetentionRate(checkedCohort: number, retained: number): number {
  if (!checkedCohort || checkedCohort === 0) return 0;
  return Number(((retained / checkedCohort) * 100).toFixed(1));
}

export function calculateWageProgression(baselineWage: number, currentWage: number): {
  absoluteUplift: number;
  percentageUplift: number;
} {
  if (!baselineWage || baselineWage <= 0) {
    return { absoluteUplift: currentWage, percentageUplift: 100 };
  }
  const diff = currentWage - baselineWage;
  const pct = Number(((diff / baselineWage) * 100).toFixed(1));
  return { absoluteUplift: diff, percentageUplift: pct };
}
