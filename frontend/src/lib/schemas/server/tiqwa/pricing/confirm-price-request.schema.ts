import { z } from 'zod';

/**
 * Usually sent as query or body depending on Tiqwa setup
 */
export const TiqwaConfirmPriceRequestSchema = z.object({
  flight_id: z.string(),
});

export type TTiqwaConfirmPriceRequest = z.infer<typeof TiqwaConfirmPriceRequestSchema>;
