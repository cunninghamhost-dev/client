import { TiqwaCountry } from '@/types/server/tiqwa-airports.types';

export interface ISearchItem {
  country: string;
  city: string;
  city_code: string;
  label: string; // what user sees
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
