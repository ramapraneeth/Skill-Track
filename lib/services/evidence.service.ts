import { prisma } from '@/lib/db/prisma';
import { CreateFollowupInput } from '@/lib/validations/evidence.schema';
import { FollowupRecord, EvidenceStats } from '@/types/evidence';
import crypto from 'crypto';

export class EvidenceService {
  static async listFollowups(learnerId?: string): Promise<FollowupRecord[]> {
    const records = await prisma.followups.findMany({
      where: learnerId ? { learner_id: learnerId } : undefined,
      include: {
        learners: { select: { full_name: true } },
      },
      orderBy: { followup_date: 'desc' },
    });

    return records.map((r) => ({
      id: r.id,
      learnerId: r.learner_id,
      milestone: r.milestone as any,
      followupDate: r.followup_date,
      employmentStatus: (r.employment_status as any) || 'retained',
      currentSalary: r.current_salary || 0,
      retentionStatus: (r.retention_status as any) || 'retained',
      jobSatisfactionScore: r.job_satisfaction_score || 4,
      skillRelevanceScore: r.skill_relevance_score || 4,
      attritionReason: r.attrition_reason,
      notes: r.notes,
      surveyorRole: r.surveyor_role || 'provider',
      createdAt: r.created_at?.toISOString(),
      learnerName: r.learners?.full_name,
    }));
  }

  static async createFollowup(input: CreateFollowupInput): Promise<FollowupRecord> {
    const id = crypto.randomUUID();
    const created = await prisma.followups.create({
      data: {
        id,
        learner_id: input.learnerId,
        milestone: input.milestone,
        followup_date: input.followupDate,
        employment_status: input.employmentStatus,
        current_salary: input.currentSalary,
        retention_status: input.retentionStatus,
        job_satisfaction_score: input.jobSatisfactionScore,
        skill_relevance_score: input.skillRelevanceScore,
        attrition_reason: input.attritionReason,
        notes: input.notes,
        surveyor_role: input.surveyorRole,
        created_at: new Date(),
      },
    });

    // Update learner retention milestone reached and current salary
    await prisma.learners.update({
      where: { id: input.learnerId },
      data: {
        retention_milestone_reached: input.milestone,
        ...(input.currentSalary > 0 && { current_salary: input.currentSalary }),
        ...(input.retentionStatus === 'attrited' && {
          current_status: 'seeking_job',
          risk_level: 'High',
        }),
      },
    });

    return {
      id: created.id,
      learnerId: created.learner_id,
      milestone: created.milestone as any,
      followupDate: created.followup_date,
      employmentStatus: (created.employment_status as any) || 'retained',
      currentSalary: created.current_salary || 0,
      retentionStatus: (created.retention_status as any) || 'retained',
      jobSatisfactionScore: created.job_satisfaction_score || 4,
      skillRelevanceScore: created.skill_relevance_score || 4,
      attritionReason: created.attrition_reason,
      notes: created.notes,
      surveyorRole: created.surveyor_role || 'provider',
      createdAt: created.created_at?.toISOString(),
    };
  }

  static async getEvidenceStats(): Promise<EvidenceStats> {
    const totalMilestoneChecks = await prisma.followups.count();

    const [checks30d, retained30d] = await Promise.all([
      prisma.followups.count({ where: { milestone: '30_day' } }),
      prisma.followups.count({ where: { milestone: '30_day', retention_status: 'retained' } }),
    ]);

    const [checks90d, retained90d] = await Promise.all([
      prisma.followups.count({ where: { milestone: '90_day' } }),
      prisma.followups.count({ where: { milestone: '90_day', retention_status: 'retained' } }),
    ]);

    const [checks180d, retained180d] = await Promise.all([
      prisma.followups.count({ where: { milestone: '6_month' } }),
      prisma.followups.count({ where: { milestone: '6_month', retention_status: 'retained' } }),
    ]);

    const aggregates = await prisma.followups.aggregate({
      _avg: {
        job_satisfaction_score: true,
        skill_relevance_score: true,
      },
    });

    return {
      totalMilestoneChecks,
      retention30DayPct: checks30d > 0 ? Math.round((retained30d / checks30d) * 100) : 100,
      retention90DayPct: checks90d > 0 ? Math.round((retained90d / checks90d) * 100) : 0,
      retention180DayPct: checks180d > 0 ? Math.round((retained180d / checks180d) * 100) : 0,
      averageSatisfactionScore: Number((aggregates._avg.job_satisfaction_score || 4).toFixed(1)),
      averageSkillRelevanceScore: Number((aggregates._avg.skill_relevance_score || 4).toFixed(1)),
    };
  }
}
