import { prisma } from '@/lib/db/prisma';
import { evaluateSkillGap, SkillRequirement, LearnerSkillInput } from '@/lib/intelligence/scoring';
import { JobMatchResponse, JobMatchItem } from '@/lib/validations/ai-ml.schema';
import { NotFoundError } from '@/lib/api/errors';

export class JobMatchService {
  /**
   * Evaluates a candidate's competency profile across all active industry vacancies.
   * Ranks vacancies by mathematical fit percentage and tracks application statuses.
   */
  static async getJobMatchesForLearner(params: {
    learnerId?: string;
    sector?: string;
    state?: string;
    minSalary?: number;
    limit?: number;
  }): Promise<JobMatchResponse> {
    const limit = params.limit || 10;

    // 1. Resolve Learner and Skills
    const learner = params.learnerId
      ? await prisma.learners.findUnique({
          where: { id: params.learnerId },
          include: {
            learner_skills: true,
            job_applications: true,
          },
        })
      : await prisma.learners.findFirst({
          include: {
            learner_skills: true,
            job_applications: true,
          },
        });

    if (!learner) {
      throw new NotFoundError('Candidate profile not found.');
    }

    const appliedJobIds = new Set(learner.job_applications.map((app: any) => app.job_id));

    // Map candidate skills
    const learnerSkills: LearnerSkillInput[] = learner.learner_skills.map((s: any) => ({
      skillId: s.skill_id,
      skillName: s.skill_name,
      proficiencyLevel: (s.proficiency_level as any) || 'basic',
      assessedScore: s.assessed_score || 50,
      verified: s.verified || false,
    }));

    // 2. Query active jobs matching search filters
    const whereJob: any = { is_active: true };
    if (params.sector) whereJob.sector = params.sector;
    if (params.state) whereJob.state = params.state;
    if (params.minSalary) whereJob.max_salary = { gte: params.minSalary };

    const activeJobs = await prisma.jobs.findMany({
      where: whereJob,
      orderBy: { created_at: 'desc' },
    });

    if (activeJobs.length === 0) {
      return {
        learnerId: learner.id,
        learnerName: learner.full_name,
        totalJobsEvaluated: 0,
        matches: [],
        provenance: {
          dataSource: 'CALCULATED',
          algorithm: 'CompetencyVector-JobMatch-v1',
          calculatedAt: new Date().toISOString(),
          isSufficientData: false,
          sampleSize: 0,
        },
      };
    }

    // 3. Evaluate candidate fit against each job vacancy
    const matches: JobMatchItem[] = [];

    for (const job of activeJobs) {
      const rawRequirements = (job.required_skills as any[]) || [];
      const jobRequirements: SkillRequirement[] = rawRequirements.map((r: any) => ({
        skillId: r.skillId || r.id || 'sk-gen',
        skillName: r.skillName || r.name || 'Core Requirement',
        importance: (r.importance as any) || 'mandatory',
        minProficiency: (r.minProficiency as any) || 'intermediate',
        weight: typeof r.weight === 'number' ? r.weight : 3,
      }));

      const evaluation = evaluateSkillGap(jobRequirements, learnerSkills);
      const fit = evaluation.matchPercentage;

      let fitCategory: JobMatchItem['fitCategory'] = 'STRETCH ROLE';
      if (fit >= 80) fitCategory = 'STRONG MATCH';
      else if (fit >= 60) fitCategory = 'MODERATE MATCH';
      else if (fit >= 40) fitCategory = 'GROWTH OPPORTUNITY';

      matches.push({
        jobId: job.id,
        title: job.title,
        companyName: job.company_name,
        sector: job.sector,
        state: job.state,
        district: job.district,
        minSalary: job.min_salary,
        maxSalary: job.max_salary,
        vacancies: job.vacancies,
        fitPercentage: fit,
        fitCategory,
        matchedSkills: evaluation.strengths.map((s) => s.skillName),
        missingSkills: evaluation.missingSkills.map((m) => m.skillName),
        isApplied: appliedJobIds.has(job.id),
      });
    }

    // Sort by fit percentage descending
    matches.sort((a, b) => b.fitPercentage - a.fitPercentage);

    const topMatches = matches.slice(0, limit);

    return {
      learnerId: learner.id,
      learnerName: learner.full_name,
      totalJobsEvaluated: activeJobs.length,
      matches: topMatches,
      provenance: {
        dataSource: 'CALCULATED',
        algorithm: 'CompetencyVector-JobMatch-v1',
        calculatedAt: new Date().toISOString(),
        isSufficientData: activeJobs.length > 0,
        sampleSize: activeJobs.length,
      },
    };
  }
}
