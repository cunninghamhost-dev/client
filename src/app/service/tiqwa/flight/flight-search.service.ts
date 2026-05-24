import { api } from '@/lib/api';
import { TTiqwaFlightSearchParams } from '@/lib/types/flight-search/flight-search-parser';
import { FlightDetailsProps } from '@/lib/types/flight-search/response-flight-search.type';
import { ApiResponse } from '@/lib/types/server/api_server.type';

/** ***********************************************
 * Flight Search Service
 * *********************************************** */
export async function getFlightSearchService(
  payload: TTiqwaFlightSearchParams,
): Promise<ApiResponse< FlightDetailsProps[] >> {
  const res = await api.post<ApiResponse<FlightDetailsProps[]>>('/api/flights/search', payload);
  return res.data;
}
