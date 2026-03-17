// declare module 'amadeus' {
//   export default class Amadeus {
//     constructor(options: { clientId: string; clientSecret: string });

//     // --- Flights ---
//     shopping: {
//       // --- Flight Offers Search ---
//       flightOffersSearch: {
//         get(params: FlightOfferSearchParams): Promise<ApiResponse<FlightOffer[]>>;
//       };

//       // --- Flight Destinations (cheapest destinations from origin) ---
//       flightDestinations: {
//         get(params: FlightDestinationsParams): Promise<ApiResponse<FlightDestination[]>>;
//       };

//       // --- Flight Offers Price (pricing of a specific offer) ---
//       flightOffersPricing: {
//         post(body: { data: FlightOffer[] }): Promise<ApiResponse<FlightPricingResult>>;
//       };

//       // --- Hotel Offers ---
//       hotelOffers: {
//         get(params: HotelOfferSearchParams): Promise<ApiResponse<HotelOffer[]>>;
//       };

//       // --- Hotel Offers by Hotel ID ---
//       hotelOffersByHotel: {
//         get(params: { hotelId: string }): Promise<ApiResponse<HotelOffer[]>>;
//       };
//     };

//     // --- Hotels ---
//     shoppingHotelOffers: {
//       get(params: HotelOfferSearchParams): Promise<ApiResponse<HotelOffer[]>>;
//     };

//     // --- Locations ---
//     referenceData: {
//       locations: {
//         get(params: LocationSearchParams): Promise<ApiResponse<Location[]>>;
//       };
//     };
//   }

//   // ---- Shared Response Wrapper ----
//   export interface ApiResponse<T> {
//     data: T;
//     meta?: Record<string, unknown>;
//     dictionaries?: Record<string, unknown>;
//   }

//   // ---- Flight Offer Search ----
//   export interface FlightOfferSearchParams {
//     originLocationCode: string;
//     destinationLocationCode: string;
//     departureDate: string;
//     returnDate?: string;
//     adults: string;
//     children?: string;
//     travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
//     nonStop?: boolean;
//     currencyCode?: string;
//     max?: number;
//   }

//   export interface FlightOffer {
//     type: string;
//     id: string;
//     source: string;
//     itineraries: Itinerary[];
//     price: Price;
//     validatingAirlineCodes: string[];
//   }

//   // ---- Hotel Offers ----
//   export interface HotelOfferSearchParams {
//     cityCode: string;
//     adults: number;
//     checkInDate: string;
//     checkOutDate: string;
//     roomQuantity?: number;
//     currency?: string;
//   }

//   export interface HotelOffer {
//     type: string;
//     hotel: {
//       hotelId: string;
//       name: string;
//       cityCode: string;
//     };
//     available: boolean;
//     offers: Array<{
//       id: string;
//       checkInDate: string;
//       checkOutDate: string;
//       price: {
//         currency: string;
//         total: string;
//       };
//     }>;
//   }

//   // ---- Location Search ----
//   export interface LocationSearchParams {
//     subType?: 'AIRPORT' | 'CITY' | string | string[];
//     keyword: string;
//     page?: { limit: number };
//   }

//   export interface Location {
//     type: string;
//     subType: string;
//     name: string;
//     iataCode: string;
//     address: {
//       cityName?: string;
//       countryCode?: string;
//     };
//   }
//   export interface Itinerary {
//     duration: string;
//     segments: Segment[];
//   }

//   export interface Segment {
//     departure: {
//       iataCode: string;
//       at: string; // ISO datetime
//     };
//     arrival: {
//       iataCode: string;
//       at: string; // ISO datetime
//     };
//     carrierCode: string;
//     number: string;
//     aircraft?: {
//       code: string;
//     };
//     duration: string;
//     id: string;
//     numberOfStops: number;
//   }
//   export interface Price {
//     currency: string;
//     total: string;
//     base: string;
//     fees?: Array<{
//       amount: string;
//       type: string;
//     }>;
//   }
// }

declare module 'amadeus' {
  export default class Amadeus {
    constructor(options: { clientId: string; clientSecret: string });

