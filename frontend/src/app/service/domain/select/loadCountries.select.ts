import { TCountryListResponse } from '@/lib/hooks/defaults/countries.hook';
import prisma from '@/lib/prisma';

let cachedCountries: TCountryListResponse | null = null;

export async function serviceLoadCountries() {
  if (cachedCountries) return cachedCountries;

  cachedCountries = await prisma.country.findMany({
    select: {
      id: true,
      name: true,
      iso2: true,
      continent: true,
    },
    orderBy: { name: 'asc' },
  });

  return cachedCountries;
}
