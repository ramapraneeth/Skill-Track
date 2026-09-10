import { NextRequest } from 'next/server';
import { EvidenceService } from '@/lib/services/evidence.service';
import { createFollowupSchema } from '@/lib/validations/evidence.schema';
import { successResponse, errorResponse } from '@/lib/api/response';
import { requireAuth } from '@/lib/auth/session';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const learnerId = searchParams.get('learnerId') || undefined;
    const includeStats = searchParams.get('stats') === 'true';

    const followups = await EvidenceService.listFollowups(learnerId);

    if (includeStats) {
      const stats = await EvidenceService.getEvidenceStats();
      return successResponse({ followups, stats });
    }

    return successResponse(followups);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAuth(req);
    const body = await req.json();
    const validated = createFollowupSchema.parse(body);
    const created = await EvidenceService.createFollowup(validated);
    return successResponse(created, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
