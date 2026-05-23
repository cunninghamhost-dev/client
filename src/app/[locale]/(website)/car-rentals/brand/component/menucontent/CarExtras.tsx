import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React from 'react';

interface IExtrasProp {
  extras: string;
  amount: number;
}

const ConstExtrasList: IExtrasProp[] = [
  {
    extras: 'Baby Child Seat',
    amount: 21,
  },
  {
    extras: 'Infant Seat',
    amount: 21,
  },
  {
    extras: 'Toddler Seat',
    amount: 21,
  },
  {
    extras: 'Navigation System',
    amount: 24,
  },
];

const CarExtras = () => {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <Card>
        <CardContent>
          <div className='flex flex-col gap-8 text-[#1A1A1A]'>
            <div className='space-y-1'>
              <h3 className='font-semibold text-base md:text-lg lg:text-xl leading-[18px] md:leading-6'>Extras</h3>
              <span className='text-sm leading-[18px]'>
                Requests cannot be guaranteed as they are subject to availability. Payment due at pick-up.
              </span>
            </div>
            <div className='flex flex-col gap-8'>
              {ConstExtrasList.map(({ extras, amount }) => (
                <div key={extras} className='flex items-start  justify-between gap-3'>
                  <div className='flex items-start gap-2'>
                    <Checkbox id='terms' />
                    <Label className='text-sm leading-[18px]' htmlFor='terms'>
                      {extras}
                    </Label>
                  </div>
                  <div className='flex items-end text-right'>
                    <div className='flex flex-col gap-0.5'>
                      <h6 className='font-semibold text-sm md:text-base leading-4 md:leading-5'>{`$${amount}`}</h6>
                      <span className='text-xs leading-4'>per day</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarExtras;
