export function tiqwaDetectCountry(): string | null {
  if (typeof window === 'undefined') return null;

  const locale = navigator.language; // e.g. en-NG
  const code = locale.split('-')[1];

  const countryMap: Record<string, string> = {
    NG: 'Nigeria',
    US: 'United States',
    GB: 'United Kingdom',
    LT: 'Lithuania',
    FR: 'France',
    CN: 'China',
    IE: 'Ireland',
    ES: 'Spain',
    DE: 'Germany',
    AT: 'Austria',
  };

  return code ? (countryMap[code] ?? null) : null;
}
