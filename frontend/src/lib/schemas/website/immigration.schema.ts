import { z } from 'zod';

export const immigrationMainFormSchema = z.object({
  immigration_type: z.string().nonempty('Immigration type is required'),
  citizen: z.string().nonempty('Citizen of is required'),
  destination: z.string().nonempty('Destination to is required'),
});
export type TImmigrationMainForm = z.infer<typeof immigrationMainFormSchema>;
