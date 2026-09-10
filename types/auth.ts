export type UserRole =
  | 'student'
  | 'trainer'
  | 'college'
  | 'company'
  | 'government'
  // Backward compatibility with legacy roles
  | 'learner'
  | 'provider'
  | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string | null;
  avatarUrl?: string | null;
  isActive?: boolean;
  registeredDate?: string;
  lastLogin?: string;
  organization?: string;
  studentId?: string;
  trainerId?: string;
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
