import { NextRequest } from 'next/server';
import { SkillDemandService } from '@/lib/services/skill-demand.service';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const sector = searchParams.get('sector') || undefined;
    const state = searchParams.get('state') || undefined;
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!, 10)
      : 15;

    const result = await SkillDemandService.getSkillDemandAnalytics({
      sector,
      state,
      limit: Number.isNaN(limit) ? 15 : limit,
    });

    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}
