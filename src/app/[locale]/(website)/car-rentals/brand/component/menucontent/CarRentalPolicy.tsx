import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';
import { RxCaretDown } from 'react-icons/rx';

interface IPolicyStatement {
  title: string;
  description: string;
}

const ConstPolicyStatement: IPolicyStatement[] = [
  {
    title: 'Cancellation and no-show policy',
    description: 'Free cancellation up to pick-up',
  },
  {
    title: 'Age surcharge',
    description: 'Applicable for drivers under 25 and above 70 years',
  },
] as const;

const ConstMinimalContact: string[] = [
  'You will receive an email/a message from Europcar to check-in online after the car has been reserved',
  'No paper-work required during pick-up',
  'Minimize contact and save time at the pick-up counter',
];

const CarRentalPolicy = () => {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <Card>
        <CardContent>
          <div className='flex flex-col gap-4 text-[#1A1A1A]'>
            <div className='space-y-3'>
              <h3 className='font-semibold text-base md:text-lg lg:text-xl leading-[18px] md:leading-6'>
                Rental policies
              </h3>
              <div className='w-full flex flex-col items-start gap-2'>
                {ConstPolicyStatement.map((policy) => (
                  <div key={policy.title} className='flex items-start gap-1'>
                    <RxCaretDown size={24} />
                    <div className='flex flex-col gap-0.5'>
                      <h4 className='font-semibold text-sm md:text-base leading-4 md:leading-5'>{policy.title}</h4>
                      <span className='text-sm leading-[18px]'>{policy.description}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex items-start gap-1 text-[#009DC4]'>
                <span className='font-light text-sm leading-[18px]'>View all rules and restrictions</span>
                <LuSquareArrowOutUpRight size={22} />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='font-semibold text-sm md:text-base leading-4 md:leading-5'>What&apos;s included</h3>
              <span className='text-sm leading-[18px]'>These are included in the total price of the car rental.</span>
              <div className='mt-1 flex flex-col gap-2'>
                <div className='flex items-start gap-3'>
                  <FaCheck className='mt-1' size={13} />
                  <span className='font-semibold text-sm md:text-base leading-4 md:leading-5'>
                    Minimal contact with option to check-in online
                  </span>
                </div>
                <div className='flex items-start gap-1 max-w-[90%]'>
                  <ul className='list-disc pl-12'>
                    {ConstMinimalContact.map((contact) => (
                      <li className='text-sm leading-[18px]' key={contact}>
                        {contact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarRentalPolicy;
