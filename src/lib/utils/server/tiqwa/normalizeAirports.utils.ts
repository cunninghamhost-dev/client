import { TTiqwaAirportListResponse } from '@/lib/schemas/tiqwa/flight/flight-utilities.schema';
import { ISearchItem, TiqwaCountry } from '@/lib/types/server/airport.types';

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

export function tiqwaCreateSearchIndex(countries: TiqwaCountry[]): ISearchItem[] {
  return countries.flatMap((country) =>
    country.cities.map((city) => ({
      country: country.name,
      city: city.name,
      city_code: city.city_code ? city.city_code : '',
      airport_name: city.name,
      label: `${city.name}, ${country.name} (${city.city_code})`,
    })),
  );
}
