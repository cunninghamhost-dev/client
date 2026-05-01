import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import LanguageSelection from '@/components/website/custom/LanguageSelection';
import { LanguagesConstants as languages } from '@/lib/constants/language.constant';
import { ConstItineraryAdditionals as additionals } from '@/lib/constants/website/attractionstour/tour-details.constants';
import React from 'react';

const ItineraryInfo = () => {
  return (
    <div className='my-4 px-12 flex flex-col gap-4 max-w-3xl'>
      <div className='block space-y-2'>
        <Label className='font-bold text-xl leading-7'>Languages spoken by guide</Label>
        <LanguageSelection languages={languages} className='border border-[#7C7C7C] py-[5px] px-[9px] rounded-full' />
      </div>
      <div className='mt-4 block space-y-6'>
        <Label className='font-bold text-xl leading-7'>Additional information</Label>
        <div className='block space-y-3 text-[#1A1A1A]'>
          {additionals.map((item, _index) => (
            <p key={_index} className='text-base leading-6'>
              {item}
            </p>
          ))}
          <Button variant={'link'} className='p-0 font-semibold text-base leading-6 text-[#009DC4] cursor-pointer'>
            Show more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryInfo;
