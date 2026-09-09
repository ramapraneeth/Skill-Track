import { OutcomeService } from './outcome.service';
import { EvidenceService } from './evidence.service';
import { IndicatorService } from './indicator.service';
import { AnalyticsService } from './analytics.service';
import { InsightService } from './insight.service';
import { evaluateSkillGap, SkillRequirement, LearnerSkillInput } from '@/lib/intelligence/scoring';
import { AnalyticsFilterParams } from '@/types/analytics';

export class OutcomeIntelligenceService {
  static async getExecutiveOverview(filters?: AnalyticsFilterParams) {
    const [analytics, outcomeSummary, evidenceStats] = await Promise.all([
      AnalyticsService.getGovernmentAnalytics(filters),
      OutcomeService.getOutcomeSummary(),
      EvidenceService.getEvidenceStats(),
    ]);

    return {
      kpis: analytics.kpis,
      outcomes: outcomeSummary,
      evidence: evidenceStats,
      funnel: analytics.funnel,
      failureModes: analytics.failureModes,
      stateBreakdown: analytics.stateBreakdown,
      filterContext: analytics.filterContext,
    };
  }

  static evaluateCompetencyGap(requirements: SkillRequirement[], learnerSkills: LearnerSkillInput[]) {
    return evaluateSkillGap(requirements, learnerSkills);
  }
}
