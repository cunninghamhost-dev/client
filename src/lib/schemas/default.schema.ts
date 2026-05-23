import { z } from 'zod';

export const sortByFormSchema = z.object({
  sortOrderBy: z.enum(['Generalized', 'Recommended', 'Business', 'Luxury']),
});
export type TSortByFormSchema = z.infer<typeof sortByFormSchema>;
