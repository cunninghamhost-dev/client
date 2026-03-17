import { z } from 'zod';
import { AirlineDetailsSchema } from '../flight/airline.schema';

/**********************************************************
 * ----------------- Airline Utility Response ----------------- *
 *********************************************************/
export const TiqwaAirlinesUtilitySchema = z.array(AirlineDetailsSchema);

export type TTiqwaAirlinesUtilityResponse = z.infer<typeof TiqwaAirlinesUtilitySchema>;
