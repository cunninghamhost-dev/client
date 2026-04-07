'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { addDays, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

const availableDates = [
  { date: new Date(), label: '31\nAug', day: 'Sun' },
  { date: addDays(new Date(), 1), label: '1\nSep', day: 'Mon' },
  { date: addDays(new Date(), 2), label: '2\nSep', day: 'Tue' },
  { date: addDays(new Date(), 3), label: '3\nSep', day: 'Wed' },
];
const timeSlots = ['09:00 AM', '02:00 PM'];

const AvailabilityDate = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('09:00 AM');
  return (
    <div className='flex flex-col gap-4'>
      <div className='space-y-0.5'>
        <p className='font-bold text-base leading-6'>Search ticket availability by date</p>
        <Button variant='link' className='text-[#009DC4] text-sm leading-5 p-0 justify-start h-auto cursor-pointer'>
          Show more dates
        </Button>
      </div>
      <div className='space-y-4'>
        {/* Date Selection */}
        <div className='grid grid-cols-4 gap-2 mb-4'>
          {availableDates.map((dateInfo, _idx) => (
            <Button
              key={_idx}
              variant={isSameDay(dateInfo.date, selectedDate || new Date()) ? 'outline' : 'ghost'}
              className={cn(
                'h-24 p-2 flex flex-col items-center justify-center cursor-pointer border-0 shadow-none bg-transparent',
                isSameDay(dateInfo.date, selectedDate || new Date()) &&
                  'border-[#009DC4] text-[#009DC4] rounded-[4px] border-2 shadow-sm '
              )}
              onClick={() => setSelectedDate(dateInfo.date)}
            >
              <span className='text-xs'>{dateInfo.day}</span>
              <span className='text-lg font-bold whitespace-pre-line'>{dateInfo.label}</span>
            </Button>
          ))}
        </div>
        {/* Time Selection */}
        <div className='space-y-2'>
          <p className='font-bold text-base leading-6'>Search ticket availability by date</p>
          <div className='grid grid-cols-2 gap-2'>
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={'outline'}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  selectedTime === time &&
                    'border-[#009DC4] bg-[#E6F5F9] text-[#009DC4] rounded-[4px] border-2 shadow-sm '
                )}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityDate;
