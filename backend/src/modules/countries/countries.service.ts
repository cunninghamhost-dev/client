type Continent =
  | "AFRICA"
  | "EUROPE"
  | "ASIA"
  | "NORTH_AMERICA"
  | "SOUTH_AMERICA"
  | "OCEANIA"
  | "ANTARCTICA";

export type Country = {
  id: string;
  name: string;
  code: string;
  continent: Continent;
  flag: string;
};

export type CountryQuery = {
  search?: string;
  continent?: string;
  limit?: number;
};

const CONTINENT_CODES: Record<Continent, string[]> = {
  AFRICA: [
    "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ",
    "DZ", "EG", "EH", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "KE",
    "KM", "LR", "LS", "LY", "MA", "MG", "ML", "MR", "MU", "MW", "MZ", "NA",
    "NE", "NG", "RE", "RW", "SC", "SD", "SH", "SL", "SN", "SO", "SS", "ST",
    "SZ", "TD", "TG", "TN", "TZ", "UG", "YT", "ZA", "ZM", "ZW",
  ],
  EUROPE: [
    "AD", "AL", "AT", "AX", "BA", "BE", "BG", "BY", "CH", "CY", "CZ", "DE",
    "DK", "EE", "ES", "FI", "FO", "FR", "GB", "GG", "GI", "GR", "HR", "HU",
    "IE", "IM", "IS", "IT", "JE", "LI", "LT", "LU", "LV", "MC", "MD", "ME",
    "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS", "RU", "SE", "SI", "SJ",
    "SK", "SM", "UA", "VA", "XK",
  ],
  ASIA: [
    "AE", "AF", "AM", "AZ", "BD", "BH", "BN", "BT", "CC", "CN", "CX", "GE",
    "HK", "ID", "IL", "IN", "IO", "IQ", "IR", "JO", "JP", "KG", "KH", "KP",
    "KR", "KW", "KZ", "LA", "LB", "LK", "MM", "MN", "MO", "MV", "MY", "NP",
    "OM", "PH", "PK", "PS", "QA", "SA", "SG", "SY", "TH", "TJ", "TL", "TM",
    "TR", "TW", "UZ", "VN", "YE",
  ],
  NORTH_AMERICA: [
    "AG", "AI", "AW", "BB", "BL", "BM", "BQ", "BS", "BZ", "CA", "CR", "CU",
    "CW", "DM", "DO", "GD", "GL", "GP", "GT", "HN", "HT", "JM", "KN", "KY",
    "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PM", "PR", "SV", "SX", "TC",
    "TT", "US", "VC", "VG", "VI",
  ],
  SOUTH_AMERICA: [
    "AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PE", "PY", "SR",
    "UY", "VE",
  ],
  OCEANIA: [
    "AS", "AU", "CK", "FJ", "FM", "GU", "KI", "MH", "MP", "NC", "NF", "NR",
    "NU", "NZ", "PF", "PG", "PN", "PW", "SB", "TK", "TO", "TV", "UM", "VU",
    "WF", "WS",
  ],
  ANTARCTICA: ["AQ", "BV", "GS", "HM", "TF"],
};

const CONTINENT_BY_CODE = Object.entries(CONTINENT_CODES).reduce<Record<string, Continent>>(
  (acc, [continent, codes]) => {
    for (const code of codes) acc[code] = continent as Continent;
    return acc;
  },
  {},
);

const REGION_CODES = Object.keys(CONTINENT_BY_CODE).sort();

const getFlagEmoji = (code: string) =>
  code
    .toUpperCase()
    .replace(/[A-Z]/g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

const displayNames = new Intl.DisplayNames(["en"], { type: "region" });

const COUNTRIES: Country[] = REGION_CODES.map((code) => ({
  id: code,
  code,
  name: displayNames.of(code) ?? code,
  continent: CONTINENT_BY_CODE[code] ?? "ASIA",
  flag: getFlagEmoji(code),
})).sort((a, b) => a.name.localeCompare(b.name));

export const getCountries = async (query: CountryQuery = {}) => {
  const search = query.search?.trim().toLowerCase();
  const continent = query.continent?.trim().toUpperCase();
  const limit = Math.min(Math.max(query.limit ?? 250, 1), 250);

  let countries = COUNTRIES;

  if (continent) {
    countries = countries.filter((country) => country.continent === continent);
  }

  if (search) {
    countries = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(search) ||
        country.code.toLowerCase().includes(search),
    );
  }

  return countries.slice(0, limit);
};

export const getCountryByCode = async (code: string) => {
  const normalizedCode = code.trim().toUpperCase();
  return COUNTRIES.find((country) => country.code === normalizedCode || country.id === normalizedCode) ?? null;
};
