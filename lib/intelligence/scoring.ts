export interface SkillRequirement {
  skillId: string;
  skillName: string;
  importance: 'mandatory' | 'preferred' | 'optional';
  minProficiency: 'basic' | 'intermediate' | 'advanced';
  weight: number;
}

export interface LearnerSkillInput {
  skillId: string;
  skillName: string;
  proficiencyLevel: 'basic' | 'intermediate' | 'advanced';
  assessedScore: number;
  verified?: boolean;
}

export interface SkillGapAnalysisResult {
  matchPercentage: number;
  matchTier: 'High Competency' | 'Moderate Competency' | 'Significant Gap' | 'Critical Deficit';
  evaluatedSkillsCount: number;
  satisfiedSkillsCount: number;
  missingSkillsCount: number;
  missingSkills: Array<{
    skillId: string;
    skillName: string;
    importance: string;
    requiredProficiency: string;
    currentProficiency: string;
    gapSeverity: 'Critical' | 'High' | 'Medium' | 'Low';
    priorityScore: number;
    recommendedModule: string;
  }>;
  strengths: Array<{
    skillId: string;
    skillName: string;
    assessedScore: number;
  }>;
}

const PROFICIENCY_SCORES = {
  basic: 40,
  intermediate: 75,
  advanced: 95,
};

export function evaluateSkillGap(
  jobRequirements: SkillRequirement[],
  learnerSkills: LearnerSkillInput[]
): SkillGapAnalysisResult {
  const learnerSkillMap = new Map<string, LearnerSkillInput>();
  learnerSkills.forEach((s) => {
    learnerSkillMap.set(s.skillId.toLowerCase(), s);
    learnerSkillMap.set(s.skillName.toLowerCase(), s);
  });

  let totalWeightedPossible = 0;
  let totalWeightedEarned = 0;
  let satisfiedCount = 0;

  const missingSkills: SkillGapAnalysisResult['missingSkills'] = [];
  const strengths: SkillGapAnalysisResult['strengths'] = [];

  for (const req of jobRequirements) {
    const importanceMultiplier = req.importance === 'mandatory' ? 3.0 : req.importance === 'preferred' ? 2.0 : 1.0;
    const itemWeight = (req.weight || 1.0) * importanceMultiplier;
    totalWeightedPossible += itemWeight;

    const matched =
      learnerSkillMap.get(req.skillId.toLowerCase()) || learnerSkillMap.get(req.skillName.toLowerCase());

    const requiredScore = PROFICIENCY_SCORES[req.minProficiency] || 70;

    if (!matched) {
      const priorityScore = req.importance === 'mandatory' ? 100 : req.importance === 'preferred' ? 70 : 40;
      missingSkills.push({
        skillId: req.skillId,
        skillName: req.skillName,
        importance: req.importance,
        requiredProficiency: req.minProficiency,
        currentProficiency: 'None',
        gapSeverity: req.importance === 'mandatory' ? 'Critical' : 'High',
        priorityScore,
        recommendedModule: `Accelerated Bridge Sprint: ${req.skillName} Fundamentals`,
      });
    } else {
      const earnedScore = matched.assessedScore || PROFICIENCY_SCORES[matched.proficiencyLevel] || 50;
      if (earnedScore >= requiredScore) {
        totalWeightedEarned += itemWeight;
        satisfiedCount++;
        strengths.push({
          skillId: req.skillId,
          skillName: req.skillName,
          assessedScore: earnedScore,
        });
      } else {
        const ratio = earnedScore / requiredScore;
        totalWeightedEarned += itemWeight * ratio;
        const priorityScore = req.importance === 'mandatory' ? 80 : 50;
        missingSkills.push({
          skillId: req.skillId,
          skillName: req.skillName,
          importance: req.importance,
          requiredProficiency: req.minProficiency,
          currentProficiency: matched.proficiencyLevel,
          gapSeverity: req.importance === 'mandatory' ? 'High' : 'Medium',
          priorityScore,
          recommendedModule: `Proficiency Uplift Workshop: Advanced ${req.skillName}`,
        });
      }
    }
  }

  const matchPercentage =
    totalWeightedPossible > 0 ? Math.round((totalWeightedEarned / totalWeightedPossible) * 100) : 0;

  let matchTier: SkillGapAnalysisResult['matchTier'] = 'Critical Deficit';
  if (matchPercentage >= 80) matchTier = 'High Competency';
  else if (matchPercentage >= 65) matchTier = 'Moderate Competency';
  else if (matchPercentage >= 45) matchTier = 'Significant Gap';

  missingSkills.sort((a, b) => b.priorityScore - a.priorityScore);

  return {
    matchPercentage,
    matchTier,
    evaluatedSkillsCount: jobRequirements.length,
    satisfiedSkillsCount: satisfiedCount,
    missingSkillsCount: missingSkills.length,
    missingSkills,
    strengths,
  };
}
