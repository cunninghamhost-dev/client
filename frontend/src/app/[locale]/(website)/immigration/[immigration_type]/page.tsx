import React from 'react';
import WorkPermitContent from './_component/types/WorkPermitContent';
import ImmigrationTypeHeroSection from './_component/ImmigrationTypeHeroSection';
import { serviceLoadCountries } from '@/app/service/domain/select/loadCountries.select';

export default async function ImmigrationTypeDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ immigration_type: string }>;
  searchParams: Promise<{ origin?: string; destination?: string }>;
}) {
  // Unwrap both
  const { immigration_type } = await params;
  const { origin, destination } = await searchParams;

  const countries = await serviceLoadCountries();

  const originCountry = countries.find((c) => c.id === origin);
  const destinationCountry = countries.find((c) => c.id === destination);

  if (!originCountry || !destinationCountry) {
    throw new Error('Invalid country selection');
  }

  const renderVisaContent = () => {
    switch (immigration_type) {
      case 'work_permit':
        return <WorkPermitContent type={immigration_type} />;
      case 'citizenship':
        return (
          <p>
            Citizenship details for {origin} traveling to {destination}...
          </p>
        );
      case 'resident-permit':
        return (
          <p>
            Resident Permit details for {origin} traveling to {destination}...
          </p>
        );
      default:
        return <p>Unknown visa type selected.</p>;
    }
  };
  return (
    <div className='py-4 m-0'>
      <ImmigrationTypeHeroSection type={immigration_type} source={originCountry} destination={destinationCountry} />
      <div className='w-full max-w-5xl mx-auto mt-28 mb-12 bg-transparent'>{renderVisaContent()}</div>
    </div>
  );
}
