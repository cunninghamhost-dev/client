//src/lib/hooks/tiqwa/flight-search.hook.ts
import { useQuery } from '@tanstack/react-query';
import { TTiqwaFlightSearchParams } from '@/lib/types/flight-search/flight-search-parser';
import { getFlightSerachService } from '@/app/service/tiqwa/flight/flight-search.service';

export const useGetTiqwaFlightSearch = (params: TTiqwaFlightSearchParams) => {
  const enabled = Boolean(params.origin) && Boolean(params.destination) && Boolean(params.departure_date);
  return useQuery({
    queryKey: ['flights', params.origin, params.destination, params.departure_date, params.return_date, params.adults, params.children, params.infants, params.cabin],
    queryFn: () => getFlightSerachService(params),
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
