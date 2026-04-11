import { Flight } from '@/lib/hooks/tiqwa/flight-search.hook';
import { FlightDetailsProps } from '@/lib/types/flight-search/response-flight-search.type';

export const mapFlightToDetails = (flight: Flight): FlightDetailsProps => {
  return {
    id: flight.id,

    amount: flight.amount,
    currency: flight.currency,

    fare_basis: '',
    office_id: '',

    outbound: [], // ⚠️ MUST FIX THIS LATER
    inbound: [],

    outbound_stops: 0,
    inbound_stops: 0,

    total_duration: 0,
    total_outbound_duration: 0,
    total_inbound_duration: 0,

    pricing: {
      base_fare: flight.amount,
      markup: null,
      payable: flight.amount,
      tax: 0,
    },

    travelers_price: flight.travelers_price.map((p) => ({
      adult: p.adult ?? 0,
    })),

    price_summary: [
      {
        passenger_type: 'adult',
        quantity: 1,
        total_price: flight.amount,
      },
    ],
  };
};
