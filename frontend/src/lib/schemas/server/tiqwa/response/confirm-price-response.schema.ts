import { z } from 'zod';
import { DateStringSchema, IATACityCodeSchema } from '../../shared/travel.schema';
import { AirlineDetailsSchema } from '../flight/airline.schema';

/**
 * ---- Traveler Price ----
 */
export const ConfirmPriceTravelerSchema = z.union([
  z.object({ adult: z.number().positive() }),
  z.object({ child: z.number().positive().optional() }),
  z.object({ infant: z.number().positive().optional() }),
]);

export const AirportTravelDetailsSchema = z.object({
  city: z.string(),
  city_code: z.string().length(3),
  country: z.string(),
  country_code: z.string().length(2),
  iata_code: z.string().length(3),
  name: z.string(),
});

export const PriceSummarySchema = z.object({
  passenger_type: z.string(),
  quantity: z.number().int().min(0),
  total_price: z.number().positive(),
});
export const PricingProfileSchema = z.object({
  base_fare: z.number().positive(),
  markup: z.number().nullable().optional(),
  payable: z.number().positive(),
  tax: z.number().positive().optional(),
});
/**
 * ---- Flight Segment ----
 */
export const ConfirmPriceSegmentSchema = z.object({
  airline_details: AirlineDetailsSchema,
  airport_from_details: AirportTravelDetailsSchema,
  airport_from: IATACityCodeSchema,
  airport_to_details: AirportTravelDetailsSchema,
  airport_to: IATACityCodeSchema,
  //arrival_time: ISODateTimeSchema,
  arrival_time: z.coerce.date(),
  baggage: z.string(),
  booking_class: z.string(),
  cabin_type: z.string(),
  //departure_time: ISODateTimeSchema,
  departure_time: z.coerce.date(),
  duration: z.number().int().positive(),
  equipment_type: z.string(),
  flight_number: z.string(),
  layover: z.number().nullable(),
  marketing_airline: z.string(),
  marriage_group: z.string().nullable(),
  operating_airline: z.string(),
  overnight: z.boolean(),
});

/**
 * ---- Confirm Price Response ----
 */
export const TiqwaConfirmPriceResponseSchema = z.object({
  amount: z.number().positive(),
  bookable_seats: z.number().int().min(0),
  currency: z.string().length(3),
  document_required: z.boolean(),
  expires_at: DateStringSchema,
  id: z.string(),
  inbound: z.array(ConfirmPriceSegmentSchema),
  inbound_stops: z.number().int().min(0),
  is_multicity: z.boolean(),
  office_id: z.string(),
  outbound: z.array(ConfirmPriceSegmentSchema),
  outbound_stops: z.number().int().min(0),
  price_change: z.boolean(),
  price_summary: z.array(PriceSummarySchema),
  pricing: PricingProfileSchema,
  total_duration: z.number().int().positive(),
  total_inbound_duration: z.number().min(0),
  total_outbound_duration: z.number().int().positive(),
  travelers_price: z.array(ConfirmPriceTravelerSchema),
});

/**
 * ---- Inferred Type ----
 */
export type TConfirmPriceSegment = z.infer<typeof ConfirmPriceSegmentSchema>;
export type TTiqwaConfirmPriceResponse = z.infer<typeof TiqwaConfirmPriceResponseSchema>;
