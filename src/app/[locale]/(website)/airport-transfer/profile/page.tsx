import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import AirportFilterMenu from '../custom/AirportFiltersMenu';

const page = () => {
  return (
    <div className='p-0 max-w-full transition mt-44'>
      <div className='max-w-7xl mx-auto p-4 bg-gray-100'>
        <div className='flex gap-4'>
          <aside className='w-1/4 flex flex-col gap-4'>
            <Card className='p-0 w-full'>
              <CardContent className='p-0 w-full'>
                <Image src={'/images/main/anonymous_map.png'} alt='Google map' width={282} height={168} />
              </CardContent>
              <CardFooter className='w-full flex items-center justify-center'>
                <p className='text-xs leading-[18.35px] p-0'>Travel time from 15m to 1h 30m</p>
              </CardFooter>
            </Card>
            <AirportFilterMenu />
          </aside>
        </div>
      </div>
      {/* <TransferOptions /> */}
      {/* <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='w-full col-span-1'>Side Menu Here</div>
        <div className='col-span-2 mt-6 relative flex-[1_1_auto] flex flex-col gap-4 w-full'>Main Content Here</div>
      </div> */}
    </div>
  );
};

export default page;
