import { NextRequest } from 'next/server';
import { CourseRecommendationService } from '@/lib/services/course-recommendation.service';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);

    const sector = searchParams.get('sector') || undefined;
    const maxDurationHours = searchParams.get('maxDurationHours')
      ? parseInt(searchParams.get('maxDurationHours')!, 10)
      : undefined;
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!, 10)
      : 5;

    const result = await CourseRecommendationService.getRecommendationsForLearner({
      learnerId: id,
      sector,
      maxDurationHours: Number.isNaN(maxDurationHours) ? undefined : maxDurationHours,
      limit: Number.isNaN(limit) ? 5 : limit,
    });

    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}
