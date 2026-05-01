import { z } from 'zod';

export const visaMainFormSchema = z.object({
  visa_type: z.string().nonempty('Visa type is required'),
  citizen: z.string().nonempty('Citizen of is required'),
  destination: z.string().nonempty('traveing to is required'),
});
export type TVisaMainFormSchema = z.infer<typeof visaMainFormSchema>;
