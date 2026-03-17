// src/app/api/stripe/checkout-session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

export async function POST(req: NextRequest) {
  const { bookingId } = await req.json();

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking || booking.status !== 'PENDING_PAYMENT') {
    return NextResponse.json({ error: 'Invalid booking' }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: booking.contactEmail,
    line_items: [
      {
        price_data: {
          currency: booking.currency.toLowerCase(),
          product_data: {
            name: `Flight Booking ${booking.referenceCode}`,
          },
          unit_amount: Math.round(Number(booking.totalAmount) * 100),
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId: booking.id,
      referenceCode: booking.referenceCode,
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
  });

  return NextResponse.json({ sessionId: session.id });
}
