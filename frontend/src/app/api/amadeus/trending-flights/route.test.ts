// import amadeus from '@/lib/amadeus';
// import { FlightItem } from '@/types/server/amadeus.types';
import { getErrorMessage } from '@/utils/errors';
import Amadeus from 'amadeus';

import { NextResponse, NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  console.log(process.env.AMADEUS_CLIENT_ID!);
  try {
    const { searchParams } = new URL(request.url);

    // Extract params from query string (customizable via URL)
    const origin = searchParams.get('origin') || 'NYC'; // Default origin IATA code (e.g., 'NYC' for New York)
    const departureDate =
      searchParams.get('departureDate') || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // ~30 days from now

    // Initialize Amadeus SDK with env vars
    const amadeus = new Amadeus({
      clientId: process.env.AMADEUS_CLIENT_ID!,
      clientSecret: process.env.AMADEUS_CLIENT_SECRET!,
    });

    // Fetch cheapest destinations (trending low-price flights)
    const response = await amadeus.shopping.flightDestinations.get({
      origin, // Required: Origin IATA code
      departureDate, // Optional but recommended for relevant prices
      oneWay: true, // One-way for low-price inspiration (set to false for round-trip)
      nonStop: false, // Allow stops for cheaper options (set to true if preferred)
      currencyCode: 'USD', // Customize currency
      viewBy: 'DESTINATION', // Group by destination for trending list
      // maxPrice: '500', // Optional: Filter by max price (uncomment if needed)
      // duration: '1-7', // Optional: Trip duration in days (e.g., weekends)
    });

    // Return only the data array (FlightDestination[])
    return NextResponse.json(response.data);
    // const url = new URL(request.url);
    // const origin = (url.searchParams.get('origin') ?? 'NYC').toUpperCase();
    // const maxPrice = url.searchParams.get('maxPrice'); //Optional
    // const limit = Number(url.searchParams.get('limit') ?? 6);
    // const departureDate =
    //   url.searchParams.get('departureDate') ||
    //   new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // ~30 days from now
    // const oneWay = true;

    // // Build API params
    // const params: { origin: string; oneWay: boolean; maxPrice?: string; departureDate?: string } = { origin, oneWay };
    // if (maxPrice) params.maxPrice = String(maxPrice);
    // if (departureDate) params.departureDate = String(departureDate);

    // Call Amadeus Flight Inspiration (flight-destinations)
    //const resp = await amadeus.shopping.flightDestinations.get(params);
    //const items = Array.isArray(resp.data) ? resp.data.slice(0, limit) : [];

    // OPTIONAL: Enrich each destination with readable city name (calls reference-data/locations once per destination).
    // This gives nicer UI (IATA -> city), but costs extra API calls (watch rate limits).
    // const enriched = await Promise.all(
    //   items.map(async (it: FlightItem) => {
    //     const destinationIata = it.destination;
    //     let cityName = destinationIata;
    //     try {
    //       const locResp = await amadeus.referenceData.locations.get({
    //         keyword: destinationIata,
    //         subType: ['CITY', 'AIRPORT'],
    //         page: { limit: 1 },
    //       });
    //       if (locResp?.data?.length) {
    //         const first = locResp.data[0];
    //         // try to pick a friendly name
    //         cityName = first.address?.cityName || first.name || first.iataCode || destinationIata;
    //       }
    //     } catch (error) {
    //       // ignore enrichment errors (still return the IATA)
    //       console.log(error);
    //     }

    //     return {
    //       destination: destinationIata,
    //       cityName,
    //       departureDate: it.departureDate ?? null,
    //       returnDate: it.returnDate ?? null,
    //       price: it.price ?? null, // e.g. { total: "60.0", currency: "USD" } (see sample response).
    //       links: it.links ?? null, // includes flightDates link you can open for details
    //     };
    //   })
    // );

    // // Cache on CDN / browser for a short time to avoid over-requesting Amadeus.
    // return NextResponse.json(
    //   { data: enriched },
    //   {
    //     status: 200,
    //     headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300' }, // 1 hour CDN cache
    //   }
    // );
  } catch (error) {
    console.error('Amadeus error:', error);
    return NextResponse.json({ ok: false, error: getErrorMessage(error) ?? String(error) }, { status: 500 });
  }
}
