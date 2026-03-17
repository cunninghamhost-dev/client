// src/app/api/booking/create/route.ts

import prisma from '@/lib/prisma';
//import Stripe from 'stripe';
import { addMinutes } from 'date-fns';
import { NextRequest } from 'next/server';
import { BookingProviderRequestSchema } from '@/lib/schemas/website/flight-booking.schema';
import { validateRequest } from '@/lib/helper/validation-request.helper';
import { failure, success } from '@/lib/utils/server/response.util';
import { createBookingWithUniqueReference } from '@/lib/utils/server/generateUniqueBookingReference.util';
import { generateOTP, hashGeneratedOTP } from '@/lib/helper/crypto-generator.helper';
import { Resend } from 'resend';
import OtpFlightBookingEmail from '@/email/OTPFlightBookingEmail';
import { getErrorMessage } from '@/utils/errors';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2026-01-28.clover',
// });

const resend = new Resend(process.env.RESEND_API_KEY!);
const from_email = process.env.RESEND_FROM_EMAIL;

export async function POST(req: NextRequest) {
  console.log('Flight Booking Service instantiated.');
  try {
    const validation = await validateRequest(BookingProviderRequestSchema, req);
    if (!validation.success) return failure(validation.response, 401);
    const data = validation.data;

    // 1️⃣ Validate with Zod here
    // 2️⃣ Confirm price with Tiqwa here
    const confirmedAmount = data.totalAmount; // example in cents
    const otp = generateOTP();
    const otpHash = hashGeneratedOTP(otp);
    const expires = new Date(Date.now() + 7 * 60 * 1000); // 5 minutes
    const emailAddress = data.userRegistrying.contact.email;
    const flightId = data.flightId;
    const origin = data.origin ?? undefined;
    const destination = data.destination ?? undefined;
    const travelDate = data.travelDate ?? undefined;
    const travellerCount = data.travellerCount ?? undefined;

    if (!origin || !destination || !travelDate || !travellerCount) {
      return failure(
        'Request body is missing some information. Please contact cunningham support for more information.',
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const booking = await createBookingWithUniqueReference(tx, {
        provider: 'TIQWA',
        referenceCode: '',
        status: 'PENDING_PAYMENT',
        providerFlightId: flightId,
        totalAmount: confirmedAmount,
        contactEmail: emailAddress,
        contactPhone: data.userRegistrying.contact.phone_number,
        expiresAt: expires,
        departureCity: origin,
        arrivalCity: destination,
        departureDate: travelDate,
        travellerCount,
        passengers: {
          create: data.userRegistrying.passengers.map((p) => ({
            passengerType: p.passengerType.toUpperCase() as 'ADULT' | 'CHILD',
            title: p.title.toUpperCase() as 'MR' | 'MRS' | 'MS' | 'MISS' | 'MSTR',
            firstName: p.firstName,
            lastName: p.lastName,
            gender: p.gender.toUpperCase() as 'MALE' | 'FEMALE',
            email: p.email,
            phoneNumber: p.phone_number,
            dateOfBirth: p.dateOfBirth,
            passportNumber: p.passportNumber,
            issuingDate: p.issuingDate,
            passportExpiry: p.passportExpiry,
            nationality: p.nationalityCountry,
            issuingCountry: p.issuingCountry,
            holder: p.holder,
          })),
        },
      });

      if (booking) {
        // 3️⃣  Store OTP separately (see next section)
        await prisma.bookingOTP.create({
          data: {
            bookingId: booking.id,
            otpHash,
            expiresAt: addMinutes(new Date(), 5),
          },
        });

        await sendOTPEmail({
          email: emailAddress,
          bookingId: booking.id,
          flightId,
          hashedOTP: otpHash,
          expiresDate: expires,
          departureCity: origin, ///This is a constant please get from te request header
          arrivalCity: destination, ///This is a constant please get from te request header
          travelDate: travelDate, ///This is a constant please get from te request header
          travellersCount: travellerCount,
        });

        return {
          bookingId: booking.id,
        };
      } else {
        return failure('Failed to generate a reference code', 403);
      }
    });

    return success(result);
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('Flight Booking Initiated: error', message);
    return failure(message, 404);
  }
}

const sendOTPEmail = async ({
  email,
  bookingId,
  flightId,
  hashedOTP,
  expiresDate,
  departureCity,
  arrivalCity,
  travelDate,
  travellersCount,
}: {
  email: string;
  bookingId: string;
  flightId: string;
  hashedOTP: string;
  expiresDate: Date;
  departureCity: string;
  arrivalCity: string;
  travelDate: Date;
  travellersCount: number;
}) => {
  const subject = `Your flight booking ID - ${bookingId}`;
  const expiry_minutes = Math.round((expiresDate.getTime() - new Date().getTime()) / (1000 * 60));
  await resend.emails.send({
    from: from_email ?? 'onboarding@resend.dev',
    to: from_email ? [email] : ['cunninghamglobaltravels@gmail.com'],
    subject: subject,
    react: OtpFlightBookingEmail({
      email,
      otpCode: hashedOTP,
      expiryMinutes: expiry_minutes,
      supportEmail: 'cunninghamfamilyoverseas@gmail.com',
      bookingId,
      flightCode: flightId,
      departureCity,
      arrivalCity,
      travelDate: travelDate.toISOString(),
      travellersCount,
    }),
  });
};
