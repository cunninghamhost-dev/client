import { NextResponse } from 'next/server';
import { success } from '@/lib/utils/server/response.util';

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ??
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:5000/api';

const getBackendCountryUrl = (countryId: string) => {
  const backendBase = BACKEND_API_URL.endsWith('/') ? BACKEND_API_URL.slice(0, -1) : BACKEND_API_URL;
  return new URL(`${backendBase}/countries/${countryId}`);
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ countryId: string }> }
) {
  try {
    const { countryId } = await context.params;
    const response = await fetch(getBackendCountryUrl(countryId), {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, message: 'Country not found' },
        { status: response.status }
      );
    }

    const country = await response.json();

    return success(country);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Country API Route Error:', error.message);
    } else {
      console.error('Country API Route Error:', error);
    }

    return NextResponse.json(
      { ok: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
