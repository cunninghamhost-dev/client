// frontend/src/app/[locale]/(website)/flight/search/[flight_type]/FlightSerachClient.tsx

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FlightTypeEnum } from '@/lib/schemas/enums/flight-types.enum';
import FlightSearchResults from './FlightSearchResults';
import { useGetTiqwaFlightSearch } from '@/lib/hooks/tiqwa/flight-search.hook';
import { useState, useMemo } from 'react';
import { GlobalLoadingDialog } from '@/components/website/GlobalLoadingDialog';
import { useFlightBookingStore } from '@/store/website/flight/flight-booking.store';
import { FlightSearchQuery } from '@/lib/types/flight-search/flight-search-url';
import { buildFlightBookingUrl } from '@/lib/types/flight-booking/flight-booking-url';
import { mapConfirmPriceError, useConfirmPriceHook } from '@/lib/hooks/tiqwa/confirm-price.hook';
import { ConfirmPriceErrorDialog } from './_component/ConfirmPriceErrorDialog';

type Props = {
  locale: string;
  flightType: FlightTypeEnum;
};

export default function FlightSearchClient({ locale, flightType }: Props) {
  const [openLoader, setOpenLoader] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<null | ReturnType<typeof mapConfirmPriceError>>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const confirmPriceMutation = useConfirmPriceHook();

  const setFlightSearchParamState = useFlightBookingStore((s) => s.setFlightSearchParamState);
  const setConfirmPriceState = useFlightBookingStore((s) => s.setConfirmPriceState);
  const flightIdFromStore = useFlightBookingStore((s) => s.flightId);

  // 1. Extract Search Query from URL
  const search: FlightSearchQuery = useMemo(() => ({
      from: searchParams.get('from_code') || '',
      to: searchParams.get('to_code') || '',
      departure: searchParams.get('departure') || '',
      return: searchParams.get('return') || '',
      cabin: searchParams.get('cabin') || 'economy',
      adult: searchParams.get('adult') || '1',
      child: searchParams.get('child') || '0',
      infant: searchParams.get('infant') || '0',
  }), [searchParams]);

  // 2. Hook into the refurbished Backend API
  // Ensure keys match: origin, destination, departure_date, adults, cabin
  const { data: flightList, isLoading, isError, error } = useGetTiqwaFlightSearch({
    origin: search.from,
    destination: search.to,
    departure_date: search.departure,
    return_date: search.return || undefined,
    adults: Number(search.adult),
    children: Number(search.child),
    infants: Number(search.infant),
    cabin: search.cabin,
  }, {
      // Pass an options object to your hook (if it supports it)
      enabled: !openLoader && !confirmPriceMutation.isPending 
    });

  const handleConfirm = (flightId: string) => {
    setOpenLoader(true);
    confirmPriceMutation.mutate(flightId, {
      onError: (err: any) => {
        setOpenLoader(false);
        // Using common error mapping since ApiError might differ between environments
        const statusCode = err?.response?.status || 500;
        setErrorState(mapConfirmPriceError(statusCode, err));
      },
      onSuccess: (data) => {
        setOpenLoader(false);
        const reqKey = crypto.randomUUID();

        setFlightSearchParamState(search);
        setConfirmPriceState(data, flightId);

        const flight_booking_url = buildFlightBookingUrl(flightId, reqKey);
        router.push(flight_booking_url);
      },
    });
  };

  // 3. Conditional Rendering based on Search Data Validity
  if (!search.from || !search.to || !search.departure) {
    return (
      <div className="p-10 text-center">
        <p className='text-sm text-red-600 font-medium'>
          Missing search criteria. Please select origin, destination, and dates.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className='ml-3 text-sm text-gray-500'>Searching for live flight deals...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-center">
        <p className='text-sm text-red-600'>Error: {error?.message || "Failed to fetch flights"}</p>
      </div>
    );
  }

  return (
    <div className='block space-y-4'>
      {/* 4. Display Results */}
      <FlightSearchResults 
          // Check if flightList is an array, or if it has a .data property
          flights={
            Array.isArray(flightList) 
              ? flightList 
              : (flightList?.data || [])
          } 
          onSelectFlight={handleConfirm} 
        />

      <GlobalLoadingDialog
        open={openLoader}
        display_text='Confirming Flight Price'
        sub_text='Please wait while we confirm the latest availability and fare from the airline.'
      />

      <ConfirmPriceErrorDialog
        open={!!errorState}
        title={errorState?.title ?? ''}
        description={errorState?.description ?? ''}
        actionLabel={errorState?.actionLabel}
        onClose={() => setErrorState(null)}
        onAction={() => {
          setErrorState(null);
          // If a flight ID was passed during selection, we use it for retry
          if (flightIdFromStore) handleConfirm(flightIdFromStore);
        }}
      />
    </div>
  );
}
