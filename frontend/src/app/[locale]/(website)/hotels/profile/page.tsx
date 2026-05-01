import React from 'react';
import PropertySorting from './components/PropertySorting';
import HotelProfile from './components/HotelProfile';
//import HotelSideMenu from './components/HotelSideMenu';

const HotelPage = () => {
  return (
    <div className='p-0 max-w-full transition'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='w-full col-span-1'>{/* <HotelSideMenu /> */}</div>
        <div className='col-span-2 mt-6 relative flex-[1_1_auto] flex flex-col gap-4 w-full'>
          <PropertySorting propertyNumbers={3} />
          <HotelProfile numberOfDays={3} numberOfRooms={2} />
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
