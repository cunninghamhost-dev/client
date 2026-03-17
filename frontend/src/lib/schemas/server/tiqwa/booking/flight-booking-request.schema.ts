import { z } from 'zod';
import { DateStringSchema } from '../../shared/travel.schema';

/**********************************************************
 * ----------------- Passenger Document ----------------- *
 *********************************************************/
export const TiqwaPassengerDocumentSchema = z.object({
  number: z.string().min(3),
  issuing_date: DateStringSchema,
  expiry_date: DateStringSchema,
  issuing_country: z.string().length(2), // ISO country code
  nationality_country: z.string().length(2), // ISO country code
  document_type: z.enum(['passport']),
  holder: z.boolean(),
});

/**********************************************************
 * --------------------- Passenger  ---------------------- *
 *********************************************************/
export const TiqwaFlightPassengerSchema = z.object({
  passenger_type: z.enum(['adult', 'child', 'infant']),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  dob: DateStringSchema,
  gender: z.enum(['male', 'female']),
  title: z.enum(['mr', 'mrs', 'miss', 'ms']),
  email: z.string().email(),
  phone_number: z.string().min(7),
  documents: TiqwaPassengerDocumentSchema,
});

/********************************************************************************************************
 * --------------------------------------- Booking Request Body ---------------------------------------- *
 ********************************************************************************************************/
export const TiqwaFlightBookingRequestSchema = z.object({
  passengers: z.array(TiqwaFlightPassengerSchema).min(1),
});

/********************************************************************************************************
 * --------------------------------------------- REQUEST ---------------------------------------------- *
 ********************************************************************************************************/
export type TTiqwaFlightBookingRequest = z.infer<typeof TiqwaFlightBookingRequestSchema>;
