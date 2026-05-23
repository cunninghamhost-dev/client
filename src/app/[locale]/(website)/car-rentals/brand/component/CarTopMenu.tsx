import React from 'react';
import RevertProfile from './RevertProfile';
import AnchorNavigation from '@/components/defaults/AnchorNavigation';
import { CarRentalProfileLinks as links } from '@/lib/constants/website/carrentals/cars-main-content.constant';
import { Card, CardContent } from '@/components/ui/card';

const CarTopMenu = () => {
  return (
    <nav className='fixed top-16 left-0 w-full bg-white shadow-md'>
      <div className='flex flex-col gap-0 items-start'>
        <Card className='w-full rounded-none mx-auto py-4 bg-gray-100'>
          <CardContent></CardContent>
        </Card>
        <RevertProfile />
        <AnchorNavigation items={links} />
      </div>
    </nav>
  );
};

export default CarTopMenu;
