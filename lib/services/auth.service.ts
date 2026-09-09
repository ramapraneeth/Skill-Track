import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';
import { signJwt } from '@/lib/auth/session';
import { UnauthorizedError, ForbiddenError } from '@/lib/api/errors';
import { LoginInput } from '@/lib/validations/auth.schema';
import { AuthSession, UserRole } from '@/types/auth';

export class AuthService {
  static async login(input: LoginInput): Promise<AuthSession> {
    const user = await prisma.users.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (!user.is_active) {
      throw new ForbiddenError('Account has been deactivated. Please contact your administrator.');
    }

    const isMatch = await bcrypt.compare(input.password, user.hashed_password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (input.role) {
      const requestedRole = (
        input.role === 'training_provider' ? 'provider' : input.role === 'administrator' || input.role === 'admin' ? 'government' : input.role
      ) as UserRole;

      const userRole = (
        user.role === 'training_provider' ? 'provider' : user.role === 'administrator' || user.role === 'admin' ? 'government' : user.role
      ) as UserRole;

      if (userRole !== requestedRole) {
        throw new ForbiddenError(
          `Unauthorized role. This account is registered as '${user.role}' and cannot log in as '${input.role}'.`
        );
      }
    }

    const normalizedRole = (
      user.role === 'training_provider' ? 'provider' : user.role === 'administrator' || user.role === 'admin' ? 'government' : user.role
    ) as UserRole;

    const token = signJwt({
      sub: user.id,
      email: user.email,
      role: normalizedRole,
      fullName: user.full_name,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: normalizedRole,
        phone: user.phone,
        avatarUrl: user.avatar_url,
        isActive: user.is_active ?? true,
      },
      token,
      expiresIn: 86400,
    };
  }

  static async getMe(userId: string) {
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });
    if (!user) throw new UnauthorizedError('User session invalid');

    const normalizedRole = (
      user.role === 'training_provider' ? 'provider' : user.role === 'administrator' || user.role === 'admin' ? 'government' : user.role
    ) as UserRole;

    return {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      role: normalizedRole,
      phone: user.phone,
      avatarUrl: user.avatar_url,
      isActive: user.is_active ?? true,
    };
  }
}
