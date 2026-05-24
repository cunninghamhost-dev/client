//src/lib/hooks/tiqwa/flight-search.hook.ts
import { useQuery } from '@tanstack/react-query';
import { TTiqwaFlightSearchParams } from '@/lib/types/flight-search/flight-search-parser';
import { getFlightSearchService } from '@/app/service/tiqwa/flight/flight-search.service';

export const useGetTiqwaFlightSearch = (payload: TTiqwaFlightSearchParams) => {
  const enabled = Boolean(payload.origin) && Boolean(payload.destination) && Boolean(payload.departure_date);
  return useQuery({
    queryKey: ['flight-search', payload],
    queryFn: () => getFlightSearchService(payload),
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
