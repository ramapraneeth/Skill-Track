import { z } from 'zod';

export const createEmploymentOutcomeSchema = z.object({
  learnerId: z.string().min(1, 'Learner ID is required'),
  jobId: z.string().optional().nullable(),
  employerName: z.string().min(2, 'Employer name must be at least 2 characters'),
  designation: z.string().min(2, 'Designation is required'),
  sector: z.string().min(2, 'Sector is required'),
  district: z.string().min(2, 'District is required'),
  state: z.string().min(2, 'State is required'),
  monthlySalary: z.number().positive('Monthly salary must be a positive number'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format'),
  status: z.enum(['active', 'resigned', 'terminated']).default('active'),
  verified: z.boolean().default(true),
});

export const createSelfEmploymentSchema = z.object({
  learnerId: z.string().min(1, 'Learner ID is required'),
  enterpriseName: z.string().min(2, 'Enterprise name is required'),
  sector: z.string().min(2, 'Sector is required'),
  district: z.string().min(2, 'District is required'),
  state: z.string().min(2, 'State is required'),
  monthlyRevenue: z.number().nonnegative('Monthly revenue must be zero or positive'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format'),
  microfinanceSupport: z.boolean().default(false),
});

export const createApprenticeshipSchema = z.object({
  learnerId: z.string().min(1, 'Learner ID is required'),
  establishmentName: z.string().min(2, 'Establishment name is required'),
  sector: z.string().min(2, 'Sector is required'),
  stipendAmount: z.number().positive('Stipend amount must be positive'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format'),
  durationMonths: z.number().int().min(1).max(36).default(12),
  contractNumber: z.string().min(3, 'Contract number is required'),
});

export type CreateEmploymentInput = z.infer<typeof createEmploymentOutcomeSchema>;
export type CreateSelfEmploymentInput = z.infer<typeof createSelfEmploymentSchema>;
export type CreateApprenticeshipInput = z.infer<typeof createApprenticeshipSchema>;
