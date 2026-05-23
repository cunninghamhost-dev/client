import { useQuery } from '@tanstack/react-query';

// Define the response type (based on Amadeus Flight Destinations API)
export interface TrendingFlight {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  currency?: string;
  price: { total: string; currency: string };
  links: { flightOffers: string };
}

const fetchTrendingFlights = async (origin: string): Promise<TrendingFlight[]> => {
  const response = await fetch(`/api/trending-flights?origin=${encodeURIComponent(origin)}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText} ${response.statusText}`);
  }
  const data: TrendingFlight[] = await response.json();
  return data;
};

export const useTrendingFlights = (origin: string) => {
  return useQuery<TrendingFlight[], Error>({
    queryKey: ['trending-flights', origin],
    queryFn: () => fetchTrendingFlights(origin),
    enabled: !!origin && origin.length === 3, // Only fetch if origin is a valid 3-letter code (e.g., 'MAD')
    staleTime: 5 * 60 * 1000, // Cache for 1 hour
    retry: 2, // Retry failed requests up to 2 times
  });
};
