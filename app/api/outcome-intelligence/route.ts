import { NextRequest } from 'next/server';
import { OutcomeIntelligenceService } from '@/lib/services/outcome-intelligence.service';
import { filterParamsSchema } from '@/lib/validations/analytics.schema';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filterInput = {
      state: searchParams.get('state') || undefined,
      district: searchParams.get('district') || undefined,
      programmeId: searchParams.get('programmeId') || undefined,
      providerId: searchParams.get('providerId') || undefined,
      sector: searchParams.get('sector') || undefined,
      schemeName: searchParams.get('schemeName') || undefined,
    };
    const validated = filterParamsSchema.parse(filterInput);
    const overview = await OutcomeIntelligenceService.getExecutiveOverview(validated);
    return successResponse(overview);
  } catch (error) {
    return errorResponse(error);
  }
}
