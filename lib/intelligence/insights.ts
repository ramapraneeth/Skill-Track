import { ExplainableFactor } from '@/types/insight';

export function generateLearnerRiskFactors(learner: {
  age: number;
  education_level: string;
  skill_match_pct: number;
  current_status: string;
}): {
  probability: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  positiveFactors: ExplainableFactor[];
  riskFactors: ExplainableFactor[];
} {
  const positiveFactors: ExplainableFactor[] = [];
  const riskFactors: ExplainableFactor[] = [];

  let baseRisk = 0.25;

  if (learner.skill_match_pct >= 75) {
    baseRisk -= 0.15;
    positiveFactors.push({
      factor: 'High Skill Proficiency',
      weight: 0.35,
      direction: 'positive',
      description: `Skill match score of ${learner.skill_match_pct}% is well above industry baseline threshold.`,
    });
  } else if (learner.skill_match_pct < 50) {
    baseRisk += 0.25;
    riskFactors.push({
      factor: 'Severe Skill Deficit',
      weight: 0.45,
      direction: 'negative',
      description: `Skill match of ${learner.skill_match_pct}% indicates missing mandatory competency prerequisites.`,
    });
  }

  if (learner.education_level.includes('Graduate') || learner.education_level.includes('Diploma')) {
    baseRisk -= 0.05;
    positiveFactors.push({
      factor: 'Formal Academic Qualification',
      weight: 0.2,
      direction: 'positive',
      description: 'Candidate possesses formal vocational or tertiary certification.',
    });
  }

  const boundedProbability = Math.max(0.05, Math.min(0.95, baseRisk));
  const riskLevel = boundedProbability >= 0.6 ? 'High' : boundedProbability >= 0.35 ? 'Medium' : 'Low';

  return {
    probability: Number(boundedProbability.toFixed(2)),
    riskLevel,
    positiveFactors,
    riskFactors,
  };
}
