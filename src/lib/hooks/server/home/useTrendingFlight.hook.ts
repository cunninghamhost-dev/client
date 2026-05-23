import { useAPICatcher } from '../useApiCatcher';
import { AmadeusResponse } from '@/types/server/amadeus.types';

export function useTrendingFlight() {
  return useAPICatcher<AmadeusResponse>(`/api/amadeus/trending-flights?origin=PAR`);
}
