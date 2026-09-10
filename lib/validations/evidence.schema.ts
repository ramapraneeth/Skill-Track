import { z } from 'zod';

export const createFollowupSchema = z.object({
  learnerId: z.string().min(1, 'Learner ID is required'),
  milestone: z.enum(['30_day', '60_day', '90_day', '6_month', '12_month']),
  followupDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Followup date must be in YYYY-MM-DD format'),
  employmentStatus: z.enum(['retained', 'promoted', 'switched', 'unemployed']).default('retained'),
  currentSalary: z.number().nonnegative().default(0),
  retentionStatus: z.enum(['retained', 'attrited']).default('retained'),
  jobSatisfactionScore: z.number().int().min(1).max(5).default(4),
  skillRelevanceScore: z.number().int().min(1).max(5).default(4),
  attritionReason: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  surveyorRole: z.string().default('provider'),
});

export type CreateFollowupInput = z.infer<typeof createFollowupSchema>;
