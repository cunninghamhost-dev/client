import z from 'zod';
export const attractionFilterSchema = z.object({
  location_filter: z.array(z.string()),
  category_filter: z.array(z.string()),
  showresult_filter: z.array(z.string()),
  categories_filter: z.record(z.string(), z.boolean()).optional(),
});

export type TAttractionFilterSchema = z.infer<typeof attractionFilterSchema>;
