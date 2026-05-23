export interface FlightItem {
  destination: string;
  departureDate?: string;
  returnDate?: string;
  price?: { total: string; currency: string };
  links?: Record<string, string>;
}
export interface AmadeusFlightDestination {
  type: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  price: {
    total: string;
    currency?: string;
  };
  links: {
    flightDates: string;
    flightOffers: string;
  };
}

export interface AmadeusResponse {
  data: AmadeusFlightDestination[];
  dictionaries?: {
    locations?: Record<
      string,
      {
        subType: string;
        detailedName: string;
      }
    >;
    currencies?: Record<string, string>;
  };
  meta?: {
    currency?: string;
  };
}
