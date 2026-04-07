import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const HotelReviews = () => {
  return (
    <Card>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-[#191E3B]'>
          <div className='col-span-1 p-4'>
            <h2 className='text-lg md:text-xl lg:text-2xl leading-normal md:leading-7 lg:leading-8'>Reviews</h2>
          </div>
          <div className='col-span-2 flex flex-col gap-4 items-start'>
            <h3 className='text-base md:text-[1.384rem] leading-5 md:leading-6'>Reviews Coming Soon</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelReviews;
