'use client';
import React from 'react';
import LocationDropDownField from '@/components/defaults/LocationDropDownField';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { carTabSchema, TCarTabSchema } from '@/lib/schemas/website/landing-page.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ConstantCountries as countries } from '@/lib/constants/continental.constant';
import MultiDatePickerField from '@/components/defaults/MultiDatePickerField';
import { TimePickerField } from '@/components/defaults/TimePickerField';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const CarTabSection = () => {
  const router = useRouter();
  const carTabForm = useForm<TCarTabSchema>({
    resolver: zodResolver(carTabSchema),
    defaultValues: {
      location: {
        pickupL: '',
        dropOffL: '',
      },
      rentalDate: [],
      rentalTime: {
        pickupT: '',
        dropoffT: '',
      },
    },
  });

  const { handleSubmit, control } = carTabForm;

  const handleCarRentalInit = (data: TCarTabSchema) => {
    //alert('Just Testing');
    //console.log(data);
    localStorage.setItem('serviceprofile', JSON.stringify(data));
    router.push('/car-rentals/profile');
  };
  return (
    <div className='booking-content'>
      <Card className='w-full p-0 border-none rounded-none shadow-none lg:border lg:rounded-xl lg:shadow-lg'>
        <Form {...carTabForm}>
          <form onSubmit={handleSubmit(handleCarRentalInit)}>
            <div className='flex flex-col items-start lg:flex-row lg:items-center gap-6 lg:h-24 lg:divide-x lg:divide-gray-300 w-full'>
              <div className='flex flex-col lg:flex-row items-start gap-1 w-full'>
                <LocationDropDownField<TCarTabSchema>
                  label='Pick up'
                  control={control}
                  name='location.pickupL'
                  locations={countries}
                />
                <LocationDropDownField<TCarTabSchema>
                  label='Drop off'
                  control={control}
                  name='location.dropOffL'
                  locations={countries}
                />
              </div>
              <MultiDatePickerField<TCarTabSchema>
                label='Dates'
                control={control}
                name='rentalDate'
                placeholder='Select Date...'
              />

              <div className='flex flex-col items-start lg:flex-row gap-8 w-full lg:w-fit'>
                <TimePickerField<TCarTabSchema>
                  control={control}
                  name='rentalTime.pickupT'
                  placeholder='Select Time...'
                  label='Pick-up time'
                />
                <TimePickerField<TCarTabSchema>
                  control={control}
                  name='rentalTime.dropoffT'
                  placeholder='Select Time...'
                  label='Drop-off time'
                />
              </div>
              <Button
                size='sm'
                className='mx-4 bg-[#E63A24] h-[2.3rem] hover:bg-red-700 text-gray-100 rounded-[4px] shadow-lg transform transition-all hover:scale-105 w-[80%] lg:w-fit'
                type='submit'
              >
                <Search className='w-5 h-5' />
                <span className='block lg:hidden'>Search</span>
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CarTabSection;
