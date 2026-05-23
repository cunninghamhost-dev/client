import { api } from '@/lib/api';
import { TTiqwaFlightSearchParams } from '@/lib/types/flight-search/flight-search-parser';
import { FlightDetailsProps } from '@/lib/types/flight-search/response-flight-search.type';
import { ApiResponse } from '@/lib/types/server/api_server.type';

/** ***********************************************
 * Flight Search Service
 * *********************************************** */
export async function getFlightSerachService(
  payload: TTiqwaFlightSearchParams,
): Promise<ApiResponse<{ result?: FlightDetailsProps[] }>> {
  // Convert params to Record<string, string | number>
  const query = Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
  const res = await api.get<ApiResponse<{ result?: FlightDetailsProps[] }>>('/api/flight/search', {
    params: query,
  });
  return res.data;
}
