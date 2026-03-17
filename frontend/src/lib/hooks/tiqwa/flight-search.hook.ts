// src/app/lib/hooks/tiqwa/flight-search.hook.ts

import { TTiqwaFlightSearchParams } from '@/lib/types/flight-search/flight-search-parser';
import { FlightDetailsProps } from '@/lib/types/flight-search/response-flight-search.type';
import { useQuery } from '@tanstack/react-query';
import { jsonFetcher } from '../context/default/react-query-fetcher';
import { ApiSuccessResponse } from '@/lib/utils/server/response.util';

const buildSearchUrl = (params: TTiqwaFlightSearchParams) => {
  const url = new URL('/api/tiqwa/flights/search', window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });
  return url.toString();
};

export const useGetTiqwaFlightSearch = (params: TTiqwaFlightSearchParams) => {
  const enabled = Boolean(params.origin) && Boolean(params.destination) && Boolean(params.departure_date);
  return useQuery<FlightDetailsProps[], Error>({
    queryKey: ['tiqwa', 'flightSearch', params],
    queryFn: async ({ signal }) => {
      const url = buildSearchUrl(params);

      // jsonFetcher returns the parsed JSON; adapt if your API wraps it
      //const res = await jsonFetcher<{ result?: FlightDetailsProps[] }>(url.toString(), { method: 'GET', signal });
      const res = await jsonFetcher<ApiSuccessResponse<{ result?: FlightDetailsProps[] }>>(url.toString(), {
        method: 'GET',
        signal,
      });
      console.log('Hook Flight Search Result: ', res);
      return res.profile.result ?? [];
    },
    // 👇 Prevent any background fetching
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
