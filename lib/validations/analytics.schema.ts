import { z } from 'zod';

export const filterParamsSchema = z.object({
  state: z.string().optional(),
  district: z.string().optional(),
  programmeId: z.string().optional(),
  providerId: z.string().optional(),
  sector: z.string().optional(),
  schemeName: z.string().optional(),
});

export type FilterParamsInput = z.infer<typeof filterParamsSchema>;
