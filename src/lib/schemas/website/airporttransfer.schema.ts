import z from 'zod';

export const airportTransferMenuFormSchema = z.object({
  recommendation: z.array(z.string()),
  transportation_type: z.array(z.string()),
});

export type TAirportTransferMenuFormSchema = z.infer<typeof airportTransferMenuFormSchema>;
