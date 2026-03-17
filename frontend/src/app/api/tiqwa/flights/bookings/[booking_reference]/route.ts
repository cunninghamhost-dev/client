import { bookingDetailsServiceGET } from '@/app/service/tiqwa/bookingDetails.service';
import { failure, success } from '@/lib/utils/server/response.util';
import { getErrorMessage } from '@/utils/errors';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, context: { params: Promise<{ booking_reference: string }> }) {
  try {
    const params = await context.params;

    const result = await bookingDetailsServiceGET(params.booking_reference);

    return success({ result }, 'Successfully retrieved booking details', 200);
  } catch (err) {
    const message = getErrorMessage(err);
    console.error('GET /api/tiqwa/flights/bookings/{booking_reference} error:', message);
    return failure(message, 500);
  }
}
