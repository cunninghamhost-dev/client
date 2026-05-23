import React from 'react';
import PropertyCard from './component/PropertyCard';
import PictureGallery from './component/PictureGallery';
import HotelServices from './component/HotelServices';
import RoomSelectionForm from './component/RoomSelectionForm';
import HotelAccessibility from './component/HotelAccessibility';
import HotelPolicies from './component/HotelPolicies';
import ImportantInformation from './component/ImportantInformation';
import HotelFAQ from './component/HotelFAQ';
import HotelReviews from './component/HotelReviews';

interface IHotelLocationProps {
  params: Promise<{
    location: string;
    id: string;
  }>;
}

export default async function HotelProfileLocation({ params }: IHotelLocationProps) {
  const { location, id } = await params;

  return (
    <div key={id} className='flex flex-col gap-4 my-4'>
      <PropertyCard />
      <PictureGallery location={location} />
      <HotelServices />
      <RoomSelectionForm />
      <HotelAccessibility />
      <HotelPolicies />
      <ImportantInformation />
      <HotelFAQ />
      <HotelReviews />
    </div>
  );
}

// export async function generateStaticParams() {
//   return [
//     { location: 'London', id: '1' },
//     { location: 'London', id: '2' },
//     { location: 'Canary%20Wharf%20London', id: '3' },
//   ];
// }
