import {
  TiqwaAirportListResponseSchema,
  TTiqwaAirportListResponse,
} from '@/lib/schemas/server/tiqwa/utilities/airport-utility.schema';
import { TiqwaFetcherUtil } from '@/lib/utils/server/tiqwa-fetcher.util';

export async function airportsUtilityServiceGET(query: string): Promise<TTiqwaAirportListResponse> {
  //console.log('Response from Tiqwa Server:', query);
  const response = await TiqwaFetcherUtil(`/airports?keyword=${query}`, {
    method: 'GET',
  });

  return TiqwaAirportListResponseSchema.parse(response);
}
