import { z } from 'zod';
import { DateStringSchema } from '../../shared/travel.schema';
import {
  TiqwaBookedPassengerSchema,
  TiqwaBookingSegmentSchema,
  TiqwaTravelerPriceSchema,
} from '../shared/booking-shared-response.schema';

/**
 * ---- Booking Details Response ----
 */
export const TiqwaBookingDetailsResponseSchema = z.object({
  reference: z.string(),
  pnr: z.string(),

  status: z.enum(['pending', 'confirmed', 'ticketed', 'cancelled']),

  amount: z.string(),
  currency: z.string(),

  bookable_seats: z.number(),
  document_required: z.boolean(),

  created_at: z.string(), // Tiqwa uses non-ISO datetime
  expires_at: DateStringSchema,

  price_change: z.boolean(),

  outbound: z.array(TiqwaBookingSegmentSchema),
  inbound: z.array(TiqwaBookingSegmentSchema),

  outbound_stops: z.number(),
  inbound_stops: z.number(),

  total_duration: z.number(),
  total_outbound_duration: z.number(),
  total_inbound_duration: z.number(),

  passengers: z.array(TiqwaBookedPassengerSchema),
  travelers_price: z.array(TiqwaTravelerPriceSchema),

  tickets: z.array(z.any()), // Empty array in sample; future-proof
});

export type TTiqwaBookingDetailsResponse = z.infer<typeof TiqwaBookingDetailsResponseSchema>;
