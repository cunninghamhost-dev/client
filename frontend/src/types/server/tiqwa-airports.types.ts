// export interface TiqwaAirport {
//   city: string;
//   city_code: string;
//   country: string;
//   iata_code: string;
//   name: string;
// }

export interface TiqwaCity {
  name: string;
  city_code: string;
}

export interface TiqwaCountry {
  name: string;
  cities: TiqwaCity[];
}
