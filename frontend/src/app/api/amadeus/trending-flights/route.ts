// src/app/api/amadeus/trending-flights.ts
import { withErrorHandling } from '@/lib/utils/clients/error-handling.exception';
import Amadeus from 'amadeus-ts';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const amadeus_connector = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

async function getTrendingFlights(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');

  console.log('Trending flights request:', origin);

  if (!origin || typeof origin !== 'string') {
    throw new Error('Missing origin parameter');
  }
  // Optional: Validate IATA format
  const sanitizedOrigin = origin.trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(sanitizedOrigin)) {
    throw new Error('Origin must be a valid 3-letter IATA code');
  }
  const response = await amadeus_connector.referenceData.locations.get({
    keyword: sanitizedOrigin,
    subType: 'CITY',
  });
  return NextResponse.json(
    {
      success: true,
      data: response.data,
    },
    { status: 200 },
  );
}

export const GET = withErrorHandling(getTrendingFlights);
