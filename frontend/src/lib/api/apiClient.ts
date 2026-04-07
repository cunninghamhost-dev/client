// frontend/src/lib/api/apiClient.ts
import { ApiError } from '@/lib/utils/errors/api-error.util';

export interface ApiOptions<TBody = unknown> {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  query?: Record<string, string | number | boolean | undefined>;
  body?: TBody;
  headers?: Record<string, string>;
}

// 1. The Base Function (Keep your existing logic)
export async function apiClient<TResponse, TBody = unknown>(
  endpoint: string,
  options?: ApiOptions<TBody>
): Promise<TResponse> {
  const { method = 'GET', query, body, headers } = options || {};

  // Clean up query params (remove undefined)
  const cleanQuery = query ? Object.fromEntries(
    Object.entries(query).filter(([_, v]) => v !== undefined)
  ) : {};

  const queryString = Object.keys(cleanQuery).length > 0
    ? '?' + new URLSearchParams(cleanQuery as any).toString()
    : '';

  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}${queryString}`;

  const res = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const rawData = await res.text();
    let parsed: any;
    try { parsed = JSON.parse(rawData); } catch { parsed = rawData; }
    
    const message = parsed?.message || parsed?.error || 'API Request failed';
    throw new ApiError(res.status, message, parsed);
  }

  return res.json();
}

// 2. Add shorthand methods so "apiClient.get" works
apiClient.get = <TResponse>(endpoint: string, options?: Omit<ApiOptions, 'method' | 'body'>) => 
  apiClient<TResponse>(endpoint, { ...options, method: 'GET' });

apiClient.post = <TResponse, TBody = unknown>(endpoint: string, body?: TBody, options?: Omit<ApiOptions<TBody>, 'method' | 'body'>) => 
  apiClient<TResponse, TBody>(endpoint, { ...options, method: 'POST', body });

apiClient.patch = <TResponse, TBody = unknown>(endpoint: string, body?: TBody, options?: Omit<ApiOptions<TBody>, 'method' | 'body'>) => 
  apiClient<TResponse, TBody>(endpoint, { ...options, method: 'PATCH', body });

apiClient.delete = <TResponse>(endpoint: string, options?: Omit<ApiOptions, 'method' | 'body'>) => 
  apiClient<TResponse>(endpoint, { ...options, method: 'DELETE' });
