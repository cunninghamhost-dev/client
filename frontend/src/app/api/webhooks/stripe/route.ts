import prisma from '@/lib/prisma';
import { Prisma } from 'generated/prisma/client';
import { getErrorMessage } from '@/utils/errors';
import { bookFlightServicePOST } from '@/app/service/tiqwa/bookFlight.service';
import { TTiqwaFlightBookingRequest } from '@/lib/schemas/server/tiqwa/booking/flight-booking-request.schema';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

type TxClient = Prisma.TransactionClient;
type BookingWithPassengers = Prisma.BookingGetPayload<{
  include: { passengers: true };
}>;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_SECRET_KEY!);
  } catch (err) {
    return new NextResponse(`Invalid signature: ${getErrorMessage(err)}`, { status: 400 });
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
      break;
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

/* ------------------------------------------------------------------ */
/* Message Handlers                                                    */
/* ------------------------------------------------------------------ */
async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata.bookingId;

  if (!bookingId) return;

  await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: { id: bookingId },
      include: { passengers: true },
    });

    if (!booking) return;

    // 🔒 Idempotency Guard
    if (booking.status === 'TICKETED') return;

    // ⏳ Expiration Guard so there is need for a refund
    if (booking.expiresAt && new Date() > booking.expiresAt) {
      await tx.booking.update({
        where: { id: bookingId },
        data: { status: 'CANCELLED' },
      });

      return;
    }

    // Update booking → PAID
    await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: 'PAID',
        paidAt: new Date(),
      },
    });

    // Update payment
    await tx.payment.updateMany({
      where: { paymentIntentId: paymentIntent.id },
      data: { status: 'SUCCEEDED' },
    });

    // 🔥 CALL TIQWA BOOKING
    await issueTicketWithTiqwa(tx, booking);
  });
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata.bookingId;
  if (!bookingId) return;

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: 'PENDING_PAYMENT' },
  });

  await prisma.payment.updateMany({
    where: { paymentIntentId: paymentIntent.id },
    data: { status: 'FAILED' },
  });
}

async function issueTicketWithTiqwa(tx: TxClient, booking: BookingWithPassengers): Promise<void> {
  await tx.booking.update({
    where: { id: booking.id },
    data: { status: 'TICKETING' },
  });

  const payload: TTiqwaFlightBookingRequest = {
    passengers: booking.passengers.map((p) => ({
      passenger_type: p.passengerType.toLowerCase() as 'adult' | 'child' | 'infant',
      first_name: p.firstName,
      last_name: p.lastName,
      dob: p.dateOfBirth ? p.dateOfBirth.toISOString().split('T')[0] : '',
      gender: p.gender.toLowerCase() as 'male' | 'female',
      title: p.title.toLowerCase() as 'mr' | 'mrs' | 'miss' | 'ms',
      email: p.email,
      phone_number: p.phoneNumber,
      documents: {
        number: p.passportNumber,
        issuing_date: p.issuingDate ? p.issuingDate.toISOString().split('T')[0] : '',
        expiry_date: p.passportExpiry ? p.passportExpiry.toISOString().split('T')[0] : '',
        issuing_country: p.issuingCountry,
        nationality_country: p.nationality,
        document_type: 'passport',
        holder: p.holder,
      },
    })),
  };

  try {
    const tiqwaResponse = await bookFlightServicePOST(payload, booking.providerFlightId);
    console.log('Tiqwa Issuance System Response', tiqwaResponse);
    await tx.booking.update({
      where: { id: booking.id },
      data: {
        status: 'TICKETED',
        providerBookingId: tiqwaResponse.id,
      },
    });
  } catch (err) {
    await tx.booking.update({
      where: { id: booking.id },
      data: { status: 'FAILED_TICKETING' },
    });

    throw err;
  }
}
