'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatNGN } from '@/lib/helper/string-manipulator.helper';
import { useFlightBookingStore } from '@/store/website/flight/flight-booking.store';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

const formatDate = (value?: Date | string) => {
  if (!value) return 'Not provided';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Not provided' : date.toLocaleDateString('en-US');
};

export default function FlightBookingReviewPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.bookingId as string;
  const registration = useFlightBookingStore((state) => state.bookingRegistration);
  const confirmPrice = useFlightBookingStore((state) => state.confirmPriceState);
  const searchParams = useFlightBookingStore((state) => state.flightSearchParamState);

  if (!registration || !confirmPrice || !searchParams) {
    return (
      <Card>
        <CardContent className='space-y-4 p-6 text-center'>
          <p className='font-semibold text-gray-800'>Booking details are missing.</p>
          <Button onClick={() => router.push(`/flight-booking/${encodeURIComponent(bookingId)}/customer-info`)}>
            Return to Customer Information
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]'>
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>Review Passenger Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-5'>
            {registration.passengers.map((passenger, index) => (
              <div key={`${passenger.passportNumber}-${index}`} className='space-y-3'>
                <div className='flex flex-wrap items-center justify-between gap-3'>
                  <h3 className='font-semibold text-gray-900'>
                    Passenger {index + 1} ({passenger.passengerType})
                  </h3>
                  <span className='text-sm text-gray-500'>{passenger.title}</span>
                </div>
                <div className='grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-2'>
                  <p>Name: {passenger.firstName} {passenger.lastName}</p>
                  <p>Gender: {passenger.gender}</p>
                  <p>Date of birth: {formatDate(passenger.dateOfBirth)}</p>
                  <p>Passport: {passenger.passportNumber}</p>
                  <p>Passport expiry: {formatDate(passenger.passportExpiry)}</p>
                  <p>Nationality: {passenger.nationalityCountry}</p>
                </div>
                {index < registration.passengers.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-2'>
            <p>Email: {registration.contact.email}</p>
            <p>Phone: {registration.contact.phone_number}</p>
          </CardContent>
        </Card>

        <div className='flex flex-col gap-3 sm:flex-row'>
          <Button
            type='button'
            variant='outline'
            className='gap-2'
            onClick={() => router.push(`/flight-booking/${encodeURIComponent(bookingId)}/customer-info`)}
          >
            <ArrowLeft className='h-4 w-4' />
            Edit Information
          </Button>
          <Button
            type='button'
            className='gap-2 bg-[#E63A24] hover:bg-[#c5311e]'
            onClick={() => router.push(`/flight-booking/${encodeURIComponent(bookingId)}/payment`)}
          >
            <CreditCard className='h-4 w-4' />
            Proceed to Overview & Payment
          </Button>
        </div>
      </div>

      <Card className='h-fit'>
        <CardHeader>
          <CardTitle>Booking Overview</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3 text-sm text-gray-600'>
          <p>{searchParams.from_code} to {searchParams.to_code}</p>
          <p>Departure: {searchParams.departure}</p>
          <p>Passengers: {registration.passengers.length}</p>
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
