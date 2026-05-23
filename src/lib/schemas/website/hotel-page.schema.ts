import { z } from 'zod';

export const hotelMenuFormSchema = z.object({
  popularFilters: z.array(z.string()),
  totalPriceFilters: z.tuple([z.number(), z.number()]).refine(([min, max]) => min <= max, {
    message: 'Minimum price cannot exceed maximum price',
  }),
  stayOptionFilters: z.enum(['Any', 'Hotels', 'Homes']),
  neigbourhoodFilters: z.array(z.string()),
  paymentTypeFilters: z.array(z.string()),
  propertyOptionsFilters: z.array(z.string()),
  propertyTypeFilters: z.array(z.string()),
  propertyBrandFilters: z.array(z.string()),
  starRatingFilters: z.number(),
  guestRatingFilters: z.enum(['Any', 'Wonderful 9+', 'Very good 8+', 'Good 7+']),
  amenitiesFilters: z.array(z.string()),
});

export const roomSelectionFormSchema = z
  .object({
    lodgingStartDate: z.date(),
    lodgingEndDate: z.date(),
    guestNumbers: z.object({
      room: z.number(),
      travellers: z.number(),
    }),
  })
  .refine((range) => range.lodgingStartDate < range.lodgingEndDate, {
    message: 'Start date must be before end date',
    path: ['lodgingEndDate'], // attach error to the "to" field
  });

export type HotelMenuFormSchema = z.infer<typeof hotelMenuFormSchema>;
export type RoomSelectionFormSchema = z.infer<typeof roomSelectionFormSchema>;
