import { z } from 'zod';
import { ContinentEnum } from '../../enums/select-types.enum';

export const countrySearchSchema = z.object({
  search: z
    .string()
    .min(1)
    .optional()
    .transform((v) => v?.trim()),

  continent: ContinentEnum.optional(),

  limit: z.coerce.number().int().min(1).max(200).default(50),
});

export const CountryResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),      
  continent: z.string(), 
  flag: z.string().optional(),
});

export const CountryListResponseSchema = z.array(CountryResponseSchema);
