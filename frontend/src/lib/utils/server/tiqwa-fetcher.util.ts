import { TiqwaApiErrorUtil } from './errors/tiqwa-api-error.util';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
type RequestBody = JsonValue | FormData;

interface ITiqwaFetchOptions<TBody, TError> {
  method?: HttpMethod; // default: GET
  query?: Record<string, string | number | boolean | null | undefined>;
  body?: TBody;
  headers?: Record<string, string>;
  parseError?: (raw: unknown) => TError;
}

export async function TiqwaFetcherUtil<TResponse, TBody extends RequestBody | undefined = undefined, TError = unknown>(
  endpoint: string,
  options?: ITiqwaFetchOptions<TBody, TError>,
): Promise<TResponse> {
  const { method = 'GET', query, body, headers, parseError } = options || {};
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  // Build query string
  const queryString = query
    ? '?' +
      Object.entries(query)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&')
    : '';

  const url = `${process.env.TIQWA_BASE_URL_SB}${endpoint}${queryString}`;

  let tiqwa_response: Response;

  try {
    tiqwa_response = await fetch(url, {
      method,
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
      headers: {
        ...(isFormData ? {} : body ? { 'Content-Type': 'application/json' } : {}),
        Authorization: `Bearer ${process.env.TIQWA_API_KEY_SB}`,
        ...headers,
      },
      cache: 'no-store', // change if you want caching
    });
  } catch (err) {
    throw new TiqwaApiErrorUtil(0, 'Network error while contacting Tiqwa', err);
  }

  const rawText = await tiqwa_response.text();
  const rawData = rawText ? safeJsonParse(rawText) : null;

  if (!tiqwa_response.ok) {
    //console.log('Utility Fetcher middleware: ', rawData);
    console.error('Tiqwa API Error:', {
      status: tiqwa_response.status,
      rawData,
      endpoint,
      method,
    });
    const parsedError = parseError ? parseError(rawData) : (rawData as TError);
    throw new TiqwaApiErrorUtil<TError>(
      tiqwa_response.status,
      rawData?.description || rawData?.message || 'Tiqwa API request failed',
      {
        error: parsedError,
        raw: rawText,
        endpoint,
        method,
      } as TError,
    );
  }

  return rawData as TResponse;
}

function safeJsonParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return value; // preserve raw text
  }
}
