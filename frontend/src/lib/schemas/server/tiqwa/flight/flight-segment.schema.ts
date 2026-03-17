import { z } from 'zod';
import { AirlineDetailsSchema } from './airline.schema';
import { IATACityCodeSchema, ISODateTimeSchema } from '../../shared/travel.schema';

export const FlightSegmentSchema = z.object({
  airport_from: IATACityCodeSchema,
  airport_to: IATACityCodeSchema,

  departure_time: ISODateTimeSchema,
  arrival_time: ISODateTimeSchema,

  flight_number: z.string(),
  cabin_type: z.string(), // keep flexible ("economy", etc.)
  duration: z.number().int().positive(),

  equipment_type: z.string(),
  operating_airline: z.string(),
  marketing_airline: z.string(),

  airline_details: AirlineDetailsSchema,

  marriage_group: z.string().nullable(),
  booking_class: z.string(),

  baggage: z.string(),
  overnight: z.boolean(),
  layover: z.number().nullable(),
});

export type TFlightSegment = z.infer<typeof FlightSegmentSchema>;
