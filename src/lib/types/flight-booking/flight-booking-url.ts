export type FlightBookingQuery = {
  booking_key: string;
};

export function buildFlightBookingUrl(flightId: string, key: string) {
  const query: FlightBookingQuery = {
    booking_key: key,
  };

  const search = new URLSearchParams(query).toString();

  return `/flight-booking/${flightId}/customer-info?${search}`;
}
