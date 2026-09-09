import { NextRequest } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { AuthService } from '@/lib/services/auth.service';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const session = requireAuth(req);
    const user = await AuthService.getMe(session.sub);
    return successResponse(user);
  } catch (error) {
    return errorResponse(error);
  }
}
