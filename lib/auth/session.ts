import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { JwtPayload, UserRole } from '@/types/auth';
import { UnauthorizedError } from '@/lib/api/errors';

const JWT_SECRET = process.env.SECRET_KEY || 'skilltrack_longitudinal_super_secret_jwt_key_2024';
const JWT_EXPIRES_IN = '24h';

export function signJwt(payload: { sub: string; email: string; role: UserRole; fullName: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt(token: string): JwtPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    throw new UnauthorizedError('Invalid or expired authentication token');
  }
}

export function getSessionFromRequest(req: NextRequest): JwtPayload | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    return verifyJwt(token);
  } catch {
    return null;
  }
}

export function requireAuth(req: NextRequest): JwtPayload {
  const session = getSessionFromRequest(req);
  if (!session) {
    throw new UnauthorizedError('Authentication required to access this resource');
  }
  return session;
}
