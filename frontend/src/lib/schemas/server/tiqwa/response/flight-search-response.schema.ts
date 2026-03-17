import { z } from 'zod';
import { FlightOfferSchema } from '../flight/flight-offer.schema';

/**
 * GET /flight/search response
 */
export const TiqwaFlightSearchResponseSchema = z.array(FlightOfferSchema);

export type TTiqwaFlightSearchResponse = z.infer<typeof TiqwaFlightSearchResponseSchema>;
