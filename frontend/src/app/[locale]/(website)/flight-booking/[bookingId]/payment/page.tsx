'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatNGN } from '@/lib/helper/string-manipulator.helper';
import { PaymentProvider, useInitiateFlightBooking } from '@/lib/hooks/website/flight-booking.hook';
import { TBookingProviderRequestForm } from '@/lib/schemas/website/flight-booking.schema';
import { useFlightBookingStore } from '@/store/website/flight/flight-booking.store';
import { CreditCard, Landmark } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function FlightBookingPaymentPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.bookingId as string;
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('paystack');
  const registration = useFlightBookingStore((state) => state.bookingRegistration);
  const confirmPrice = useFlightBookingStore((state) => state.confirmPriceState);
  const searchParams = useFlightBookingStore((state) => state.flightSearchParamState);
  const initiateBooking = useInitiateFlightBooking();

  const firstSegment = confirmPrice?.outbound[0];
  const lastSegment = confirmPrice?.outbound[confirmPrice.outbound.length - 1];

  const handlePayment = async () => {
    if (!registration || !confirmPrice || !searchParams || !firstSegment || !lastSegment) {
      toast.error('Booking details are missing. Please review your customer information again.');
      router.push(`/flight-booking/${encodeURIComponent(bookingId)}/customer-info`);
      return;
    }

    const payload: TBookingProviderRequestForm = {
      flightId: bookingId,
      totalAmount: confirmPrice.pricing.payable,
      origin: firstSegment.airport_from_details.city,
      destination: lastSegment.airport_to_details.city,
      travelDate: new Date(firstSegment.departure_time),
      travellerCount: registration.passengers.length,
      paymentProvider: selectedProvider,
      userRegistrying: registration,
    };

    const result = await initiateBooking.mutateAsync(payload);
    window.location.assign(result.checkoutUrl);
  };

  if (!registration || !confirmPrice || !searchParams) {
    return (
      <Card>
        <CardContent className='space-y-4 p-6 text-center'>
          <p className='font-semibold text-gray-800'>Payment cannot start until passenger details are complete.</p>
          <Button onClick={() => router.push(`/flight-booking/${encodeURIComponent(bookingId)}/customer-info`)}>
            Return to Customer Information
          </Button>
        </CardContent>
      </Card>
    );
  }

  const paymentOptions: Array<{ value: PaymentProvider; label: string; description: string; icon: typeof CreditCard }> = [
    {
      value: 'paystack',
      label: 'Paystack',
      description: 'Pay securely with card, bank transfer, or supported local channels.',
      icon: Landmark,
    },
    {
      value: 'stripe',
      label: 'Stripe',
      description: 'Pay securely with international cards through Stripe checkout.',
      icon: CreditCard,
    },
  ];

  return (
    <div className='mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]'>
      <Card>
        <CardHeader>
          <CardTitle>Overview & Payment</CardTitle>
        </CardHeader>
        <CardContent className='space-y-5'>
          <div className='grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-2'>
            <p>Route: {searchParams.from_code} to {searchParams.to_code}</p>
            <p>Departure: {searchParams.departure}</p>
            <p>Passengers: {registration.passengers.length}</p>
            <p>Contact: {registration.contact.email}</p>
          </div>
          <Separator />
          <div className='space-y-3'>
            <h3 className='font-semibold text-gray-900'>Choose payment option</h3>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              {paymentOptions.map((option) => {
                const Icon = option.icon;
                const isActive = selectedProvider === option.value;

                return (
                  <button
                    key={option.value}
                    type='button'
                    onClick={() => setSelectedProvider(option.value)}
                    className={`rounded-lg border p-4 text-left transition ${
                      isActive ? 'border-[#E63A24] bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className='mb-3 flex items-center gap-2 font-semibold text-gray-900'>
                      <Icon className='h-5 w-5' />
                      {option.label}
                    </div>
                    <p className='text-sm text-gray-600'>{option.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
          <Button
            type='button'
            size='lg'
            onClick={handlePayment}
            disabled={initiateBooking.isPending}
            className='w-full bg-[#E63A24] font-bold hover:bg-[#c5311e]'
          >
            {initiateBooking.isPending ? 'Creating secure checkout...' : `Pay with ${selectedProvider === 'paystack' ? 'Paystack' : 'Stripe'}`}
          </Button>
        </CardContent>
      </Card>

      <Card className='h-fit'>
        <CardHeader>
          <CardTitle>Price Summary</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3 text-sm text-gray-600'>
          <div className='flex justify-between'>
            <span>Base fare</span>
            <span>{formatNGN(confirmPrice.pricing.base_fare)}</span>
          </div>
          <div className='flex justify-between'>
            <span>Taxes</span>
            <span>{formatNGN(confirmPrice.pricing.tax)}</span>
          </div>
          <Separator />
          <div className='flex justify-between text-base font-semibold text-gray-900'>
            <span>Total</span>
            <span>{formatNGN(confirmPrice.pricing.payable)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
