import { z } from 'zod';
import { DateStringSchema } from '../../shared/travel.schema';
import {
  TiqwaBookedPassengerSchema,
  TiqwaBookingSegmentSchema,
  TiqwaTravelerPriceSchema,
} from '../shared/booking-shared-response.schema';

/********************************************************************************************************
 * ------------------------------------- Booking Response Payload -------------------------------------- *
 ********************************************************************************************************/
export const TiqwaFlightBookingResponseSchema = z.object({
  id: z.string(),
  reference: z.string(),

  amount: z.string(), // API returns string
  currency: z.string(),

  bookable_seats: z.number(),
  document_required: z.boolean(),
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
});

/********************************************************************************************************
 * ------------------------------------- Response -------------------------------------- *
 ********************************************************************************************************/
export type TTiqwaFlightBookingResponse = z.infer<typeof TiqwaFlightBookingResponseSchema>;
