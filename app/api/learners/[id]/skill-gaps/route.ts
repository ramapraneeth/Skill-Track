import { NextRequest } from 'next/server';
import { SkillGapService } from '@/lib/services/skill-gap.service';
import { ExplainabilityService } from '@/lib/ai-gateway/explainer';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId') || undefined;
    const explain = searchParams.get('explain') === 'true';

    const result = await SkillGapService.calculateLearnerSkillGap({
      learnerId: id,
      jobId,
    });

    if (explain) {
      const explanation = await ExplainabilityService.explainSkillGap({
        learnerName: result.learnerName,
        targetRole: result.targetRole,
        matchScore: result.matchScore,
        matchTier: result.matchTier,
        missingSkills: result.missingSkills.map((m) => ({
          skillName: m.skillName,
          priorityScore: m.priorityScore,
          importance: m.gapSeverity,
        })),
        acquiredSkillsCount: result.satisfiedSkillsCount,
      });

      return successResponse({
        ...result,
        explanation,
      });
    }

    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}
