// confirm-price.types.ts
export interface ConfirmPriceResponseData {
  amount: number;

  outbound: TConfirmPriceSegment[];

  pricing: {
    base_fare: number;
    tax?: number;
    markup?: number;
    payable: number;
  };

  outbound_stops: number;
  total_duration: number;
}

export interface TConfirmPriceSegment {
  departure_time: string;
  arrival_time: string;

  airline_details: {
    name: string;
    logo: string;
  };

  flight_number: string;
  cabin_type: string;
  duration: number;

  airport_from: string;
  airport_to: string;

  airport_from_details: {
    city: string;
    iata_code: string;
  };

  airport_to_details: {
    city: string;
    iata_code: string;
  };

  baggage: string;
}
