import useSWR, { SWRConfiguration } from 'swr';

const fetcher = <T>(url: string): Promise<T> => fetch(url).then((res) => res.json());

export function useAPICatcher<T>(url: string | null, options?: SWRConfiguration) {
  const { data, error, isLoading } = useSWR<T>(
    url ?? null, // pass null if url is missing
    url ? fetcher<T> : null, // only provide fetcher if url exists
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 5,
      ...options,
    }
  );

  return {
    data,
    isLoading,
    isError: !!error,
  };
}
