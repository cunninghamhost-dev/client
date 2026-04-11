// frontend/src/app/[locale]/(website)/flight/search/[flight_type]/FlightSechClient.tsx

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import FlightSearchResults from './FlightSearchResults';
import { useGetTiqwaFlightSearch } from '@/lib/hooks/tiqwa/flight-search.hook';
import { useState, useMemo } from 'react';
import { GlobalLoadingDialog } from '@/components/website/GlobalLoadingDialog';
import { useFlightBookingStore } from '@/store/website/flight/flight-booking.store';
import { FlightSearchQuery } from '@/lib/types/flight-search/flight-search-url';
import { buildFlightBookingUrl } from '@/lib/types/flight-booking/flight-booking-url';
import { mapConfirmPriceError, useConfirmPriceHook } from '@/lib/hooks/tiqwa/confirm-price.hook';
import { ConfirmPriceErrorDialog } from './_component/ConfirmPriceErrorDialog';
import { mapFlightToDetails } from '@/lib/mappers/flight.mapper';
import { FlightTypeEnum } from '@/lib/schemas/enums/flight-types.enum';

type FlightSearchClientProps = {
  locale: string;
  flightType: FlightTypeEnum;
};

type ApiErrorShape = {
	  response?: {
		status?: number;
		data?: unknown;
	  };
	  message?: string;
	};
	
export default function FlightSearchClient({ locale, flightType }: FlightSearchClientProps) {
  const isRoundTrip = flightType === 'round_trip';
  const [openLoader, setOpenLoader] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<null | ReturnType<typeof mapConfirmPriceError>>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const confirmPriceMutation = useConfirmPriceHook();
  const setFlightSearchParamState = useFlightBookingStore((s) => s.setFlightSearchParamState);
  const setConfirmPriceState = useFlightBookingStore((s) => s.setConfirmPriceState);
  const flightIdFromStore = useFlightBookingStore((s) => s.flightId);
  
  console.log(locale, isRoundTrip);

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

	  // REQUIRED by FlightSearchQuery
	  origin_country: searchParams.get('origin_country') || '',
	  destination_country: searchParams.get('destination_country') || '',
	  from_code: searchParams.get('from_code') || '',
	  to_code: searchParams.get('to_code') || '',
	}), [searchParams]);

  // 2. Hook into the refurbished Backend API
  // Ensure keys match: origin, destination, departure_date, adults, cabin
  const { from_code, to_code, departure, return: returnDate, cabin, adult, child, infant } = search;

	const { data: flightList, isLoading, isError, error } = useGetTiqwaFlightSearch({
	  origin: from_code,
	  destination: to_code,
	  departure_date: departure,
	  return_date: returnDate || undefined,
	  adults: Number(adult),
	  children: Number(child),
	  infants: Number(infant || '0'),
	  cabin: cabin,
	});

  const handleConfirm = (flightId: string) => {
    setOpenLoader(true);
    confirmPriceMutation.mutate(flightId, {
      onError: (err: unknown) => {
		  setOpenLoader(false);

		  let statusCode = 500;

		  if (
			err &&
			typeof err === 'object' &&
			'response' in err
		  ) {
			const apiError = err as ApiErrorShape;
			statusCode = apiError.response?.status ?? 500;
		  }

		  setErrorState(mapConfirmPriceError(statusCode));
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
          flights={(flightList ?? []).map(mapFlightToDetails)} 
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
