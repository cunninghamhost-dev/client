'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';

interface BookingFormData {
  searchText: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: string;
}

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    searchText: '',
    checkIn: undefined,
    checkOut: undefined,
    guests: '',
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleInputChange = (value: string) => {
    setFormData((prev) => ({ ...prev, searchText: value }));
  };

  const handleCheckInChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, checkIn: date }));
  };

  // const handleCheckOutChange = (date: Date | undefined) => {
  //   setFormData((prev) => ({ ...prev, checkOut: date }));
  // };

  const handleGuestsChange = (value: string) => {
    setFormData((prev) => ({ ...prev, guests: value }));
  };

  return (
    <Card className='w-full p-0 shadow-lg'>
      <div className='flex items-center h-16 divide-x divide-gray-200'>
        {/* Search Input */}
        <div className='flex-1 px-6'>
          <Input
            type='text'
            placeholder='Where are you going?'
            value={formData.searchText}
            onChange={(e) => handleInputChange(e.target.value)}
            className='border-0 shadow-none focus-visible:ring-0 text-sm'
          />
        </div>

        {/* Check In Calendar */}
        <div className='px-6'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                className='w-[140px] justify-start text-left font-normal p-0 h-auto shadow-none hover:bg-transparent'
              >
                <div className='flex flex-col'>
                  <span className='text-xs font-medium text-gray-500 uppercase'>Check In</span>
                  <span className='text-sm'>
                    {formData.checkIn
                      ? formData.checkIn.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      : 'Add date'}
                  </span>
                </div>
                <Calendar className='ml-2 h-4 w-4' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={formData.checkIn}
                onSelect={handleCheckInChange}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check Out Calendar */}
        <div className='px-6'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                className='w-[140px] justify-start text-left font-normal p-0 h-auto shadow-none hover:bg-transparent'
              >
                <div className='flex flex-col'>
                  <span className='text-xs font-medium text-gray-500 uppercase'>Check Out</span>
                  <span className='text-sm'>
                    {formData.checkOut
                      ? formData.checkOut.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      : 'Add date'}
                  </span>
                </div>
                <CalendarIcon className='ml-2 h-4 w-4' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              {/* <Calendar
                mode='single'
                selected={formData.checkOut}
                onSelect={handleCheckOutChange}
                disabled={(date) => date < new Date() || (formData.checkIn && date <= formData.checkIn)}
              /> */}
            </PopoverContent>
          </Popover>
        </div>

        {/* Select Control */}
        <div className='px-6'>
          <div className='flex flex-col'>
            <span className='text-xs font-medium text-gray-500 uppercase mb-1'>Guests</span>
            <Select value={formData.guests} onValueChange={handleGuestsChange}>
              <SelectTrigger className='w-[120px] border-0 shadow-none focus:ring-0 p-0 h-auto'>
                <SelectValue placeholder='Add guests' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>1 guest</SelectItem>
                <SelectItem value='2'>2 guests</SelectItem>
                <SelectItem value='3'>3 guests</SelectItem>
                <SelectItem value='4'>4 guests</SelectItem>
                <SelectItem value='5'>5+ guests</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit Button */}
        <div className='px-6'>
          <Button onClick={handleSubmit} className='bg-red-500 hover:bg-red-600 text-white px-8'>
            Search
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BookingForm;
