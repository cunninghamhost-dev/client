'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState } from 'react';
import { CiCircleCheck, CiCircleInfo } from 'react-icons/ci';

const TourOptions = () => {
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const adultPrice = 280;
  const childPrice = 54;
  const total = adultCount * adultPrice + childCount * childPrice;
  return (
    <Card className='bg-[#ecf4f4] border-[#009DC4] rounded-[4px] border-2 shadow-sm mt-4'>
      <CardContent className='px-4'>
        <div className='flex flex-col gap-4 mb-3'>
          <Label className='font-bold text-base leading-6'>Morning departure</Label>
          <Badge className='bg-[#009DC4]'>Genius</Badge>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <CiCircleInfo className='w-6 h-6 text-gray-900' />
            <span className='text-sm leading-5'>Non-refundable</span>
          </div>
          <div className='flex items-center gap-2'>
            <CiCircleCheck className='w-6 h-6 text-gray-900' />
            <span className='text-sm leading-5'>Morning departure</span>
          </div>
        </div>
        {/* Language Options */}
        <div className='space-y-2 mt-4'>
          <Label className='font-bold text-sm leading-6'>Language options</Label>
          <Select defaultValue='english-tour'>
            <SelectTrigger className='border border-[#7C7C7C] rounded-[4px] py-1'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='english-tour'>English - Tour guide</SelectItem>
              <SelectItem value='spanish-tour'>Spanish - Tour guide</SelectItem>
              <SelectItem value='french-tour'>French - Tour guide</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Ticket Quantity */}
        <div className='space-y-2 mt-4'>
          <Label className='font-bold text-sm leading-6'>How many tickets?</Label>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0'>
                <p className='font-semibold text-sm leading-6'>Adult (age 13-99)</p>
                <div className='inline-flex space-x-1'>
                  <p className='text-[10px] text-red-600 line-through'>€{adultPrice}</p>
                  <p className='text-xs text-muted-foreground'>
                    €{adultPrice} x {adultCount}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3 p-2 border border-[#7C7C7C] rounded-[4px]'>
                <Button
                  variant='default'
                  size='sm'
                  className='w-8 h-8 p-0 cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-600'
                  onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                >
                  -
                </Button>
                <span className='w-8 text-center text-sm leading-5'>{adultCount}</span>
                <Button
                  variant='default'
                  size='sm'
                  className='w-8 h-8 p-0 cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-600'
                  onClick={() => setAdultCount(adultCount + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='space-y-0'>
                <p className='font-semibold text-sm leading-6'>Child (age 4-12)</p>
                <div className='inline-flex space-x-1'>
                  <p className='text-[10px] text-red-600 line-through'>€{childPrice}</p>
                  <p className='text-xs text-muted-foreground'>
                    €{childPrice} x {childCount}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-3 p-2 border border-[#7C7C7C] rounded-[4px]'>
                <Button
                  variant='default'
                  size='sm'
                  className='w-8 h-8 p-0 cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-600'
                  onClick={() => setChildCount(Math.max(1, childCount - 1))}
                >
                  -
                </Button>
                <span className='w-8 text-center text-sm leading-5'>{childCount}</span>
                <Button
                  variant='default'
                  size='sm'
                  className='w-8 h-8 p-0 cursor-pointer bg-gray-50 hover:bg-gray-100 text-gray-600'
                  onClick={() => setChildCount(childCount + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            {/* Total */}
            <div className='border-t border-gray-300 pt-4'>
              <div className='mt-3 flex items-center justify-between mb-2 text-sm'>
                <span className='font-bold'>Total</span>
                <div className='text-right'>
                  <span className='text-[#E63A24] line-through mr-2'>€{total + 30}</span>
                  <span className='font-bold'>€{total}</span>
                  <Badge
                    variant='default'
                    className='ml-2 text-xs bg-[#009DC4] py-0.5 px-[5px] rounded-[8px] rounded-tr-[4px]'
                  >
                    10% off
                  </Badge>
                </div>
              </div>
              <p className='text-xs text-[#666666]'>Includes taxes and fees</p>
              <Button className='w-full mt-4 bg-orange-600 hover:bg-orange-700'>Next</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TourOptions;
