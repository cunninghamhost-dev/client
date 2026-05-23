// lib/query/hooks.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchJSON } from '@/lib/utils/server/response.util';

type QueryFnData<T> = T;

export function useApiQueryHook<T>(
  queryKey: unknown[],
  url: string,
  options?: Omit<UseQueryOptions<QueryFnData<T>>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetchJSON<{ data: T }>(url);
      return res.data;
    },
    ...options,
  });
}
