import { z } from 'zod';

export const IATACityCodeSchema = z
  .string()
  .trim()
  .length(3, 'IATA city code must be exactly 3 characters')
  .regex(/^[A-Z]{3}$/, 'IATA city code must be A–Z letters only')
  .transform((v) => v.toUpperCase())
  .nullable();

export const IATACountryCodeSchema = z
  .string()
  .trim()
  .length(2, 'IATA country code must be exactly 3 characters')
  .regex(/^[A-Z]{2}$/, 'IATA country code must be A–Z letters only')
  .transform((v) => v.toUpperCase())
  .nullable();

export const TiqwaIataCodeSchema = z
  .string()
  .trim()
  .min(3)
  .max(20)
  .transform((v) => v.toUpperCase());

/**
 * ---- Date (YYYY-MM-DD) ----
 */
export const DateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD');

/**
 * ---- ISO DateTime ----
 */
export const ISODateTimeSchema = z.string().datetime({ offset: true });

export type TIATACityCode = z.infer<typeof IATACityCodeSchema>;
export type TIATACountryCode = z.infer<typeof IATACountryCodeSchema>;
export type TDateString = z.infer<typeof DateStringSchema>;
export type TISODateTime = z.infer<typeof ISODateTimeSchema>;
