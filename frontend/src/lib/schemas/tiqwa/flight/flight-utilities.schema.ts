import { z } from 'zod';
import { IATACityCodeSchema, TiqwaIataCodeSchema } from '../../server/shared/travel.schema';

/**********************************************************
 * ----------------- Airport Response ----------------- *
 *********************************************************/
export const TiqwaAirportUtilitySchema = z.object({
  city: z.string(),
  city_code: IATACityCodeSchema,
  country: z.string(),
  iata_code: TiqwaIataCodeSchema,
  name: z.string(),
});

/********************************************************************************************************
 * ------------------------------------- Airport Utility Response ------------------------------------- *
 ********************************************************************************************************/
export const TiqwaAirportListResponseSchema = z.array(TiqwaAirportUtilitySchema);

/**********************************************************
 * ----------------- Airport Location Value Response ----------------- *
 *********************************************************/
export const TiqwaAirportLocationValueSchema = z.object({
  city: z.string(),
  city_code: IATACityCodeSchema,
  country: z.string(),
});

/********************************************************************************************************
 * --------------------------------------------- Response --------------------------------------------- *
 ********************************************************************************************************/
export type TTiqwaAirportListResponse = z.infer<typeof TiqwaAirportListResponseSchema>;
export type TTiqwaAirportLocationValue = z.infer<typeof TiqwaAirportLocationValueSchema>;
