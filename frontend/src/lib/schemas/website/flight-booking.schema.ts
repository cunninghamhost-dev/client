// src/lib/schemas/website/flight-booking.schema.ts

import { z } from 'zod';

const today = new Date();

const calculateAge = (dob: Date) => Math.floor((Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

const dateInputSchema = z.preprocess(
  (val: Date | undefined) => {
    if (!val) return undefined;
    if (val instanceof Date) return val;
    if (typeof val === 'string') {
      const d = new Date(val);
      return isNaN(d.getTime()) ? undefined : d;
    }
    return undefined;
  },
  z.date({ message: 'Date is required' }),
);

export const ContactDetailsSchema = z.object({
  phone_number: z.string().min(5, 'Invalid Phone Number'),
  email: z.email(),
});

export const PassengerInfoFormSchema = z
  .object({
    passengerType: z.enum(['adult', 'child']),
    title: z.enum(['Mr', 'Mrs', 'Ms', 'Miss', 'Mstr'], { message: 'Title is required' }),
    email: z.string().email().trim(),
    phone_number: z.string().min(8, 'Invalid Phone Number'),
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }).trim(),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }).trim(),
    gender: z.enum(['Male', 'Female'], { message: 'Gender is required' }),
    dateOfBirth: dateInputSchema.refine((date) => date <= today, { message: 'Invalid date of birth' }).optional(),
    passportNumber: z.string().min(6, { message: 'Passport number must be at least 6 characters' }).trim(),
    issuingDate: dateInputSchema
      .refine((date) => date <= today, { message: 'Issuing date cannot be in the future' })
      .optional(),
    passportExpiry: dateInputSchema
      .refine((date) => date > today, { message: 'Passport must not be expired' })
      .optional(),
    nationalityCountry: z
      .string()
      .length(2, 'Use ISO country code (e.g. NG, US)')
      .transform((v) => v.toUpperCase()),
    issuingCountry: z
      .string()
      .length(2, 'Use ISO country code (e.g. NG, US)')
      .transform((v) => v.toUpperCase()),
    holder: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const age = calculateAge(data.dateOfBirth!);

    if (data.passengerType === 'adult' && age < 12) {
      ctx.addIssue({
        path: ['dateOfBirth'],
        message: 'Adult passengers must be at least 12 years old',
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.passengerType === 'child' && age >= 12) {
      ctx.addIssue({
        path: ['dateOfBirth'],
        message: 'Child passengers must be under 12 years old',
        code: z.ZodIssueCode.custom,
      });
    }
    // Passport expiry must be in the future (only if provided)
    if (data.passportExpiry && data.passportExpiry <= today) {
      ctx.addIssue({
        path: ['passportExpiry'],
        message: 'Passport must not be expired',
        code: z.ZodIssueCode.custom,
      });
    }
    // Issuing date must not be in the future (only if provided)
    if (data.issuingDate && data.issuingDate > today) {
      ctx.addIssue({
        path: ['issuingDate'],
        message: 'Issuing date cannot be in the future',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const BookingFormSchema = z.object({
  passengers: z.array(PassengerInfoFormSchema),
  contact: ContactDetailsSchema,
});

export const BookingProviderRequestSchema = z.object({
  flightId: z.string(),
  totalAmount: z.coerce.number().positive(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  travelDate: z.coerce.date().optional(),
  travellerCount: z.number().optional(),
  userRegistrying: BookingFormSchema,
});

export type TContactDetailsForm = z.infer<typeof ContactDetailsSchema>;
export type TPassengerInfoForm = z.infer<typeof PassengerInfoFormSchema>;
export type TBookingRegistrationForm = z.infer<typeof BookingFormSchema>;
export type TBookingProviderRequestForm = z.infer<typeof BookingProviderRequestSchema>;
