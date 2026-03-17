// src/app/api/tiqwa/flights/search/route.ts

import { flightSearchServiceGET } from '@/app/service/tiqwa/flightSearch.service';
import { TiqwaFlightSearchQuerySchema } from '@/lib/schemas/server/tiqwa/flight/flight-search.schema';
import { failure, success } from '@/lib/utils/server/response.util';
import { getErrorMessage } from '@/utils/errors';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const parsed = TiqwaFlightSearchQuerySchema.parse({
      origin: searchParams.get('origin'),
      destination: searchParams.get('destination'),
      departure_date: searchParams.get('departure_date'),
      return_date: searchParams.get('return_date') ?? undefined,
      adults: Number(searchParams.get('adults')),
      children: Number(searchParams.get('children')),
      infants: Number(searchParams.get('infants')),
      cabin: searchParams.get('cabin'),
    });

    const result = await flightSearchServiceGET(parsed);

    return success({ result }, 'Successful retrieval');
  } catch (err) {
    const message = getErrorMessage(err);
    console.error('GET /api/tiqwa/flights/search error:', message);
    return failure(message, 500);
  }
}
