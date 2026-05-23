import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Please enter a valid email address').nonempty('Email is required'),
});
export const signupSchema = z.object({
  firstName: z.string().min(2, 'Required at least 2 characters'),
  lastName: z.string().min(2, 'Required at least 2 characters long'),
  email: z.email('Invalid email address'),
});
export const signupOTPSchema = z.object({
  email: z.email('Please enter a valid email address').nonempty('Email is required'),
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must be numeric'),
});

export type LoginPayload = z.infer<typeof loginSchema>;
export type RegisterPayload = z.infer<typeof signupSchema>;
export type VerifyOtpPayload = z.infer<typeof signupOTPSchema>;
export type ResendOtpPayload = Omit<VerifyOtpPayload, 'otp'>;
