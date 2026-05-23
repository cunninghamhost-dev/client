'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import useCarRentalProfileStore from '@/store/website/carrentals/carprofile.store';
import { ChevronsDown } from 'lucide-react';
import { FaCheck } from 'react-icons/fa6';
import DriversProfileForm from './DriversProfileForm';
import Link from 'next/link';

const DriversProfile = () => {
  const { brand } = useCarRentalProfileStore();
  return (
    <Card className='rounded-sm shadow-none  border-[#BDBDBD] w-full p-[1px]'>
      <CardContent>
        <div className='px-[18px] pt-6 pb-[15px]'>
          <h4 className='font-bold text-[1.438rem] text-[#1A1A1A] leading-[30px]'>Who&apos;s driving?</h4>
          <h6 className='mt-8 text-xs leading-[18.35px] text-gray-600'>
            <span className='text-[#D60000]'>*</span>Required
          </h6>
          <div className='mt-3 flex flex-col gap-2'>
            <div className='flex gap-2'>
              <h4 className='text-base text-[#1A1A1A] leading-[23.8px]'>{brand}</h4>
              <span className='mt-0.5 text-sm leading-[21.18px] text-[#666666]'>Wed, Aug 27 - Thu, Aug 28</span>
            </div>
            <div className='flex item-start gap-8'>
              <div className='flex item-start gap-2 font-bold text-sm leading-[18.35px] text-[#148148]'>
                <FaCheck size={13} className='mt-0.5' />
                <span>Unlimited mileage</span>
              </div>
              <div className='flex item-start gap-2 font-bold text-sm leading-[18.35px] text-[#148148]'>
                <FaCheck size={13} className='mt-0.5' />
                <span>Online check-in</span>
              </div>
            </div>
            <DriversProfileForm />

            <Link href={'#'}>
              <div className='mt-4 flex items-start gap-3 text-xs leading-[18.85px] text-[#009DC4]'>
                <h6>Loyalty and flight information (optional)</h6>
                <ChevronsDown size={10} className='mt-1' />
              </div>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriversProfile;
