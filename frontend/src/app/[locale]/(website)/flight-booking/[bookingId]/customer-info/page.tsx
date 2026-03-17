// src/[locale]/(website)/flight-booking/[bookingId]/customer-info/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import CustomerInfoPage from './CustomerInfoPage';
import { useFlightBookingStore } from '@/store/website/flight/flight-booking.store';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CustomerFlightBookingPage() {
  const router = useRouter();
  const [isValidSession, setIsValidSession] = useState(true);

  const params = useParams();
  const searchParams = useSearchParams();
  const flightIdFromUrl = params.bookingId as string; // or params.flightId — depending on your route
  const reqKey = searchParams.get('reqKey');
  console.log('Request Key:', reqKey);

  // Get everything from the store
  const {
    flightId: storedFlightId,
    confirmPriceState,
    flightSearchParamState: flSearchParams,
    flightSearchUrl: flightsearchURL,
    resetFlightBooking: resetAll,
  } = useFlightBookingStore();

  useEffect(() => {
    if (!confirmPriceState || !flSearchParams || !storedFlightId) {
      console.warn('Missing flight booking data in store');
      // You can decide what to do:
      // Option A: redirect back to search
      // Option B: show error message
      // Option C: just disable form / show skeleton
      setIsValidSession(false);
    }

    // Optional: verify flightId consistency
    if (storedFlightId && storedFlightId !== flightIdFromUrl) {
      console.warn('URL flightId does not match stored flightId');
    }

    console.log('Customer Booking Information', confirmPriceState);
  }, [confirmPriceState, flSearchParams, storedFlightId, flightIdFromUrl]);

  const handleBackToFlightSearch = () => {
    resetAll();
    if (flightsearchURL) router.push(flightsearchURL!);
    else router.back();
  };

  if (!isValidSession) {
    return (
      <div className='block space-y-2 p-8 text-center text-white mb-8'>
        <h2 className='text-base md:text-xl lg:text-2xl font-bold mb-4 leading-[150%]'>Session expired or invalid</h2>
        <p className='font-light'>Click on the Go Back button to start a new flight search.</p>
        <div className='inline md:hidden w-full'>
          <Button
            onClick={handleBackToFlightSearch}
            variant={'default'}
            className='bg-orange-600 hover:bg-orange-800 text-white cursor-pointer'
            asChild
          >
            <div className='flex items-start gap-4'>
              <ArrowLeft className='h-4 w-4 mt-1' />
              <span className='text-base leading-5 capitalize'>Back to flight search</span>
            </div>
          </Button>
        </div>

        {/* You can add a button to /flight/search/... here */}
      </div>
    );
  }

  if (!confirmPriceState) {
    return <div className='p-10 font-bold text-center text-white'>Loading flight details...</div>;
  }
  return (
    <div className='flex flex-col gap-8 w-full lg:max-w-7xl mx-auto px-4 py-8'>
      <div className='flex justify-center items-center md:hidden w-full'>
        <Button
          onClick={handleBackToFlightSearch}
          variant={'default'}
          className='bg-orange-600 hover:bg-orange-800 text-white cursor-pointer'
          asChild
        >
          <div className='flex items-start gap-4'>
            <ArrowLeft className='h-4 w-4 mt-1' />
            <span className='text-base leading-5 capitalize'>Back to flight search</span>
          </div>
        </Button>
      </div>
      <CustomerInfoPage flight_id={storedFlightId!} data_profile={confirmPriceState} search_param={flSearchParams!} />
    </div>
  );
}
