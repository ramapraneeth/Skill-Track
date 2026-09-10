import { NextRequest } from 'next/server';
import { InsightService } from '@/lib/services/insight.service';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const riskLevel = searchParams.get('riskLevel') || undefined;

    const predictions = await InsightService.listPredictions(riskLevel);
    return successResponse(predictions);
  } catch (error) {
    return errorResponse(error);
  }
}
