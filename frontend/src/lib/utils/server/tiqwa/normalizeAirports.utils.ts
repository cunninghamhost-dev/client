import { TTiqwaAirportListResponse } from '@/lib/schemas/server/tiqwa/utilities/airport-utility.schema';
import { TiqwaCountry } from '@/types/server/tiqwa-airports.types';

export function tiqwaNormalizeAirports(airports: TTiqwaAirportListResponse): TiqwaCountry[] {
  const map = new Map<string, TiqwaCountry>();

  for (const airport of airports) {
    if (!map.has(airport.country)) {
      map.set(airport.country, {
        name: airport.country,
        cities: [],
      });
    }

    map.get(airport.country)!.cities.push({
      name: airport.city,
      city_code: airport.city_code ? airport.city_code : '',
    });
  }

  return Array.from(map.values());
}
