import { z } from 'zod';

// Data Provenance Enums
export const DataSourceEnum = z.enum(['OBSERVED', 'CALCULATED', 'PREDICTED', 'EXPLAINED']);
export type DataSource = z.infer<typeof DataSourceEnum>;

// Provenance Metadata Envelope
export const provenanceSchema = z.object({
  dataSource: DataSourceEnum,
  algorithm: z.string(),
  calculatedAt: z.string(),
  isSufficientData: z.boolean(),
  sampleSize: z.number().int().nonnegative().optional(),
});
export type ProvenanceMetadata = z.infer<typeof provenanceSchema>;

// 1. Skill Gap Request & Response Schemas
export const skillGapQuerySchema = z.object({
  learnerId: z.string().optional(),
  jobId: z.string().optional(),
  sector: z.string().optional(),
});
export type SkillGapQuery = z.infer<typeof skillGapQuerySchema>;

export const missingSkillDetailSchema = z.object({
  skillId: z.string(),
  skillName: z.string(),
  category: z.string().optional(),
  importance: z.enum(['mandatory', 'preferred', 'optional']),
  requiredProficiency: z.enum(['basic', 'intermediate', 'advanced']),
  currentProficiency: z.string(),
  gapSeverity: z.enum(['Critical', 'High', 'Medium', 'Low']),
  priorityScore: z.number().nonnegative(),
  recommendedAction: z.string(),
});
export type MissingSkillDetail = z.infer<typeof missingSkillDetailSchema>;

export const explanationSchema = z.object({
  summary: z.string(),
  keyFindings: z.array(z.string()),
  actionableInterventions: z.array(z.string()),
  engineUsed: z.enum(['DETERMINISTIC_RULES', 'GEMINI_1.5_FLASH']),
  provenance: provenanceSchema,
});
export type ExplanationResult = z.infer<typeof explanationSchema>;

export const skillGapResponseSchema = z.object({
  learnerId: z.string(),
  learnerName: z.string(),
  targetRole: z.string(),
  targetSector: z.string(),
  matchScore: z.number().min(0).max(100),
  matchTier: z.enum(['High Competency', 'Moderate Competency', 'Significant Gap', 'Critical Deficit']),
  evaluatedSkillsCount: z.number().int().nonnegative(),
  satisfiedSkillsCount: z.number().int().nonnegative(),
  missingSkillsCount: z.number().int().nonnegative(),
  missingSkills: z.array(missingSkillDetailSchema),
  strengths: z.array(z.object({
    skillId: z.string(),
    skillName: z.string(),
    assessedScore: z.number(),
    proficiencyLevel: z.string(),
  })),
  provenance: provenanceSchema,
  explanation: explanationSchema.optional(),
});
export type SkillGapResponse = z.infer<typeof skillGapResponseSchema>;

// 2. Course Recommendation Request & Response Schemas
export const courseRecommendationQuerySchema = z.object({
  learnerId: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(20).default(5),
  sector: z.string().optional(),
  maxDurationHours: z.coerce.number().positive().optional(),
});
export type CourseRecommendationQuery = z.infer<typeof courseRecommendationQuerySchema>;

export const recommendedCourseItemSchema = z.object({
  courseId: z.string(),
  courseCode: z.string(),
  title: z.string(),
  sector: z.string(),
  nsqfLevel: z.number().nullable(),
  durationHours: z.number().nullable(),
  relevanceScore: z.number().min(0).max(100),
  targetSkillsRemediated: z.array(z.string()),
  explanationReason: z.string(),
  providerName: z.string().optional(),
});
export type RecommendedCourseItem = z.infer<typeof recommendedCourseItemSchema>;

export const courseRecommendationResponseSchema = z.object({
  learnerId: z.string(),
  learnerName: z.string(),
  targetRole: z.string(),
  totalRecommendations: z.number().int().nonnegative(),
  courses: z.array(recommendedCourseItemSchema),
  provenance: provenanceSchema,
});
export type CourseRecommendationResponse = z.infer<typeof courseRecommendationResponseSchema>;

// 3. Job Matching Request & Response Schemas
export const jobMatchQuerySchema = z.object({
  learnerId: z.string().optional(),
  sector: z.string().optional(),
  state: z.string().optional(),
  minSalary: z.coerce.number().positive().optional(),
  limit: z.coerce.number().int().min(1).max(20).default(10),
});
export type JobMatchQuery = z.infer<typeof jobMatchQuerySchema>;

export const jobMatchItemSchema = z.object({
  jobId: z.string(),
  title: z.string(),
  companyName: z.string(),
  sector: z.string(),
  state: z.string(),
  district: z.string(),
  minSalary: z.number().nullable(),
  maxSalary: z.number().nullable(),
  vacancies: z.number().nullable(),
  fitPercentage: z.number().min(0).max(100),
  fitCategory: z.enum(['STRONG MATCH', 'MODERATE MATCH', 'GROWTH OPPORTUNITY', 'STRETCH ROLE']),
  matchedSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),
  isApplied: z.boolean(),
});
export type JobMatchItem = z.infer<typeof jobMatchItemSchema>;

export const jobMatchResponseSchema = z.object({
  learnerId: z.string(),
  learnerName: z.string(),
  totalJobsEvaluated: z.number().int().nonnegative(),
  matches: z.array(jobMatchItemSchema),
  provenance: provenanceSchema,
});
export type JobMatchResponse = z.infer<typeof jobMatchResponseSchema>;

// 4. Learner Preference Schema
export const updateLearnerPreferencesSchema = z.object({
  targetRole: z.string().min(2).max(150),
  preferredSector: z.string().max(100).optional(),
  preferredState: z.string().max(100).optional(),
  minExpectedSalary: z.number().positive().optional(),
});
export type UpdateLearnerPreferencesInput = z.infer<typeof updateLearnerPreferencesSchema>;

// 5. Skill Demand Analytics Schemas
export const skillDemandItemSchema = z.object({
  skillName: z.string(),
  jobCount: z.number().int().nonnegative(),
  totalVacancies: z.number().int().nonnegative(),
  demandSharePct: z.number().min(0).max(100),
  averageSalaryOffer: z.number().nullable(),
  topSectors: z.array(z.string()),
  trendingStatus: z.enum(['HIGH DEMAND', 'MODERATE DEMAND', 'EMERGING']),
});
export type SkillDemandItem = z.infer<typeof skillDemandItemSchema>;

export const skillDemandResponseSchema = z.object({
  totalActiveJobsAnalyzed: z.number().int().nonnegative(),
  totalVacanciesAnalyzed: z.number().int().nonnegative(),
  skills: z.array(skillDemandItemSchema),
  provenance: provenanceSchema,
  sufficiencyWarning: z.string().optional(),
});
export type SkillDemandResponse = z.infer<typeof skillDemandResponseSchema>;
