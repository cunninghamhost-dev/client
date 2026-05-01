import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const ConfirmationEmail = () => {
  return (
    <Card className='rounded-sm shadow-none  border-[#BDBDBD] w-full p-[1px] text-[#1A1A1A]'>
      <CardContent>
        <div className='px-[18px] pt-6 pb-[15px]'>
          <h4 className='font-bold text-[1.438rem]  leading-[30px]'>Confirmation email</h4>
          <p className='mt-4 text-xs leading-[18.2px]'>
            Booking confirmations will be sent to the following:{' '}
            <span className='font-bold'>rowland.i.ozemoya@gmail.com</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfirmationEmail;
