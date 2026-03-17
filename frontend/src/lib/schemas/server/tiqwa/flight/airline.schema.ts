import { z } from 'zod';

export const AirlineDetailsSchema = z.object({
  code: z.string(),
  logo: z.url(),
  name: z.string(),
});

export type TAirlineDetails = z.infer<typeof AirlineDetailsSchema>;
