import { z } from 'zod';
import { DateStringSchema, IATACityCodeSchema, ISODateTimeSchema } from '../../shared/travel.schema';

/**********************************************************
 * --------------------- Segment  ---------------------- *
 *********************************************************/
export const TiqwaBookingSegmentSchema = z.object({
  airport_from: IATACityCodeSchema,
  airport_to: IATACityCodeSchema,
  departure_time: ISODateTimeSchema,
  arrival_time: ISODateTimeSchema,
  flight_number: z.string(),
  cabin_type: z.string(),
  duration: z.number(),
  equipment_type: z.string(),
  operating_airline: z.string(),
  marketing_airline: z.string(),
  booking_class: z.string(),
  baggage: z.string(),
  layover: z.number().nullable(),
  marriage_group: z.string().nullable(),
  overnight: z.boolean(),
});

/**********************************************************
 * ------------------ Traveler Price  ------------------- *
 *********************************************************/
export const TiqwaTravelerPriceSchema = z.union([
  z.object({ adult: z.number() }),
  z.object({ child: z.number() }),
  z.object({ infant: z.number() }),
]);

/**********************************************************
 * ------------------ Passenger  ------------------- *
 *********************************************************/
export const TiqwaBookedPassengerSchema = z.object({
  passenger_type: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  dob: DateStringSchema,
  gender: z.string(),
  title: z.string(),
  email: z.email(),
  phone_number: z.string(),
  documents: z.object({
    number: z.string(),
    issuing_date: DateStringSchema,
    expiry_date: DateStringSchema,
    issuing_country: z.string(),
    nationality_country: z.string(),
    document_type: z.string(),
    holder: z.boolean(),
  }),
});
