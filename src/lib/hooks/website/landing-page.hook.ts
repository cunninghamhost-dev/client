import { z } from 'zod';
import { flightFormSchema } from '@/lib/schemas/website/landing-page.schema';

export type TFlightFormSchema = z.infer<typeof flightFormSchema>;
