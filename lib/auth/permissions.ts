import { JwtPayload, UserRole } from '@/types/auth';
import { ForbiddenError } from '@/lib/api/errors';

export function requireRole(session: JwtPayload, allowedRoles: UserRole[]): void {
  const normalizedUserRole = (
    session.role === 'admin' || session.role === 'government' ? 'government' : session.role
  ) as UserRole;

  const matches = allowedRoles.some((r) => {
    if (r === 'government' && (session.role === 'admin' || session.role === 'government')) return true;
    return r === normalizedUserRole;
  });

  if (!matches) {
    throw new ForbiddenError(
      `Access denied. Role '${session.role}' is not authorized for this operation. Requires one of: ${allowedRoles.join(', ')}`
    );
  }
}
