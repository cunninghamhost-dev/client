import { api } from '@/lib/api';
import { TTiqwaAirportListResponse } from '@/lib/schemas/tiqwa/flight/flight-utilities.schema';
import { ApiResponse } from '@/lib/types/server/api_server.type';

/** ***********************************************
 * Airport User utilities
 * *********************************************** */
export async function getAirportService(query: string): Promise<TTiqwaAirportListResponse | undefined> {
  const res = await api.get<ApiResponse<TTiqwaAirportListResponse>>(`/api/flights/airports?keyword=${query}`);
  return res.data.data;
}
