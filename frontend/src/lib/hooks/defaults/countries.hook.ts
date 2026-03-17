import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { z } from 'zod';
import { fetchJSON } from '@/lib/utils/server/response.util';
import { CountryListResponseSchema, CountryResponseSchema } from '@/lib/schemas/server/defaults/countries.schema';

export type TCountryListResponse = z.infer<typeof CountryListResponseSchema>;
export type TCountryResponse = z.Infer<typeof CountryResponseSchema>;

/* ===========================================================================
   ===================== 🟠 Countries Selections =====================
============================================================================== */

type TUseSelectCountriesOptions = Omit<UseQueryOptions<TCountryListResponse, Error>, 'queryKey' | 'queryFn'>;

/* -----------------------------
   🟠 Get all Countries
----------------------------- */
export const useGetSelectCountries = (
  search?: string,
  continent?: string,
  limit = 100,
  options?: TUseSelectCountriesOptions,
) =>
  useQuery<TCountryListResponse>({
    queryKey: ['select_countries', search, continent, limit],
    queryFn: async () => {
      const url = new URL('/api/select/countries', window.location.origin);

      url.searchParams.set('limit', limit.toString());
      if (search) url.searchParams.set('search', search);
      if (continent) url.searchParams.set('continent', continent);

      return fetchJSON<TCountryListResponse>(url.toString());
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: limit > 0,
    ...options, // 👈 allow override
  });

/* -----------------------------
   🟠 GET BY ID CLient Order profile
   on the Model set
----------------------------- */
export function useGetCountry(countryId: string | null) {
  return useQuery({
    queryKey: ['country_details', countryId],
    queryFn: async () => {
      if (!countryId) return null;
      const res = await fetchJSON<TCountryResponse>(`/api/select/countries/${countryId}`);
      return res;
    },
    enabled: !!countryId,
    retry: 1,
  });
}
