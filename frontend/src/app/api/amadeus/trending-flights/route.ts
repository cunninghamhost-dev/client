import { NextRequest, NextResponse } from 'next/server';
import { getTrendingDestinations } from '@/lib/amadeus';
import { getErrorMessage } from '@/utils/errors';

export async function GET(req: NextRequest) {
  //const url = new URL(req.url);
  //console.log(url);
  //const origin = url.searchParams.get('origin') || process.env.DEFAULT_ORIGIN || 'JFK';
  try {
    const url = new URL(req.url);
    const origin = url.searchParams.get('origin') ?? process.env.ORIGIN_DEFAULT ?? 'LON';
    const maxPrice = url.searchParams.get('maxPrice') ?? undefined;
    const data = await getTrendingDestinations(origin, maxPrice ? { maxPrice } : {});
    return NextResponse.json(data);
  } catch (error) {
    console.error('Amadeus error:', error);
    return NextResponse.json({ ok: false, error: getErrorMessage(error) ?? String(error) }, { status: 500 });
  }
}
