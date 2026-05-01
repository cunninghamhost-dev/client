import { z } from 'zod';

export const CONTINENTS = [
  'AFRICA',
  'EUROPE',
  'ASIA',
  'NORTH_AMERICA',
  'SOUTH_AMERICA',
  'OCEANIA',
  'ANTARCTICA',
] as const;

export const ContinentEnum = z.enum(CONTINENTS);
export type ClientContinent = z.infer<typeof ContinentEnum>;
