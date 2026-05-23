'use client';
import SVGIcon from '@/components/defaults/SVGIcons';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import React, { useState } from 'react';

const NotificationTrackPrice = () => {
  const [createPrice, setCreatePrice] = useState(false);
  return (
    <Card className='w-full gap-4 bg-white rounded-lg border-[1px] border-[#D9E2E8] shadow-xs'>
      <CardContent>
        <div className=' space-y-1 text-[#E63A24] tracking-1'>
          <div className='flex items-start gap-2'>
            <SVGIcon fileName='icon-bell.svg' alt='Bell' width={24} height={26.66} />
            <h3 className='font-bold text-sm leading-5'>Track Price</h3>
          </div>
          <div className='max-w-[14rem]'>
            <h6 className='text-[#666666] font-normal text-xs leading-[18px]'>
              Stay updated. Get the best deals before they’re gone
            </h6>
          </div>
        </div>
      </CardContent>
      <div className='px-4 py-0'>
        <hr />
      </div>
      <CardFooter>
        <div className='flex flex-row items-center justify-between w-full'>
          <h5 className='text-[#1A1A1A] font-bold text-sm leading-5'>Create Price</h5>
          <Switch
            className='data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-[#BDBDBD]'
            checked={createPrice}
            onCheckedChange={() => setCreatePrice((prev) => !prev)}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default NotificationTrackPrice;
