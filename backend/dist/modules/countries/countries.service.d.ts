type Continent = "AFRICA" | "EUROPE" | "ASIA" | "NORTH_AMERICA" | "SOUTH_AMERICA" | "OCEANIA" | "ANTARCTICA";
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
export declare const getCountries: (query?: CountryQuery) => Promise<Country[]>;
export declare const getCountryByCode: (code: string) => Promise<Country | null>;
export {};
//# sourceMappingURL=countries.service.d.ts.map