// src/app/api/tiqwa/flights/[flight_id]/confirm-price/route.ts

import { confirmFlightPriceService } from '@/app/service/tiqwa/confirmFlightPrice.service';
import { failure, success } from '@/lib/utils/server/response.util';
import { getErrorMessage } from '@/utils/errors';

export async function GET(request: Request, context: { params: Promise<{ flight_id: string }> }) {
  try {
    const params = await context.params;

    const confirmed_result = await confirmFlightPriceService(params);

    return success(confirmed_result, 'Successful retrieval');
  } catch (err) {
    const message = getErrorMessage(err);
    console.error('GET /api/tiqwa/flights/{flight_id}/confirm-price error:', message);
    return failure(message, 500);
  }
}
