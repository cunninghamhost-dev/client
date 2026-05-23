import { z } from 'zod';

export const FlightTypeSchema = z.enum(['one_way', 'round_trip', 'multi_city']);
export const CabinClassSchema = z.enum(['economy', 'premium_economy', 'business', 'first']);

export type FlightTypeEnum = z.infer<typeof FlightTypeSchema>;
export type CabinClassEnum = z.infer<typeof CabinClassSchema>;
