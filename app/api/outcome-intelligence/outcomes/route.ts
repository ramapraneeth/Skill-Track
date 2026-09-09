import { NextRequest } from 'next/server';
import { OutcomeService } from '@/lib/services/outcome.service';
import { createEmploymentOutcomeSchema } from '@/lib/validations/outcome.schema';
import { successResponse, errorResponse } from '@/lib/api/response';
import { requireAuth } from '@/lib/auth/session';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const learnerId = searchParams.get('learnerId') || undefined;
    const sector = searchParams.get('sector') || undefined;
    const state = searchParams.get('state') || undefined;

    const outcomes = await OutcomeService.listEmploymentOutcomes({ learnerId, sector, state });
    return successResponse(outcomes);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAuth(req);
    const body = await req.json();
    const validated = createEmploymentOutcomeSchema.parse(body);
    const created = await OutcomeService.createEmploymentOutcome(validated);
    return successResponse(created, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
