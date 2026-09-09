export type UserRole = 'learner' | 'provider' | 'government' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string | null;
  avatarUrl?: string | null;
  isActive?: boolean;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresIn: number;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  fullName: string;
  iat?: number;
  exp?: number;
}
