export interface AirportDetails {
  city: string;
  city_code: string;
  country: string;
  country_code: string;
  iata_code: string;
  name: string;
}
export interface AirlineDetails {
  code: string;
  logo: string;
  name: string;
}
export interface Segment {
  airline_details: AirlineDetails;
  airport_from: string;
  airport_from_details: AirportDetails;
  airport_to: string;
  airport_to_details: AirportDetails;
  arrival_time: string;
  baggage: string;
  booking_class: string;
  cabin_type: string;
  departure_time: string;
  duration: number;
  equipment_type: string;
  fare_rules: string[];
  flight_number: string;
  layover?: number | null;
  marketing_airline: string;
  marriage_group: null;
  operating_airline: string;
  overnight: boolean;
  refundable: boolean;
}
export interface Pricing {
  base_fare: number;
  markup: null;
  payable: number;
  tax: number;
}

export interface FlightDetailsProps {
  amount: number;
  currency: string;
  fare_basis: string;
  id: string;
  inbound: Segment[];
  inbound_stops: number;
  office_id: string;
  outbound: Segment[];
  outbound_stops: number;
  price_summary: Array<{ passenger_type: string; quantity: number; total_price: number }>;
  pricing: Pricing;
  total_duration: number;
  total_inbound_duration: number;
  total_outbound_duration: number;
  travelers_price: Array<{ adult: number }>;
}
