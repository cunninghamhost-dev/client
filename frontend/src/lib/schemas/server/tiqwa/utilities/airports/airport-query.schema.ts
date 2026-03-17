import { z } from 'zod';

export const TiqwaAirportQuerySchema = z.object({
  keyword: z.string(),
});

export type TTiqwaAirportQuery = z.infer<typeof TiqwaAirportQuerySchema>;
