import { airportsUtilityServiceGET } from '@/app/service/tiqwa/utilities/airportsUtility.service';
import { validateRequest } from '@/lib/helper/validation-request.helper';
import { TiqwaAirportQuerySchema } from '@/lib/schemas/server/tiqwa/utilities/airports/airport-query.schema';
import { failure, success } from '@/lib/utils/server/response.util';
import { getErrorMessage } from '@/utils/errors';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const validation = await validateRequest(TiqwaAirportQuerySchema, req);
    if (!validation.success) return failure(validation.response, 401);

    const { keyword } = validation.data;

    const airports = await airportsUtilityServiceGET(keyword);

    return success(airports, 'Successfully retirved airport profile from Tiqwa');
  } catch (err) {
    const message = getErrorMessage(err);
    console.error('GET /api/tiqwa/utilities/airports error:', message);
    return failure(message, 500);
  }
}
