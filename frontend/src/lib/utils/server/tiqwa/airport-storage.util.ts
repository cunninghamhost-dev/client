import { TTiqwaAirportLocationValue } from '@/lib/schemas/server/tiqwa/utilities/airport-utility.schema';

const KEY = 'location-picker:last-selection';

export function tiqwaSaveLocation(value: TTiqwaAirportLocationValue) {
  localStorage.setItem(KEY, JSON.stringify(value));
}

export function tiqwaLoadLocation(): TTiqwaAirportLocationValue | null {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}
