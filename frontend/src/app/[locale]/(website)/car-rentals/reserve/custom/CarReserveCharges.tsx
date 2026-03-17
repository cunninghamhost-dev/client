import { Separator } from '@/components/ui/separator';
import React from 'react';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';

const CarReserveCharges = () => {
  return (
    <div className='flex flex-col items-start gap-4'>
      <p className='font-bold text-xs leading-[18.35px] text-[#2F7000]'>
        No surprises! <span className='font-normal'>Here’s a breakdown of your price:</span>{' '}
      </p>
      <div className='w-full flex flex-col gap-1'>
        <div className='w-full flex items-start justify-between gap-4 text-xs leading-[18.35px] text-[#1F1F1F]'>
          <p>Rental Car Damage Protection payable today</p>
          <span className='text-right'>$26.00</span>
        </div>
        <div className='w-full flex items-start justify-between text-xs leading-[18.35px] text-[#2F7000]'>
          <p>Due today</p>
          <span className='text-right'>$26.00</span>
        </div>

        <div className='w-full flex items-start justify-between text-xs leading-[18.35px]'>
          <div className='flex-1 flex gap-1 items-start text-[#1668E3]'>
            <p className='text-xs leading-5'>Due at car rental counter </p>
            <MdKeyboardDoubleArrowDown className='mt-1' size={13} />
          </div>
          <span className='text-right'>$26.00</span>
        </div>
      </div>
      <Separator orientation='horizontal' />
      <div className='w-full flex flex-col gap-2'>
        <div className='w-full flex-1 flex items-start justify-between text-xs leading-[18.35px]'>
          <p className='text-xs leading-5'>Total </p>
          <span className='text-right font-bold'>$26.00</span>
        </div>
        <p className='text-xs leading-5 max-w-[85%]'>
          Rates are quoted in US dollars. You&apos;ll pay GBP 71.45 at the carrental counter.
        </p>
      </div>
    </div>
  );
};

export default CarReserveCharges;
