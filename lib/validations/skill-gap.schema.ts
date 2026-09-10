import { z } from 'zod';

export const skillRequirementSchema = z.object({
  skillId: z.string(),
  skillName: z.string(),
  importance: z.enum(['mandatory', 'preferred', 'optional']),
  minProficiency: z.enum(['basic', 'intermediate', 'advanced']),
  weight: z.number().min(0).max(5).default(1),
});

export const learnerSkillSchema = z.object({
  skillId: z.string(),
  skillName: z.string(),
  proficiencyLevel: z.enum(['basic', 'intermediate', 'advanced']),
  assessedScore: z.number().min(0).max(100),
  verified: z.boolean().default(true),
});

export const calculateSkillGapSchema = z.object({
  jobId: z.string().optional(),
  targetRole: z.string().min(2, 'Target role is required'),
  targetSector: z.string().min(2, 'Target sector is required'),
  jobRequirements: z.array(skillRequirementSchema).min(1, 'At least one required skill is needed'),
  learnerSkills: z.array(learnerSkillSchema),
});

export type CalculateSkillGapInput = z.infer<typeof calculateSkillGapSchema>;
