import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useBookingOptionFormStore } from '@/store/website/carrentals/driverbookingoption.store';
import React from 'react';
import { IoShieldCheckmark } from 'react-icons/io5';

const DamageProtectionCoverage = () => {
  const { cancelBookingOption } = useBookingOptionFormStore();
  const handleChangeOption = () => {
    cancelBookingOption();
  };
  return (
    <Card className='rounded-sm shadow-none  border-[#BDBDBD] w-full p-[1px] text-[#1A1A1A]'>
      <CardContent>
        <div className='px-[18px] pt-6 pb-[15px] block space-y-6'>
          <div className='flex items-start justify-between'>
            <h4 className='font-bold text-[1.238rem] text-[#1A1A1A] leading-[30px]'>
              Great choice! You’ve added Rental Car Damage Protection
            </h4>
            <div className='mt-1 w-8 h-8 bg-[#009dc413] rounded-full flex items-center justify-center'>
              <IoShieldCheckmark color='#009DC4' />
            </div>
          </div>
          <div className='block space-y-3  '>
            <p className='text-xs leading-[18.2px] text-[#1F1F1F]'>
              Your rental car has coverage for bumps, scratches, and other damage due to covered reasons.
            </p>
            <Button
              onClick={handleChangeOption}
              className='text-[13px] leading-[18.2px] text-[#1668E3] hover:text-[#074db6] p-0 cursor-pointer'
              variant={'link'}
            >
              Change
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DamageProtectionCoverage;
