import { NextRequest } from 'next/server';
import { JobMatchService } from '@/lib/services/job-match.service';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);

    const sector = searchParams.get('sector') || undefined;
    const state = searchParams.get('state') || undefined;
    const minSalary = searchParams.get('minSalary')
      ? parseFloat(searchParams.get('minSalary')!)
      : undefined;
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!, 10)
      : 10;

    const result = await JobMatchService.getJobMatchesForLearner({
      learnerId: id,
      sector,
      state,
      minSalary: Number.isNaN(minSalary) ? undefined : minSalary,
      limit: Number.isNaN(limit) ? 10 : limit,
    });

    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}
