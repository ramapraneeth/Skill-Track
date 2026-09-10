import { NextRequest } from 'next/server';
import { calculateSkillGapSchema } from '@/lib/validations/skill-gap.schema';
import { evaluateSkillGap } from '@/lib/intelligence/scoring';
import { prisma } from '@/lib/db/prisma';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = calculateSkillGapSchema.parse(body);

    const result = evaluateSkillGap(
      validated.jobRequirements as any,
      validated.learnerSkills as any
    );

    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const learnerId = searchParams.get('learnerId');

    if (!learnerId) {
      return errorResponse(new Error('learnerId is required'));
    }

    const learner = await prisma.learners.findUnique({
      where: { id: learnerId },
      include: {
        learner_skills: true,
      },
    });

    if (!learner) {
      return errorResponse(new Error('Learner not found'));
    }

    // Pick first active job for comparison
    const job = await prisma.jobs.findFirst({
      where: { is_active: true },
    });

    const jobRequirements = (job?.required_skills as any[]) || [
      { skillId: 'sk-1', skillName: 'Python Programming', importance: 'mandatory', minProficiency: 'intermediate', weight: 4 },
      { skillId: 'sk-2', skillName: 'SQL Database Management', importance: 'mandatory', minProficiency: 'intermediate', weight: 4 },
      { skillId: 'sk-5', skillName: 'REST API Design', importance: 'preferred', minProficiency: 'intermediate', weight: 3 },
      { skillId: 'sk-6', skillName: 'Git Version Control', importance: 'preferred', minProficiency: 'basic', weight: 2 },
    ];

    const learnerSkills = learner.learner_skills.map((s: any) => ({
      skillId: s.skill_id,
      skillName: s.skill_name,
      proficiencyLevel: (s.proficiency_level as any) || 'intermediate',
      assessedScore: s.assessed_score || 70,
    }));

    const evaluation = evaluateSkillGap(jobRequirements, learnerSkills);

    return successResponse({
      learnerId: learner.id,
      learnerName: learner.full_name,
      targetJob: job?.title || 'Junior Software Engineer',
      targetSector: job?.sector || 'IT-ITeS',
      ...evaluation,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
