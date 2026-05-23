// src/lib/types/server/airport.types.ts
export interface Airport {
  iata_code: string;
  city_code: string;
  city: string;
  country: string;
}

export type AirportListResponse = Airport[];

export interface AirportLocationValue {
  city: string;
  city_code: string;
  country: string;
}

export interface TiqwaCity {
  name: string;
  city_code: string;
}

export interface TiqwaCountry {
  name: string;
  cities: TiqwaCity[];
}

export interface ISearchItem {
  country: string;
  city: string;
  city_code: string;
  label: string; // what user sees
}
