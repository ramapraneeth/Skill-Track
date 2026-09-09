import { NextRequest } from 'next/server';
import { AuthService } from '@/lib/services/auth.service';
import { loginSchema } from '@/lib/validations/auth.schema';
import { successResponse, errorResponse } from '@/lib/api/response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = loginSchema.parse(body);
    const session = await AuthService.login(validated);
    return successResponse(session, 200);
  } catch (error) {
    return errorResponse(error);
  }
}
