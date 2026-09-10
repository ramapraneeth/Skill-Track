import { prisma } from '@/lib/db/prisma';

export interface DataSufficiencyCheck {
  isSufficientData: boolean;
  sampleSize: number;
  threshold: number;
  reason?: string;
  recommendedAction: string;
}

export class DataSufficiencyService {
  /**
   * Evaluates if there are sufficient longitudinal records to run statistical or predictive modeling.
   * Enforces truth-in-AI: never fabricate predictions if sample thresholds are not met.
   */
  static async checkCohortSufficiency(minCohortSize: number = 30): Promise<DataSufficiencyCheck> {
    const [learnerCount, outcomeCount, followupCount] = await Promise.all([
      prisma.learners.count(),
      prisma.employment_outcomes.count(),
      prisma.followups.count(),
    ]);

    const sampleSize = Math.min(learnerCount, outcomeCount + followupCount);

    if (sampleSize < minCohortSize) {
      return {
        isSufficientData: false,
        sampleSize,
        threshold: minCohortSize,
        reason: `Insufficient data for statistical or predictive modeling. Current sample size: ${sampleSize}, required threshold: ${minCohortSize}.`,
        recommendedAction: 'System will operate on deterministic competency matching and transparent policy rules until sufficient verified cohort records accumulate.',
      };
    }

    return {
      isSufficientData: true,
      sampleSize,
      threshold: minCohortSize,
      recommendedAction: 'Sample size meets threshold for statistical trend evaluation.',
    };
  }

  /**
   * Evaluates if a specific candidate profile has sufficient skill records to compute a reliable gap analysis.
   */
  static async checkLearnerProfileSufficiency(learnerId: string): Promise<DataSufficiencyCheck> {
    const skillCount = await prisma.learner_skills.count({
      where: { learner_id: learnerId },
    });

    if (skillCount === 0) {
      return {
        isSufficientData: false,
        sampleSize: 0,
        threshold: 1,
        reason: 'Learner profile has 0 verified or assessed skills recorded.',
        recommendedAction: 'Candidate must complete an initial assessment or add acquired competencies.',
      };
    }

    return {
      isSufficientData: true,
      sampleSize: skillCount,
      threshold: 1,
      recommendedAction: 'Profile has sufficient skill data for competency matching.',
    };
  }

  /**
   * Checks if sample size meets general analytical or statistical thresholds.
   */
  static checkSufficiency(
    sampleSize: number,
    purpose: 'regional_labor_demand' | 'cohort_retention' | 'wage_growth' | string
  ): { isSufficient: boolean; message?: string } {
    const thresholds: Record<string, number> = {
      regional_labor_demand: 10,
      cohort_retention: 30,
      wage_growth: 20,
    };
    const threshold = thresholds[purpose] || 10;
    if (sampleSize < threshold) {
      return {
        isSufficient: false,
        message: `Limited sample size (${sampleSize} observations vs. ${threshold} baseline threshold). Aggregated trends reflect observed active records without synthetic imputation.`,
      };
    }
    return { isSufficient: true };
  }
}
