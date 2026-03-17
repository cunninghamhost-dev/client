import { airlinesUtilityServiceGET } from '@/app/service/tiqwa/utilities/airlinesUtility.service';
import { failure } from '@/lib/utils/server/response.util';
import { getErrorMessage } from '@/utils/errors';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const airlines = await airlinesUtilityServiceGET();

    return NextResponse.json(airlines);
  } catch (err) {
    const message = getErrorMessage(err);
    console.error('GET /api/tiqwa/utilities/airports error:', message);
    return failure(message, 500);
  }
}
