import { NextRequest } from 'next/server';
import { InsightService } from '@/lib/services/insight.service';
import { prisma } from '@/lib/db/prisma';
import { successResponse, errorResponse } from '@/lib/api/response';
import { requireAuth } from '@/lib/auth/session';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const learnerId = searchParams.get('learnerId') || undefined;
    const status = searchParams.get('status') || undefined;

    const interventions = await InsightService.listInterventions(learnerId, status);
    return successResponse(interventions);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAuth(req);
    const body = await req.json();

    const id = crypto.randomUUID();
    const created = await prisma.interventions.create({
      data: {
        id,
        learner_id: body.learnerId,
        recommended_by: body.recommendedBy || 'Outcome Intelligence Engine',
        category: body.category || 'upskilling',
        title: body.title,
        description: body.description,
        status: body.status || 'assigned',
        target_completion_date: body.targetCompletionDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        created_at: new Date(),
      },
    });

    return successResponse(created, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
