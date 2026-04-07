// src/app/[locale]/(website)/flight/search/[flight_type]/page.tsx
import { FlightTypeEnum } from '@/lib/schemas/enums/flight-types.enum';
import React from 'react';
import FlightSearchClient from './FlightSearchClient';

export default async function FlightSerachPage({
  params,
}: {
  params: Promise<{
    locale: string;
    flight_type: string;
  }>;
}) {
  const { locale, flight_type } = await params;

  return (
    <section className='py-2'>
      <FlightSearchClient locale={locale} flightType={flight_type as FlightTypeEnum} />
    </section>
  );
}
