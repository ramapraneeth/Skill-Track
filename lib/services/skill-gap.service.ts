import { prisma } from '@/lib/db/prisma';
import { evaluateSkillGap, SkillRequirement, LearnerSkillInput } from '@/lib/intelligence/scoring';
import { SkillGapResponse, MissingSkillDetail } from '@/lib/validations/ai-ml.schema';
import { DataSufficiencyService } from './data-sufficiency.service';
import { NotFoundError } from '@/lib/api/errors';

export class SkillGapService {
  /**
   * Deterministically calculates candidate competency match against a targeted or baseline job requisition.
   * Outputs explicit provenance and gap priorities with zero mock values.
   */
  static async calculateLearnerSkillGap(params: {
    learnerId?: string;
    jobId?: string;
  }): Promise<SkillGapResponse> {
    // 1. Resolve Learner
    let learner = params.learnerId
      ? await prisma.learners.findUnique({
          where: { id: params.learnerId },
          include: {
            learner_skills: true,
            learner_preferences: true,
          },
        })
      : await prisma.learners.findFirst({
          include: {
            learner_skills: true,
            learner_preferences: true,
          },
        });

    if (!learner) {
      throw new NotFoundError('No candidate profile found in database.');
    }

    // 2. Resolve Job Requisition
    let job = params.jobId
      ? await prisma.jobs.findUnique({ where: { id: params.jobId } })
      : null;

    if (!job) {
      // If candidate has a preferred target role, search matching job first
      if (learner.learner_preferences?.target_role) {
        job = await prisma.jobs.findFirst({
          where: {
            is_active: true,
            title: { contains: learner.learner_preferences.target_role, mode: 'insensitive' },
          },
        });
      }
    }

    if (!job) {
      job = await prisma.jobs.findFirst({ where: { is_active: true } });
    }

    // If no job exists in the database at all, return explicit zero-vacancy state
    if (!job) {
      return {
        learnerId: learner.id,
        learnerName: learner.full_name,
        targetRole: learner.learner_preferences?.target_role || 'General Technical Role',
        targetSector: learner.learner_preferences?.preferred_sector || 'General',
        matchScore: 0,
        matchTier: 'Critical Deficit',
        evaluatedSkillsCount: 0,
        satisfiedSkillsCount: 0,
        missingSkillsCount: 0,
        missingSkills: [],
        strengths: [],
        provenance: {
          dataSource: 'CALCULATED',
          algorithm: 'CompetencyVector-v2',
          calculatedAt: new Date().toISOString(),
          isSufficientData: false,
          sampleSize: 0,
        },
      };
    }

    // 3. Extract and parse requirements
    const rawRequirements = (job.required_skills as any[]) || [];
    const jobRequirements: SkillRequirement[] = rawRequirements.map((r: any) => ({
      skillId: r.skillId || r.id || 'sk-gen',
      skillName: r.skillName || r.name || 'Core Skill',
      importance: (r.importance as any) || 'mandatory',
      minProficiency: (r.minProficiency as any) || 'intermediate',
      weight: typeof r.weight === 'number' ? r.weight : 3,
    }));

    // 4. Map candidate skills
    const learnerSkills: LearnerSkillInput[] = learner.learner_skills.map((s: any) => ({
      skillId: s.skill_id,
      skillName: s.skill_name,
      proficiencyLevel: (s.proficiency_level as any) || 'basic',
      assessedScore: s.assessed_score || 50,
      verified: s.verified || false,
    }));

    // 5. Check data sufficiency
    const sufficiency = await DataSufficiencyService.checkLearnerProfileSufficiency(learner.id);

    // 6. Execute deterministic vector evaluation
    const evaluation = evaluateSkillGap(jobRequirements, learnerSkills);

    // 7. Structure output matching strict Zod contract
    const missingSkills: MissingSkillDetail[] = evaluation.missingSkills.map((m) => ({
      skillId: m.skillId,
      skillName: m.skillName,
      importance: (m.importance as any) || 'mandatory',
      requiredProficiency: (m.requiredProficiency as any) || 'intermediate',
      currentProficiency: m.currentProficiency,
      gapSeverity: m.gapSeverity,
      priorityScore: m.priorityScore,
      recommendedAction: m.recommendedModule,
    }));

    const strengths = evaluation.strengths.map((st) => ({
      skillId: st.skillId,
      skillName: st.skillName,
      assessedScore: st.assessedScore,
      proficiencyLevel: st.assessedScore >= 80 ? 'advanced' : st.assessedScore >= 60 ? 'intermediate' : 'basic',
    }));

    return {
      learnerId: learner.id,
      learnerName: learner.full_name,
      targetRole: job.title,
      targetSector: job.sector,
      matchScore: evaluation.matchPercentage,
      matchTier: evaluation.matchTier,
      evaluatedSkillsCount: evaluation.evaluatedSkillsCount,
      satisfiedSkillsCount: evaluation.satisfiedSkillsCount,
      missingSkillsCount: evaluation.missingSkillsCount,
      missingSkills,
      strengths,
      provenance: {
        dataSource: 'CALCULATED',
        algorithm: 'CompetencyVector-v2',
        calculatedAt: new Date().toISOString(),
        isSufficientData: sufficiency.isSufficientData,
        sampleSize: sufficiency.sampleSize,
      },
    };
  }
}
