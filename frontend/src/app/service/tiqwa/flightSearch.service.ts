import { TTiqwaFlightSearchQuery } from '@/lib/schemas/server/tiqwa/flight/flight-search.schema';
import { FlightDetailsProps } from '@/lib/types/flight-search/response-flight-search.type';
import { TiqwaFetcherUtil } from '@/lib/utils/server/tiqwa-fetcher.util';

export async function flightSearchServiceGET(query: TTiqwaFlightSearchQuery): Promise<FlightDetailsProps[]> {
  const response = await TiqwaFetcherUtil<FlightDetailsProps[]>('/flight/search', {
    method: 'GET',
    query,
  });

  return response;
}
