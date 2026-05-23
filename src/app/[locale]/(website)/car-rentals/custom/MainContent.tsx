import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PaginationReport from './main/PaginationReport';
import RentalDisplay from './main/RentalDisplay';
import { IoMdInformationCircle } from 'react-icons/io';

const MainContent = () => {
  return (
    <div className='flex flex-col gap-6'>
      <PaginationReport />
      <Card>
        <CardContent>
          <div className='flex items-start px-4 gap-6'>
            <div className='flex-none mt-2'>
              <IoMdInformationCircle size={25} />
            </div>
            <div className='flex-grow flex flex-col items-start gap-0'>
              <span className='text-sm leading-5 font-bold'>Total includes one-way drop-off charge</span>
              <span className='text-sm leading-[18px]'>
                Car rental companies charge this when drop-off and pick-up locations differ.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <RentalDisplay />
    </div>
  );
};

export default MainContent;
