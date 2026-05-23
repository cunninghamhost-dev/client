'use client';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import ProtectionOption from './ProtectionOption';
import { MessageSquareText } from 'lucide-react';
import DamageProtectionCoverage from './DamageProtectionCoverage';
import ActualPayment from './ActualPayment';
import { useBookingOptionFormStore } from '@/store/website/carrentals/driverbookingoption.store';

const DriverCarProtection = () => {
  const { showBookingPayment, showProtection } = useBookingOptionFormStore();
  return (
    <div className='flex flex-col gap-4 items-start'>
      {!showBookingPayment && (
        <Card className='rounded-sm shadow-none  border-[#BDBDBD] w-full p-[1px]'>
          <CardContent>
            <div className='px-[18px] pt-6 pb-[15px]'>
              <h4 className='font-bold text-[1.438rem] text-[#1A1A1A] leading-[30px]'>
                Drive with rental car damage protection
              </h4>
              <p className='text-xs leading-[18.2px] text-gray-600'>
                From collision to theft—Rental Car Protection may cover what your credit card might not.
              </p>
              <div className='mt-4 flex flex-col items-start gap-2'>
                <div className='space-x-1.5'>
                  <h6 className='text-xs leading-[18.2px] text-[#1A1A1A]'>
                    Select an option to continue booking&nbsp;<span className='text-[#B80000]'>*</span>
                  </h6>
                </div>
                <ProtectionOption />
                <div className='mt-4 block space-y-1 text-[13px] leading-[18.2px]'>
                  <p>Here’s what one Cunningham traveler had to say about choosing protection:</p>
                  <div className='inline-flex space-x-2'>
                    <MessageSquareText size={16} />
                    <p>Michael J., Smith</p>
                  </div>
                  <article className='mt-2'>
                    “The affordability and convenience of being able to purchase quality coverage for my car rental.”
                  </article>
                </div>
                <p className='mt-8 text-[13px] leading-[18.2px] text-[#666666]'>
                  The cost of this plan includes insurance and assistance services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {showBookingPayment && (
        <div className='flex flex-col gap-4 items-start'>
          {showProtection && <DamageProtectionCoverage />}
          <ActualPayment />
        </div>
      )}
    </div>
  );
};

export default DriverCarProtection;
