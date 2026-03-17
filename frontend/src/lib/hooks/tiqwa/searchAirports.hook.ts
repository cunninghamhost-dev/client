import { searchAirportService } from '@/app/service/domain/utilities/airport.service';
import { useQuery } from '@tanstack/react-query';

/* ======================================
   🟢 Get Airport list from tiqwa serve
   =================================== */
export const useGetAirports_tiqwa = (keyword: string) => {
  return useQuery({
    queryKey: ['airports', keyword],
    queryFn: () => searchAirportService(keyword),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    staleTime: 1000 * 60 * 10, //30 minutes cache
    gcTime: Infinity,
  });
};
