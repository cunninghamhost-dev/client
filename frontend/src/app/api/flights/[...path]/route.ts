import { NextRequest, NextResponse } from 'next/server';

const FLIGHTS_BACKEND_API_URL =
  process.env.FLIGHTS_API_URL ??
  process.env.BACKEND_API_URL ??
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL;

const getCorsHeaders = (request: NextRequest) => {
  const origin = request.headers.get('origin');

  return {
    'Access-Control-Allow-Origin': origin ?? '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    Vary: 'Origin',
  };
};

const buildTargetUrl = (request: NextRequest, path: string[]) => {
  if (!FLIGHTS_BACKEND_API_URL) {
    throw new Error(
      'Flights proxy is not configured. Set FLIGHTS_API_URL to your backend /api base URL.'
    );
  }

  const backendBase = FLIGHTS_BACKEND_API_URL.endsWith('/')
    ? FLIGHTS_BACKEND_API_URL.slice(0, -1)
    : FLIGHTS_BACKEND_API_URL;

  const upstreamUrl = new URL(`${backendBase}/flights/${path.join('/')}`);
  upstreamUrl.search = request.nextUrl.search;

  const incomingUrl = new URL(request.url);
  const isSelfReferential =
    upstreamUrl.origin === incomingUrl.origin &&
    upstreamUrl.pathname === incomingUrl.pathname;

  if (isSelfReferential) {
    throw new Error(
      `Flights proxy target resolves back to itself (${upstreamUrl.href}). Set FLIGHTS_API_URL to your backend deployment instead of the frontend URL.`
    );
  }

  return upstreamUrl;
};

const proxyRequest = async (
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) => {
  const corsHeaders = getCorsHeaders(request);

  try {
    const { path } = await context.params;
    const upstreamUrl = buildTargetUrl(request, path);
    const contentType = request.headers.get('content-type');
    const shouldForwardBody = request.method !== 'GET' && request.method !== 'HEAD';

    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers: {
        Accept: 'application/json',
        ...(contentType ? { 'Content-Type': contentType } : {}),
      },
      body: shouldForwardBody ? await request.text() : undefined,
      cache: 'no-store',
    });

    const responseText = await upstreamResponse.text();
    const responseContentType =
      upstreamResponse.headers.get('content-type') ?? 'application/json';

    return new NextResponse(responseText, {
      status: upstreamResponse.status,
      headers: {
        'Content-Type': responseContentType,
        ...corsHeaders,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to reach flight service';

    return NextResponse.json(
      { success: false, message },
      {
        status: 502,
        headers: corsHeaders,
      }
    );
  }
};

export const GET = proxyRequest;
export const POST = proxyRequest;
export const OPTIONS = async (request: NextRequest) =>
  new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
