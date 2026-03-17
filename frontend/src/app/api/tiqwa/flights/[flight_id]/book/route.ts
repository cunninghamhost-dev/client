// src/app/api/tiqwa/flights/[flight_id]/book/route.ts

import { bookFlightServicePOST } from '@/app/service/tiqwa/bookFlight.service';
import { TiqwaFlightBookingRequestSchema } from '@/lib/schemas/server/tiqwa/booking/flight-booking-request.schema';
import { failure, success } from '@/lib/utils/server/response.util';
import { getErrorMessage } from '@/utils/errors';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, context: { params: Promise<{ flight_id: string }> }) {
  try {
    const params = await context.params;
    const body = await req.json();
    const parsedBody = TiqwaFlightBookingRequestSchema.parse(body);

    const result = await bookFlightServicePOST(parsedBody, params.flight_id);

    return success({ result }, 'Successfully booked a flight', 200);
  } catch (err) {
    const message = getErrorMessage(err);
    console.error('GET /api/tiqwa/flights/{flight_id}/book error:', message);
    return failure(message, 500);
  }
}
