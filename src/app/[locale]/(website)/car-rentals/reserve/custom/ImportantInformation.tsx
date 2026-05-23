import { Card, CardContent } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import React from 'react';

const ImportantInformation = () => {
  return (
    <Card className='rounded-sm shadow-none  border-[#BDBDBD] w-full p-[1px] text-[#1A1A1A]'>
      <CardContent>
        <div className='px-[18px] pt-6 pb-[15px]'>
          <h4 className='font-bold text-[1.438rem]  leading-[30px]'>Important car information</h4>
          <p className='mt-4 text-base leading-[20.25px]'>
            Midsize SUV (London, United Kingdom) - Wed, Aug 27 - Thu, Aug 28
          </p>
          <ul className='mt-3 text-xs leading-[18.2px] list-disc space-y-2'>
            <li>
              <p>The following rules and restrictions are provided by the car rental company.</p>
            </li>
            <li>
              <p>
                The driver must present a valid{' '}
                <span className='px-4 text-[#009DC4] inline-flex space-x-8'>
                  driver&apos;s license &nbsp;
                  <Copy className='mt-0.5' size={16} />{' '}
                </span>{' '}
                and credit card in their name upon pick-up. The credit card is required as a deposit when renting any
                vehicle. The deposit amount is held by the car rental company. Please ensure sufficient funds are
                available on the card.
              </p>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportantInformation;
