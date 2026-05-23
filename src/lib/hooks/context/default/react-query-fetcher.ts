import { fetchWithIndicatorHook } from '../fetch-with-indicator.hook';

export async function jsonFetcher<T = unknown>(url: string, init?: RequestInit & { signal?: AbortSignal }): Promise<T> {
  const res = await fetchWithIndicatorHook(url, init);
  const data = await res.json();
  return data as T;
}
