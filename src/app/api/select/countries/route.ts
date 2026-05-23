import { NextResponse } from 'next/server';
import { success } from '@/lib/utils/server/response.util';

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ??
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:5000/api';

const getBackendCountriesUrl = (request: Request) => {
  const backendBase = BACKEND_API_URL.endsWith('/') ? BACKEND_API_URL.slice(0, -1) : BACKEND_API_URL;
  const upstreamUrl = new URL(`${backendBase}/countries`);
  upstreamUrl.search = new URL(request.url).search;
  return upstreamUrl;
};

export async function GET(request: Request) {
  try {
    const response = await fetch(getBackendCountriesUrl(request), {
      next: { revalidate: 86400 },
    });

    if (!response.ok) throw new Error('Failed to fetch countries from backend');

    const countries = await response.json();

    return success(countries);
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
