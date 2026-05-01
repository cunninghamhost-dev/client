'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, ChevronDown, Minus, Plus, X, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { ConstantCountries as countries } from '@/lib/constants/continental.constant';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { differenceInCalendarDays } from 'date-fns';
import DatePickerField from '@/components/defaults/DatePickerField';

const bookingFormSchema = z.object({
  destinationSearch: z.string(),
  dateProfile: z.object({
    checkIn: z.date(),
    checkout: z.date(),
  }),
  guestNumbers: z.object({
    adult: z.number(),
    child: z.number(),
    room: z.number(),
  }),
});

type TBookingFormSchema = z.infer<typeof bookingFormSchema>;

const HotelHomes = () => {
  const [openDestination, setOpenDestination] = useState(false);
  const router = useRouter();

  const grouped = countries.reduce((acc: Record<string, string[]>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item.countryName);
    return acc;
  }, {});

  const continents = Object.keys(grouped);

  const bookingForm = useForm<TBookingFormSchema>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      destinationSearch: '',
      dateProfile: { checkIn: undefined, checkout: undefined },
      guestNumbers: { adult: 0, child: 0, room: 0 },
    },
  });

  const { handleSubmit, control, setValue, watch } = bookingForm;

  const adultNumber = watch('guestNumbers.adult');
  const childNumber = watch('guestNumbers.child');
  const roomNumber = watch('guestNumbers.room');
  const checkInDate = watch('dateProfile.checkIn');
  const checkoutDate = watch('dateProfile.checkout');

  const handleAdultUpdate = (isAddition: boolean) => {
    if (isAddition) setValue('guestNumbers.adult', adultNumber + 1);
    else setValue('guestNumbers.adult', adultNumber - 1);
  };

  const handleChildUpdate = (isAddition: boolean) => {
    if (isAddition) setValue('guestNumbers.child', childNumber + 1);
    else setValue('guestNumbers.child', childNumber - 1);
  };
  const handleRoomUpdate = (isAddition: boolean) => {
    if (isAddition) setValue('guestNumbers.room', roomNumber + 1);
    else setValue('guestNumbers.room', roomNumber - 1);
  };

  const handleHotelHomeInit = (data: TBookingFormSchema) => {
    localStorage.setItem('serviceprofile', JSON.stringify(data));
    router.push('/hotels/profile');
  };

  return (
    <div className='booking-content'>
      <Card className='w-full p-0 border-none rounded-none shadow-none lg:border lg:rounded-[8px] lg:shadow-lg'>
        <Form {...bookingForm}>
          <form onSubmit={handleSubmit(handleHotelHomeInit)}>
            <div className='flex flex-col items-start lg:flex-row lg:items-center gap-6 lg:h-24 lg:divide-x lg:divide-gray-300 w-full'>
              <FormField
                control={control}
                name='destinationSearch'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            role='combobox'
                            aria-expanded={openDestination}
                            variant='ghost'
                            className='flex-initial flex w-full lg:w-[220px] justify-start text-left p-0 h-auto shadow-none hover:bg-gray-50 cursor-pointer'
                          >
                            <div className='flex-1 flex flex-col'>
                              <div className='flex items-center gap-2 box-border cursor-pointer text-sm h-12 leading-10 rounded px-4 py-0'>
                                <MapPin className='hidden lg:flex lg:mr-2 size-5' />
                                {countries && field.value ? (
                                  <div className='flex items-start justify-between gap-4 text-ellipsis bg-gray-100 px-4 w-full overflow-hidden whitespace-nowrap font-normal text-[#051a37]'>
                                    {countries.find((country) => country.countryName === field.value)?.countryName}
                                    <div
                                      onClick={() => setValue('destinationSearch', '')}
                                      className='mt-2 rounded-full p-1 bg-gray-300 cursor-pointer hover:bg-gray-400'
                                    >
                                      <X />
                                    </div>
                                  </div>
                                ) : (
                                  <span className='font-medium text-gray-400 text-sm lg:text-xs'>
                                    Where are you going?
                                  </span>
                                )}
                              </div>
                            </div>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-full p-0 overflow-hidden'>
                          <Command>
                            <CommandInput placeholder='Select Location...' className='h-9' />
                            <CommandList>
                              {continents.map((continent, index) => (
                                <CommandGroup className='px-4 py-2' key={index} heading={continent}>
                                  <div className=' box-border w-full pt-2 rounded-br-lg rounded-bl-lg'>
                                    <div className='box-border h-full overflow-x-hidden overflow-y-auto pt-0 pb-4 px-4'>
                                      <div className='grid grid-cols-[repeat(1,80px)] lg:grid-cols-[repeat(3,150px)]'>
                                        {grouped[continent].map((country, index) => (
                                          <CommandItem
                                            key={index}
                                            value={country}
                                            onSelect={(currentValue) => {
                                              setValue(
                                                'destinationSearch',
                                                currentValue === field.value ? '' : currentValue
                                              );
                                              setOpenDestination(false);
                                            }}
                                          >
                                            {country}
                                          </CommandItem>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </CommandGroup>
                              ))}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <div className='flex flex-col gap-2 lg:gap-0 lg:flex-row items-start w-full'>
                {/* Result */}
                <DatePickerField<TBookingFormSchema>
                  name='dateProfile.checkIn'
                  label='Check In'
                  control={control}
                  placeholder='Select Date...'
                />
                <div className='hidden lg:block text-sm font-normal italic text-center'>
                  {checkInDate && checkoutDate
                    ? `${differenceInCalendarDays(checkInDate, checkoutDate)} night(s)-`
                    : 'Select dates'}
                </div>
                <DatePickerField<TBookingFormSchema>
                  name='dateProfile.checkout'
                  label='Check Out'
                  control={control}
                  placeholder='Select Date...'
                />
              </div>
              <FormField
                control={control}
                name='guestNumbers'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className='lg:px-4'>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={'ghost'}
                              className='w-full lg:w-[220px] flex justify-between overflow-x-hidden border-0 border-b-2 rounded-none lg:border-b-0 text-left font-normal p-0 h-auto shadow-none hover:bg-gray-50'
                            >
                              <div className='flex-1 flex flex-col'>
                                <span className='mx-1 text-sm lg:text-xs font-medium text-gray-500 uppercase'>
                                  Guest Profile
                                </span>
                                <div className='flex items-center box-border cursor-pointer text-sm h-12 leading-10 rounded px-0 py-0'>
                                  {field.value.adult > 0 || field.value.child > 0 || field.value.room > 0 ? (
                                    <span className='w-full overflow-hidden whitespace-nowrap font-normal text-[#051a37] text-sm lg:text-[10px]'>
                                      {`${field.value.adult} adults . ${field.value.child} children. ${field.value.room} room`}
                                    </span>
                                  ) : (
                                    <span className='font-medium text-gray-600 text-xs'>Select Profile...</span>
                                  )}
                                </div>
                              </div>
                              <ChevronDown className='ml-2 h-4 w-4' />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className='w-[220px] flex items-center justify-center overflow-hidden p-0'
                            align='start'
                          >
                            <div className='w-full flex flex-col gap-4 px-4 py-6'>
                              <div className='flex items-center justify-center space-x-2'>
                                <Button
                                  variant='outline'
                                  size='icon'
                                  className='h-8 w-8 shrink-0 rounded-full text-gray-600 disabled:text-gray-400 cursor-pointer disabled:cursor-default'
                                  onClick={() => handleAdultUpdate(false)}
                                  disabled={adultNumber <= 0}
                                >
                                  <Minus />
                                  <span className='sr-only'>Reduce Adult</span>
                                </Button>
                                <div className='flex-1 text-center'>
                                  <div className='text-xl font-bold tracking-tighter'>{adultNumber}</div>
                                  <div className='text-gray-500 text-xs uppercase'>
                                    {field.value.adult > 1 ? 'Adults' : 'Adult'}
                                  </div>
                                </div>
                                <Button
                                  variant='outline'
                                  size='icon'
                                  className='h-8 w-8 shrink-0 rounded-full text-gray-600 disabled:text-gray-300 cursor-pointer disabled:cursor-default'
                                  // onClick={() =>
                                  //   setValue('guestNumbers.adult', alert(""), { shouldValidate: true })
                                  // }
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
                                  className='h-8 w-8 shrink-0 rounded-full text-gray-600 disabled:text-gray-400 cursor-pointer disabled:cursor-default'
                                  onClick={() => handleChildUpdate(false)}
                                  disabled={childNumber <= 0}
                                >
                                  <Minus />
                                  <span className='sr-only'>Reduce Child</span>
                                </Button>
                                <div className='flex-1 text-center'>
                                  <div className='text-xl font-bold tracking-tighter'>{childNumber}</div>
                                  <div className='text-gray-500 text-xs uppercase'>
                                    {field.value.child > 1 ? 'Children' : 'Child'}
                                  </div>
                                </div>
                                <Button
                                  variant='outline'
                                  size='icon'
                                  className='h-8 w-8 shrink-0 rounded-full text-gray-600 disabled:text-gray-300 cursor-pointer disabled:cursor-default'
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
                                  className='h-8 w-8 shrink-0 rounded-full text-gray-600 disabled:text-gray-400 cursor-pointer disabled:cursor-default'
                                  onClick={() => handleRoomUpdate(false)}
                                  disabled={roomNumber <= 0}
                                >
                                  <Minus />
                                  <span className='sr-only'>Reduce Room</span>
                                </Button>
                                <div className='flex-1 text-center'>
                                  <div className='text-xl font-bold tracking-tighter'>{roomNumber}</div>
                                  <div className='text-gray-500 text-xs uppercase'>
                                    {field.value.room > 1 ? 'Rooms' : 'Room'}
                                  </div>
                                </div>
                                <Button
                                  variant='outline'
                                  size='icon'
                                  className='h-8 w-8 shrink-0 rounded-full text-gray-600 disabled:text-gray-300 cursor-pointer disabled:cursor-default'
                                  onClick={() => handleRoomUpdate(true)}
                                  disabled={roomNumber >= 50}
                                >
                                  <Plus />
                                  <span className='sr-only'>Increase Room</span>
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
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

export default HotelHomes;
