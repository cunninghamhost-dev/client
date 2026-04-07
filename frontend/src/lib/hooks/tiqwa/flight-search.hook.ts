import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/apiClient'; // Adjust path to your axios/fetch client

interface FlightSearchParams {
  origin: string;
  destination: string;
  departure_date: string;
  return_date?: string;
  adults: number;
  children: number;
  infants: number;
  cabin: string;
}
export const useGetTiqwaFlightSearch = (params: any) => {
  return useQuery({
    queryKey: ['flights', params],
    queryFn: async () => {
     
      const response = await apiClient.get<any>('/flights/search', {
        query: params,
      });

      console.log("📡 Backend Response:", response);

      return response.data || response; 
    },
    enabled: !!(params.origin && params.destination && params.departure_date),
  });
};