    // --- Flights ---
    shopping: {
      // --- Flight Offers Search ---
      flightOffersSearch: {
        get(params: FlightOfferSearchParams): Promise<ApiResponse<FlightOffer[]>>;
      };

      // --- Flight Destinations (cheapest destinations from origin) ---
      flightDestinations: {
        get(params: FlightDestinationsParams): Promise<ApiResponse<FlightDestination[]>>;
      };

      // --- Flight Offers Price (pricing of a specific offer) ---
      flightOffersPricing: {
        post(body: { data: FlightOffer[] }): Promise<ApiResponse<FlightPricingResult>>;
      };

      // --- Hotel Offers ---
      hotelOffers: {
        get(params: HotelOfferSearchParams): Promise<ApiResponse<HotelOffer[]>>;
      };

      // --- Hotel Offers by Hotel ID ---
      hotelOffersByHotel: {
        get(params: { hotelId: string }): Promise<ApiResponse<HotelOffer[]>>;
      };
    };

    // --- Hotels ---
    shoppingHotelOffers: {
      get(params: HotelOfferSearchParams): Promise<ApiResponse<HotelOffer[]>>;
    };

    // --- Locations ---
    referenceData: {
      locations: {
        get(params: LocationSearchParams): Promise<ApiResponse<Location[]>>;
      };
    };
  }

  // ---- Shared Response Wrapper ----
  export interface ApiResponse<T> {
    data: T;
    meta?: Record<string, unknown>;
    dictionaries?: Record<string, unknown>;
  }

  // ---- Flight Offer Search ----
  export interface FlightOfferSearchParams {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    returnDate?: string;
    adults: string;
    children?: string;
    travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
    nonStop?: boolean;
    currencyCode?: string;
    max?: number;
  }

  export interface FlightOffer {
    type: string;
    id: string;
    source: string;
    itineraries: Itinerary[];
    price: Price;
    validatingAirlineCodes: string[];
  }

  // ---- Flight Destinations ----
  export interface FlightDestinationsParams {
    origin: string;
    departureDate?: string;
    returnDate?: string;
    oneWay?: boolean;
    duration?: string;
    nonStop?: boolean;
    maxPrice?: string;
    currencyCode?: string;
    viewBy?: 'DESTINATION' | 'DATE';
  }

  export interface FlightDestination {
    type: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    price: {
      total: string;
      currency: string;
    };
    links?: Record<string, string>;
  }

  // ---- Hotel Offers ----
  export interface HotelOfferSearchParams {
    cityCode: string;
    adults: number;
    checkInDate: string;
    checkOutDate: string;
    roomQuantity?: number;
    currency?: string;
  }

  export interface HotelOffer {
    type: string;
    hotel: {
      hotelId: string;
      name: string;
      cityCode: string;
    };
    available: boolean;
    offers: Array<{
      id: string;
      checkInDate: string;
      checkOutDate: string;
      price: {
        currency: string;
        total: string;
      };
    }>;
  }

  // ---- Location Search ----
  export interface LocationSearchParams {
    keyword: string;

    // API accepts: "CITY", "AIRPORT", "CITY,AIRPORT", or even array form.
    subType?: 'AIRPORT' | 'CITY' | `${'AIRPORT' | 'CITY'},${'AIRPORT' | 'CITY'}` | string[];

    page?: {
      limit?: number;
      offset?: number;
    };
  }

  export interface Location {
    type: string;
    subType: string;
    name: string;
    iataCode: string;
    address: {
      cityName?: string;
      countryCode?: string;
    };
  }

  // ---- Flight Offer Details ----
  export interface Itinerary {
    duration: string;
    segments: Segment[];
  }

  export interface Segment {
    departure: {
      iataCode: string;
      at: string; // ISO datetime
    };
    arrival: {
      iataCode: string;
      at: string; // ISO datetime
    };
    carrierCode: string;
    number: string;
    aircraft?: {
      code: string;
    };
    duration: string;
    id: string;
    numberOfStops: number;
  }

  export interface Price {
    currency: string;
    total: string;
    base: string;
    fees?: Array<{
      amount: string;
      type: string;
    }>;
  }

  export interface FlightPricingResult {
    type: string;
    flightOffers: FlightOffer[];
  }
}
