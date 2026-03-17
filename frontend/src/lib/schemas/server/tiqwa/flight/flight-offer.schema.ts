import { z } from 'zod';
import { FlightSegmentSchema } from './flight-segment.schema';
import { TravelerPriceSchema } from './traveler-price.schema';

export const FlightOfferSchema = z.object({
  id: z.string().uuid(),

  amount: z.number().positive(),
  currency: z.string().length(3),

  travelers_price: z.array(TravelerPriceSchema),

  total_duration: z.number().int().positive(),

  outbound: z.array(FlightSegmentSchema),
  inbound: z.array(FlightSegmentSchema),

  total_outbound_duration: z.number().int().positive(),
  total_inbound_duration: z.number().int().positive(),

  outbound_stops: z.number().int().min(0),
  inbound_stops: z.number().int().min(0),

  source: z.string(),
});

export type TFlightOffer = z.infer<typeof FlightOfferSchema>;
