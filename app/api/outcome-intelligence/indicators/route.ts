import { NextRequest } from 'next/server';
import { IndicatorService } from '@/lib/services/indicator.service';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'all';

    if (type === 'schemes') {
      const schemes = await IndicatorService.getSchemeIndicators();
      return successResponse(schemes);
    }

    if (type === 'providers') {
      const providers = await IndicatorService.getProviderIndicators();
      return successResponse(providers);
    }

    const [schemes, providers] = await Promise.all([
      IndicatorService.getSchemeIndicators(),
      IndicatorService.getProviderIndicators(),
    ]);

    return successResponse({ schemes, providers });
  } catch (error) {
    return errorResponse(error);
  }
}
