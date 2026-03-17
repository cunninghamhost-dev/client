import {
  TiqwaBookingDetailsResponseSchema,
  TTiqwaBookingDetailsResponse,
} from '@/lib/schemas/server/tiqwa/response/booking-details-response.schema';
import { TiqwaFetcherUtil } from '@/lib/utils/server/tiqwa-fetcher.util';

export async function bookingDetailsServiceGET(booking_reference: string): Promise<TTiqwaBookingDetailsResponse> {
  const response = await TiqwaFetcherUtil(`/flight/${booking_reference}`, {
    method: 'GET',
  });

  return TiqwaBookingDetailsResponseSchema.parse(response);
}
