export type TrendingOptions = {
  maxPrice?: number | string;
  departureDate?: string; // YYYY-MM-DD
  oneWay?: boolean;
  duration?: string; // e.g. "3,7"
  nonStop?: boolean;
  currency?: string; // e.g. 'USD' or 'EUR'
};

type FlightDestinationResponse = {
  data: Array<{
    type: string;
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    price: { total: string; currency: string };
  }>;
  meta?: Record<string, unknown>;
  dictionaries?: Record<string, unknown>;
};

const AMADEUS_BASE = process.env.AMADEUS_BASE_URL ?? 'https://test.api.amadeus.com';
const CLIENT_ID = process.env.AMADEUS_CLIENT_ID!;
const CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET!;

const tokenCache: { accessToken?: string; expiresAt?: number } = {};
const resultCache: Map<string, { expiresAt: number; data: FlightDestinationResponse }> = new Map();

async function getAccessToken() {
  const now = Date.now();
  if (tokenCache.accessToken && tokenCache.expiresAt && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.accessToken;
  }

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const res = await fetch(`${AMADEUS_BASE}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Amadeus token request failed: ${res.status} ${txt}`);
  }

  const json = await res.json();
  tokenCache.accessToken = json.access_token;
  const expiresIn = json.expires_in ?? 1800; // seconds
  tokenCache.expiresAt = Date.now() + expiresIn * 1000;
  return tokenCache.accessToken;
}

function makeCacheKey(origin: string, opts: TrendingOptions) {
  return `${origin}|${JSON.stringify(opts)}`;
}

export async function getTrendingDestinations(origin = 'LON', opts: TrendingOptions = {}) {
  const ttl = Number(process.env.CACHE_TTL_SECONDS ?? 3600) * 1000;
  const key = makeCacheKey(origin, opts);
  const cached = resultCache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached.data;

  const token = await getAccessToken();
  const params = new URLSearchParams();
  params.set('origin', origin);
  if (opts.maxPrice) params.set('maxPrice', String(opts.maxPrice));
  if (opts.departureDate) params.set('departureDate', opts.departureDate);
  if (opts.oneWay !== undefined) params.set('oneWay', String(opts.oneWay));
  if (opts.duration) params.set('duration', opts.duration);
  if (opts.nonStop !== undefined) params.set('nonStop', String(opts.nonStop));
  if (opts.currency) params.set('currency', opts.currency);

  const url = `${AMADEUS_BASE}/v1/shopping/flight-destinations?${params.toString()}`;
  //const url = `${AMADEUS_BASE}/v1/shopping/flight-destinations?origin=PAR`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  //const res = await fetch(url, { headers: { Authorization: `Bearer ggdgkdugkjhgjhdghgjhd` } });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Amadeus flight-destinations failed: ${res.status} ${txt}`);
  }

  const data = await res.json();
  resultCache.set(key, { expiresAt: Date.now() + ttl, data });
  return data;
}
