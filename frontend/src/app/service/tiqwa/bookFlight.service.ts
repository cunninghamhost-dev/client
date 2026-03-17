// src/app/api/service/tiqwa/bookFlight.service.ts
import { TTiqwaFlightBookingRequest } from '@/lib/schemas/server/tiqwa/booking/flight-booking-request.schema';
import {
  TiqwaFlightBookingResponseSchema,
  TTiqwaFlightBookingResponse,
} from '@/lib/schemas/server/tiqwa/response/flight-booking-response.schema';
import { TiqwaFetcherUtil } from '@/lib/utils/server/tiqwa-fetcher.util';

export async function bookFlightServicePOST(
  req: TTiqwaFlightBookingRequest,
  flight_id: string,
): Promise<TTiqwaFlightBookingResponse> {
  const response = await TiqwaFetcherUtil(`/flight/book/${flight_id}`, {
    method: 'POST',
    body: req,
  });

  return TiqwaFlightBookingResponseSchema.parse(response);
}
