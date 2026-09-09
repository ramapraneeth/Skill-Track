export interface RecommendedIntervention {
  category: 'upskilling' | 'mock_interview' | 'relocation_support' | 'job_matching' | 'counseling';
  title: string;
  rationale: string;
  priority: 'Urgent' | 'High' | 'Normal';
  estimatedWeeks: number;
}

export function recommendInterventions(learner: {
  riskLevel: string;
  skillMatchPct: number;
  currentStatus: string;
}): RecommendedIntervention[] {
  const recommendations: RecommendedIntervention[] = [];

  if (learner.skillMatchPct < 60) {
    recommendations.push({
      category: 'upskilling',
      title: 'Mandatory Technical Skill Refresher',
      rationale: 'Addresses core domain deficiencies before candidate attends employer technical screenings.',
      priority: 'Urgent',
      estimatedWeeks: 3,
    });
  }

  if (learner.riskLevel === 'High') {
    recommendations.push({
      category: 'counseling',
      title: '1-on-1 Vocational Mentorship & Attrition Counseling',
      rationale: 'High predictive dropout risk detected. Proactive retention coaching required.',
      priority: 'Urgent',
      estimatedWeeks: 2,
    });
  }

  recommendations.push({
    category: 'mock_interview',
    title: 'Industry Panel Mock Interview & Communication Simulation',
    rationale: 'Builds candidate interview confidence and alignment with employer expectations.',
    priority: 'Normal',
    estimatedWeeks: 1,
  });

  return recommendations;
}
