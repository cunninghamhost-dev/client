'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LocationDropDownField from '@/components/defaults/LocationDropDownField';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { airportTabSchema, TAirportTabSchema } from '@/lib/schemas/website/landing-page.schema';
import { ConstantCountries as countries } from '@/lib/constants/continental.constant';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown, Minus, Plus } from 'lucide-react';
import { IoMdPerson } from 'react-icons/io';
import MultiDatePickerField from '@/components/defaults/MultiDatePickerField';
import { TimePickerField } from '@/components/defaults/TimePickerField';
import { useAirportTabStore } from '@/store/website/airports/airportuser.store';

const AirportTransitionForm = ({ isAirportFirst }: { isAirportFirst: boolean }) => {
  const router = useRouter();
  const { data, setField, reset } = useAirportTabStore();
  const airportHotelTabForm = useForm<TAirportTabSchema>({
    resolver: zodResolver(airportTabSchema),
    defaultValues: {
      locations: {
        airport: data.locations.airport,
        hotel: data.locations.hotel,
      },
      travellers: {
        adult: data.travellers.adult,
        children: data.travellers.children,
        infant: data.travellers.infant,
        totalTravelers: data.travellers.totalTravelers,
      },
      flightDepartureDate: data.flightDepartureDate,
      flightDepartureTime: data.flightDepartureTime,
    },
  });
  const { handleSubmit, control, setValue, watch } = airportHotelTabForm;

  const adultNumber = watch('travellers.adult');
  const childNumber = watch('travellers.children');
  const infantNumber = watch('travellers.infant');
  const totalTravelers = watch('travellers.totalTravelers');

  useEffect(() => {
    localStorage.removeItem('airport-tab-storage');
    reset();
  }, [reset]);

  const handleAdultUpdate = (isAddition: boolean) => {
    if (isAddition) {
      setValue('travellers.adult', adultNumber + 1);
      setValue('travellers.totalTravelers', totalTravelers + 1);
    } else {
      setValue('travellers.adult', adultNumber - 1);
      setValue('travellers.totalTravelers', totalTravelers - 1);
    }
  };

  const handleChildUpdate = (isAddition: boolean) => {
    if (isAddition) {
      setValue('travellers.children', childNumber + 1);
      setValue('travellers.totalTravelers', totalTravelers + 1);
    } else {
      setValue('travellers.children', childNumber - 1);
      setValue('travellers.totalTravelers', totalTravelers - 1);
    }
  };

  const handleInfantUpdate = (isAddition: boolean) => {
    if (isAddition) {
      setValue('travellers.infant', childNumber + 1);
      setValue('travellers.totalTravelers', totalTravelers + 1);
    } else {
      setValue('travellers.infant', childNumber - 1);
      setValue('travellers.totalTravelers', totalTravelers - 1);
    }
  };

  const handleAirportInit = (data: TAirportTabSchema) => {
    console.log(data);
    setField('locations', data.locations);
    setField('travellers', data.travellers);
    setField('flightDepartureDate', data.flightDepartureDate);
    setField('flightDepartureTime', data.flightDepartureTime);
    router.push('/airport-transfer/profile');
  };
  return (
    <Form {...airportHotelTabForm}>
      <form onSubmit={handleSubmit(handleAirportInit)}>
        <div className='px-4 flex flex-col gap-4'>
          <Card className='w-full p-0 shadow-none rounded-none'>
            {isAirportFirst ? (
              <div className='flex items-center h-auto divide-x divide-gray-300'>
                <LocationDropDownField<TAirportTabSchema>
                  label='Airport'
                  control={control}
                  name='locations.airport'
                  locations={countries}
                  className='lg:w-[50%]'
                />
                <LocationDropDownField<TAirportTabSchema>
                  label='Hotel'
                  control={control}
                  name='locations.hotel'
                  locations={countries}
                  className='lg:w-[50%]'
                />
              </div>
            ) : (
              <div className='flex items-center h-auto divide-x divide-gray-300'>
                <LocationDropDownField<TAirportTabSchema>
                  label='Hotel'
                  control={control}
                  name='locations.hotel'
                  locations={countries}
                  className='lg:w-[50%]'
                />
                <LocationDropDownField<TAirportTabSchema>
                  label='Airport'
                  control={control}
                  name='locations.airport'
                  locations={countries}
                  className='lg:w-[50%]'
                />
              </div>
            )}
          </Card>
          <Card className='w-full p-0 shadow-none rounded-none'>
            <div className='flex items-center h-auto divide-x divide-gray-300'>
              <FormField
                control={control}
                name='travellers'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'ghost'}
                            className='w-full overflow-x-hidden justify-start text-left font-normal h-auto shadow-none hover:bg-gray-50'
                          >
                            <IoMdPerson className='mr-2 h-4 w-4' />
                            <div className='flex flex-col w-full'>
                              <span className='mx-1 text-xs font-medium text-gray-500'>Travelers</span>
                              <div className='flex items-center box-border cursor-pointer text-sm h-auto leading-10 rounded px-0 py-0'>
                                {field.value.totalTravelers > 0 ? (
                                  <span className='w-full overflow-hidden whitespace-nowrap font-normal text-[#051a37] text-base'>
                                    {`${field.value.totalTravelers} Travelers`}
                                  </span>
                                ) : (
                                  <span className='font-medium text-gray-600 text-base'>Select Profile...</span>
                                )}
                              </div>
                            </div>
                            <ChevronDown className='ml-2 h-4 w-4' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-[220px] flex items-center justify-center overflow-hidden p-0'>
                          <div className='w-full flex flex-col gap-4 px-4 py-6'>
                            <div className='flex items-center justify-center space-x-2'>
                              <Button
                                variant='outline'
                                size='icon'
                                className='h-6 w-6 shrink-0 rounded-full text-gray-600 disabled:text-gray-400 cursor-pointer disabled:cursor-default'
                                onClick={() => handleAdultUpdate(false)}
                                disabled={adultNumber <= 0}
                              >
                                <Minus />
                                <span className='sr-only'>Decrease Adult</span>
                              </Button>
                              <div className='flex-1 text-center'>
                                <div className='text-lg font-bold tracking-tighter'>{adultNumber}</div>
                                <div className='text-gray-500 text-[10px] uppercase'>Adults</div>
                              </div>
                              <Button
                                variant='outline'
                                size='icon'
                                className='h-6 w-6 shrink-0 rounded-full text-gray-600 disabled:text-gray-400 cursor-pointer disabled:cursor-default'
                                onClick={() => handleAdultUpdate(true)}
                                disabled={adultNumber >= 50}
                              >
                                <Plus />
                                <span className='sr-only'>Increase Adult</span>
                              </Button>
                            </div>
                            <div className='flex items-center justify-center space-x-2'>
                              <Button
                                variant='outline'
                                size='icon'
                                className='h-6 w-6 shrink-0 rounded-full text-gray-600 disabled:text-gray-400 cursor-pointer disabled:cursor-default'
                                onClick={() => handleChildUpdate(false)}
                                disabled={childNumber <= 0}
                              >
                                <Minus />
                                <span className='sr-only'>Decrease Child</span>
                              </Button>
                              <div className='flex-1 text-center'>
                                <div className='text-lg font-bold tracking-tighter'>{childNumber}</div>
                                <div className='text-gray-500 text-[10px] uppercase'>
                                  {childNumber > 1 ? 'Children' : 'Child'}
                                </div>
                              </div>
                              <Button
                                variant='outline'
                                size='icon'
                                className='h-6 w-6 shrink-0 rounded-full text-gray-600 disabled:text-gray-400 cursor-pointer disabled:cursor-default'
                                onClick={() => handleChildUpdate(true)}
                                disabled={childNumber >= 50}
                              >
                                <Plus />
                                <span className='sr-only'>Increase Child</span>
                              </Button>
                            </div>
                            <div className='flex items-center justify-center space-x-2'>
                              <Button
                                variant='outline'
                                size='icon'
                                className='h-6 w-6 shrink-0 rounded-full text-gray-600 disabled:text-gray-400 cursor-pointer disabled:cursor-default'
                                onClick={() => handleInfantUpdate(false)}
                                disabled={infantNumber <= 0}
                              >
                                <Minus />
                                <span className='sr-only'>Decrease Infant</span>
                              </Button>
                              <div className='flex-1 text-center'>
                                <div className='text-lg font-bold tracking-tighter'>{infantNumber}</div>
                                <div className='text-gray-500 text-[10px] uppercase'>
                                  {infantNumber > 1 ? 'Infant' : 'Infant'}
                                </div>
                              </div>
                              <Button
                                variant='outline'
                                size='icon'
                                className='h-6 w-6 shrink-0 rounded-full text-gray-600 disabled:text-gray-400 cursor-pointer disabled:cursor-default'
                                onClick={() => handleInfantUpdate(true)}
                                disabled={infantNumber >= 50}
                              >
                                <Plus />
                                <span className='sr-only'>Increase Infant</span>
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <MultiDatePickerField<TAirportTabSchema>
                label='Dates'
                control={control}
                name='flightDepartureDate'
                placeholder='Select flight date...'
              />
              <TimePickerField<TAirportTabSchema>
                control={control}
                name='flightDepartureTime'
                placeholder='Select Time...'
                label='Pick-up time'
              />
            </div>
          </Card>
          <Button
            className='w-fit bg-[#E63A24] h-[2.3rem] hover:bg-red-700 text-gray-100 rounded-[4px] shadow-lg transform transition-all hover:scale-105 cursor-pointer'
            type='submit'
          >
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AirportTransitionForm;
