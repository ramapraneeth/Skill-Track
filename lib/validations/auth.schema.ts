import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['learner', 'provider', 'training_provider', 'government', 'admin', 'administrator']).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
