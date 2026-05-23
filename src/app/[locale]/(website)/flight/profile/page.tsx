import React from 'react';
import FlightSideSection from '../FlightSideSection';
import FlightCategoryInstance from './FlightCategoryInstance';

const FlightProfilePage = () => {
  return (
    <div className='w-full p-0 transition'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='w-full col-span-1'>
          <FlightSideSection />
        </div>
        <div className='col-span-2 w-full mt-1'>
          <FlightCategoryInstance />
        </div>
      </div>
    </div>
  );
};

export default FlightProfilePage;
