import React from 'react';
import CarSideMenu from '../custom/CarSideMenu';
import MainContent from '../custom/MainContent';

const CarRentalsPage = () => {
  return (
    <div className='p-0 max-w-full transition'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='w-full col-span-1'>
          <CarSideMenu />
        </div>

        <div className='col-span-2 mt-6 relative flex-[1_1_auto] flex flex-col gap-4 w-full'>
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default CarRentalsPage;
