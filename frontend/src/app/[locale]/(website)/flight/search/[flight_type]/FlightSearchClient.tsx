// src/app/[locale]/(website)/flight/search/[flight_type]/_component/FlightSerachClient.tsx

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FlightTypeEnum } from '@/lib/schemas/enums/flight-types.enum';
import FlightSearchResults from './FlightSearchResults';
import { useGetTiqwaFlightSearch } from '@/lib/hooks/tiqwa/flight-search.hook';
import { useState } from 'react';
import { GlobalLoadingDialog } from '@/components/website/GlobalLoadingDialog';
import { useFlightBookingStore } from '@/store/website/flight/flight-booking.store';
import { FlightSearchQuery } from '@/lib/types/flight-search/flight-search-url';
import { buildFlightBookingUrl } from '@/lib/types/flight-booking/flight-booking-url';
import { mapConfirmPriceError, useConfirmPriceHook } from '@/lib/hooks/tiqwa/confirm-price.hook';
import { ConfirmPriceErrorDialog } from './_component/ConfirmPriceErrorDialog';
import { ApiError } from 'next/dist/server/api-utils';

type Props = {
  locale: string;
  flightType: FlightTypeEnum;
};

export default function FlightSearchClient({ locale, flightType }: Props) {
  const [openLoader, setOpenLoader] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<null | ReturnType<typeof mapConfirmPriceError>>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  console.log('Selected Language: ', locale);
  console.log('Selected Flight type: ', flightType);

  const confirmPriceMutation = useConfirmPriceHook();

  const setFlightSearchParamState = useFlightBookingStore((s) => s.setFlightSearchParamState);
  const setConfirmPriceState = useFlightBookingStore((s) => s.setConfirmPriceState);
  const flightId = useFlightBookingStore((s) => s.flightId);

  const search: FlightSearchQuery = {
    from: searchParams.get('from_code') ?? 'LHR',
    to: searchParams.get('to_code') ?? 'JFK',
    departure: searchParams.get('departure') ?? '',
    cabin: searchParams.get('cabin') ?? 'economy',
    adult: searchParams.get('adult') ?? '0',
    child: searchParams.get('child') ?? '0',
    from_code: searchParams.get('from_code') ?? '',
    to_code: searchParams.get('to_code') ?? '',
    origin_country: searchParams.get('origin_country') ?? '',
    destination_country: searchParams.get('destination_country') ?? '',
  };

  const {
    data: flightList,
    isLoading,
    isError,
    error,
  } = useGetTiqwaFlightSearch({
    origin: search.from,
    destination: search.to,
    departure_date: search.departure,
    return_date: search.return ?? undefined,
    adults: Number(search.adult),
    children: Number(search.child),
    cabin: search.cabin,
  });

  if (isLoading) {
    return <p className='text-sm'>Searching for flights…</p>;
  }

  if (isError) {
    return <p className='text-sm text-red-600'>{error.message}</p>;
  }

  const handleConfirm = (flightId: string) => {
    setOpenLoader(true);
    confirmPriceMutation.mutate(flightId, {
      onError: (error) => {
        setOpenLoader(false);
        if (error instanceof ApiError) {
          setErrorState(mapConfirmPriceError(error.statusCode, error));
        } else {
          setErrorState(mapConfirmPriceError());
        }
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

  if (!search.from || !search.to || !search.departure) {
    return <p className='text-sm text-red-600'>Invalid search parameters</p>;
  }

  return (
    <div className='block space-y-4'>
      <FlightSearchResults flights={flightList ?? []} onSelectFlight={handleConfirm} />;
      <GlobalLoadingDialog
        open={openLoader}
        display_text='Confirming Flight Price'
        sub_text='Please wait while we confirm the latest availability and fare
                  from the airline.'
      />
      <ConfirmPriceErrorDialog
        open={!!errorState}
        title={errorState?.title ?? ''}
        description={errorState?.description ?? ''}
        actionLabel={errorState?.actionLabel}
        onClose={() => setErrorState(null)}
        onAction={() => {
          setErrorState(null);
          handleConfirm(flightId!); // retry if appropriate
        }}
      />
    </div>
  );
}
