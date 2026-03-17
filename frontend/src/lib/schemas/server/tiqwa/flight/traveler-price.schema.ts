import { z } from 'zod';

export const TravelerPriceSchema = z.union([
  z.object({ adult: z.number().positive() }),
  z.object({ child: z.number().positive() }),
  z.object({ infant: z.number().positive() }),
]);

export type TTravelerPrice = z.infer<typeof TravelerPriceSchema>;
