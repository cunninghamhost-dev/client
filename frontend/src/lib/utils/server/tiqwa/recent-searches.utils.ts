import {
  TTiqwaAirportListResponse,
  TTiqwaAirportLocationValue,
} from '@/lib/schemas/tiqwa/flight/flight-utilities.schema';

const KEY = 'location-picker:recent';
const MAX = 5;

export function tiqwaGetRecentSearches(): TTiqwaAirportListResponse {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function tiqwaAddRecentSearch(airport: TTiqwaAirportLocationValue) {
  const existing = tiqwaGetRecentSearches().filter((v) => v.city_code !== airport.city_code);

  const updated = [airport, ...existing].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(updated));
}
