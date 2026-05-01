import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import { IoShieldCheckmark } from 'react-icons/io5';

const insurancePlan: string[] = [
  'Covers certain bumps, scratches, and other damage',
  'Helps protect your rental vehicle in case of an accident or collision',
  'Gives you access to 24/7 emergency travel assistance',
] as const;

const CarInsurance = () => {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <Card>
        <CardContent>
          <div className='flex flex-col gap-4 text-[#1A1A1A]'>
            <div className='flex items-start justify-between'>
              <h3 className='font-semibold text-base md:text-lg lg:text-xl leading-[18px] md:leading-6'>
                Get rental car insurance plan
              </h3>
              <div className='flex items-end text-right'>
                <IoShieldCheckmark size={48} color='#009DC4' />
              </div>
            </div>
            <div className='flex flex-col gap-2 items-start'>
              {insurancePlan.map((plan) => (
                <div key={plan} className='flex items-start gap-1'>
                  <FaCheck size={13} />
                  <span className='text-sm leading-4'>{plan}</span>
                </div>
              ))}
            </div>
            <Separator orientation='horizontal' />
            <div className=' space-y-1.5'>
              <span className=' font-semibold text-sm leading-4'>
                Add the insurance plan to your rental car on the next step
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarInsurance;
