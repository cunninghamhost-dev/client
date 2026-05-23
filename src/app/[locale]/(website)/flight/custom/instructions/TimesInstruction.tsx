'use client';

import TimeRangeSlider from '@/components/defaults/TimeRangeSlider';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import React from 'react';

const TimesInstruction = () => {
  return (
    <div className='mt-0'>
      <Card className='w-full bg-[#edeff1]  rounded-none border-0 border-t-[1px] border-t-gray-500 shadow-none px-2'>
        <CardTitle>
          <h5 className='font-bold text-[#0F294D] text-[13.89px] leading-[18px]'>Times</h5>
        </CardTitle>
        <CardContent className='px-2 w-full'>
          <div className='flex flex-col gap-6'>
            <TimeRangeSlider title='Departure Time' />
            <TimeRangeSlider title='Arrival Time' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimesInstruction;
