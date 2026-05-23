import { getAirportService } from '@/app/service/tiqwa/utilities/airportUtility.service';
import { useQuery } from '@tanstack/react-query';

/* ======================================
   🟢 Get Airport list from tiqwa serve
   =================================== */
export const useGetAirports_tiqwa = (keyword: string) => {
  if (!keyword) {
    keyword = 'par,lon,nyc,dxb,bkk,tyo,ist,rom,bcn,sin';
  }
  return useQuery({
    queryKey: ['airports', keyword],
    queryFn: () => getAirportService(keyword),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    staleTime: 1000 * 60 * 10, //30 minutes cache
    gcTime: Infinity,
  });
};