//src/lib/hooks/tiqwa/flight-search.hook.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/apiClient';
import { FlightDetailsProps } from '@/lib/types/flight-search/response-flight-search.type';

export type Flight = FlightDetailsProps;

type FlightSearchResponse = Flight[] | {
  data?: Flight[];
};

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departure_date: string;
  return_date?: string;
  adults: number;
  children: number;
  infants: number;
  cabin: string;
}

export const useGetTiqwaFlightSearch = (params: FlightSearchParams) => {
  return useQuery({
    queryKey: ['flights', params.origin, params.destination, params.departure_date, params.return_date, params.adults, params.children, params.infants, params.cabin],
    queryFn: async () => {
      // Convert params to Record<string, string | number>
      const query = Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined) acc[key] = value;
        return acc;
      }, {} as Record<string, string | number>);

      const response = await apiClient.get<FlightSearchResponse>(
        '/flights/search',
        {
          query,
        }
      );

      console.log('📡 Backend Response:', response);

      return Array.isArray(response) ? response : response.data ?? [];
    },
    enabled: !!(params.origin && params.destination && params.departure_date),
  });
};
