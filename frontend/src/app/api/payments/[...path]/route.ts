import { NextRequest, NextResponse } from 'next/server';

const PAYMENTS_BACKEND_API_URL =
  process.env.BACKEND_API_URL ??
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL;

const getCorsHeaders = (request: NextRequest) => {
  const origin = request.headers.get('origin');

  return {
    'Access-Control-Allow-Origin': origin ?? '*',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    Vary: 'Origin',
  };
};

const buildTargetUrl = (request: NextRequest, path: string[]) => {
  if (!PAYMENTS_BACKEND_API_URL) {
    throw new Error(
      'Payments proxy is not configured. Set BACKEND_API_URL, API_URL, or NEXT_PUBLIC_API_URL to your backend /api base URL.'
    );
  }

  const backendBase = PAYMENTS_BACKEND_API_URL.endsWith('/')
    ? PAYMENTS_BACKEND_API_URL.slice(0, -1)
    : PAYMENTS_BACKEND_API_URL;

  const upstreamUrl = new URL(`${backendBase}/payments/${path.join('/')}`);
  upstreamUrl.search = request.nextUrl.search;

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

    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers: {
        Accept: 'application/json',
        ...(contentType ? { 'Content-Type': contentType } : {}),
      },
      body: request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.text(),
      cache: 'no-store',
    });

    const responseText = await upstreamResponse.text();
    const responseContentType = upstreamResponse.headers.get('content-type') ?? 'application/json';

    return new NextResponse(responseText, {
      status: upstreamResponse.status,
      headers: {
        'Content-Type': responseContentType,
        ...corsHeaders,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to reach payment service';

    return NextResponse.json(
      { success: false, message },
      {
        status: 502,
        headers: corsHeaders,
      }
    );
  }
};

export const POST = proxyRequest;
export const OPTIONS = async (request: NextRequest) =>
  new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
