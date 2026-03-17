import React from 'react';
import VisaTypeHeroSection from './_component/VisaTypeHeroSection';
import StudentVisaContent from './_component/types/StudentVisaContent';
import BusinessVisaContent from './_component/types/BusinessVisaContent';

export default async function VisaTypeDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ visa_type: string }>;
  searchParams: Promise<{ citizen?: string; destination?: string }>;
}) {
  // Unwrap both
  const { visa_type } = await params;
  const { citizen, destination } = await searchParams;

  const renderVisaContent = () => {
    switch (visa_type) {
      case 'student-visa':
        return <StudentVisaContent visa_type={visa_type} />;
      case 'work-permit':
        return (
          <p>
            Work permit details for {citizen} traveling to {destination}...
          </p>
        );
      case 'tourist-visa':
        return (
          <p>
            Tourist visa details for {citizen} traveling to {destination}...
          </p>
        );
      case 'business-visa':
        return <BusinessVisaContent visa_type={visa_type} />;
      default:
        return <p>Unknown visa type selected.</p>;
    }
  };
  return (
    <div className='py-4 m-0'>
      <VisaTypeHeroSection type={visa_type} source={citizen} destination={destination} />
      <div className='w-full max-w-5xl mx-auto mt-28 mb-12 bg-transparent'>{renderVisaContent()}</div>
    </div>
  );
}
