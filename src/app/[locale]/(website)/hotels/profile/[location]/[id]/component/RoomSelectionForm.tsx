'use client';
import DatePickerField from '@/components/defaults/DatePickerField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { roomSelectionFormSchema, RoomSelectionFormSchema } from '@/lib/schemas/website/hotel-page.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronDown, Minus, Plus, Search } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaRegUser } from 'react-icons/fa6';
import { TbArrowAutofitWidth } from 'react-icons/tb';
import { FiUser } from 'react-icons/fi';
import { FaBed } from 'react-icons/fa';
import { Wifi } from 'lucide-react';
import { LuInfo } from 'react-icons/lu';
import { IoIosArrowForward } from 'react-icons/io';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface IExtrasProps {
  name: string;
  amount: string;
}
interface IReviewProps {
  rating: number;
  reviewStatement: string;
  numberOfReview: number;
}
interface IAmenitiesProps {
  sqFeet: string;
  availableSleeps: string;
  availableBed: string;
  isWifiAvailable: boolean;
  isFreeWater: boolean;
  isPartiallyRefundable: boolean;
}
interface IHotelExtrasProps {
  extrasProfile: IExtrasProps[];
  amountOff?: string;
  nightlyAmount: string;
  nightlyAmountOff?: string;
  totalAmount: string;
}
interface IRoomProfileSelectProps {
  hotelName: string;
  imgSrc: string;
  reviewProfile?: IReviewProps;
  amenitiesProvided: IAmenitiesProps;
  extras?: IHotelExtrasProps;
}

const roomProfileConstant: IRoomProfileSelectProps[] = [
  {
    hotelName: 'Twin Room, Non Smoking',
    imgSrc: '/images/main/home/twinroom_nosmoking.png',
    reviewProfile: {
      rating: 10,
      reviewStatement: 'Exceptional',
      numberOfReview: 1,
    },
    amenitiesProvided: {
      sqFeet: '140 sq ft',
      availableSleeps: 'Sleeps 2',
      availableBed: '2 Twin Beds',
      isWifiAvailable: true,
      isFreeWater: false,
      isPartiallyRefundable: true,
    },
    extras: {
      extrasProfile: [
        {
          name: 'No extras',
          amount: '$0',
        },
        {
          name: 'Breakfast',
          amount: '$29',
        },
      ],
      amountOff: '$30',
      nightlyAmount: '$125',
      nightlyAmountOff: '$480',
      totalAmount: '$449',
    },
  },
  {
    hotelName: 'Comfort Double Room, Non Smoking',
    imgSrc: '/images/main/home/bedroom_desk.png',
    amenitiesProvided: {
      sqFeet: '140 sq ft',
      availableSleeps: 'Sleeps 2',
      availableBed: '1 Double Bed',
      isWifiAvailable: true,
      isFreeWater: true,
      isPartiallyRefundable: true,
    },
    extras: {
      extrasProfile: [
        {
          name: 'No extras',
          amount: '$0',
        },
        {
          name: 'Breakfast',
          amount: '$29',
        },
      ],
      amountOff: '$30',
      nightlyAmount: '$140',
      nightlyAmountOff: '$480',
      totalAmount: '$449',
    },
  },
  {
    hotelName: 'Quadruple Room, Non Smoking',
    imgSrc: '/images/main/home/quadraple_room.png',
    amenitiesProvided: {
      sqFeet: '172 sq ft',
      availableSleeps: 'Sleeps 4',
      availableBed: '1 Double Bed and 2 Twin Beds',
      isWifiAvailable: true,
      isFreeWater: false,
      isPartiallyRefundable: true,
    },
    extras: {
      extrasProfile: [
        {
          name: 'No extras',
          amount: '$0',
        },
        {
          name: 'Breakfast',
          amount: '$32',
        },
      ],
      nightlyAmount: '$172',
      totalAmount: '$609',
    },
  },
  {
    hotelName: 'Double Room, Non Smoking',
    imgSrc: '/images/main/home/bedroom_desk.png',
    amenitiesProvided: {
      sqFeet: '140 sq ft',
      availableSleeps: 'Sleeps 2',
      availableBed: '1 Double Bed',
      isWifiAvailable: true,
      isFreeWater: false,
      isPartiallyRefundable: true,
    },
    extras: {
      extrasProfile: [
        {
          name: 'No extras',
          amount: '$0',
        },
        {
          name: 'Breakfast',
          amount: '$29',
        },
      ],
      amountOff: '$32',
      nightlyAmount: '$130',
      nightlyAmountOff: '$498',
      totalAmount: '$466',
    },
  },
  {
    hotelName: 'Triple Room, Non Smoking',
    imgSrc: '/images/main/home/triple_room.png',
    amenitiesProvided: {
      sqFeet: '172 sq ft',
      availableSleeps: 'Sleeps 3',
      availableBed: '1 Double Bed and 1 Twin Bed',
      isWifiAvailable: true,
      isFreeWater: false,
      isPartiallyRefundable: false,
    },
  },
  {
    hotelName: 'Double Room, Mobility Accessibility, Non',
    imgSrc: '/images/main/home/double_room.png',
    amenitiesProvided: {
      sqFeet: '172 sq ft',
      availableSleeps: 'Sleeps 2',
      availableBed: '1 Double Bed',
      isWifiAvailable: true,
      isFreeWater: false,
      isPartiallyRefundable: false,
    },
  },
];

const RoomSelectionForm = () => {
  const roomSelectionForm = useForm<RoomSelectionFormSchema>({
    resolver: zodResolver(roomSelectionFormSchema),
    defaultValues: {
      lodgingStartDate: undefined,
      lodgingEndDate: undefined,
      guestNumbers: {
        room: 0,
        travellers: 0,
      },
    },
  });

  const { handleSubmit, control, setValue, watch } = roomSelectionForm;

  const roomNumber = watch('guestNumbers.room');
  const travelersNumber = watch('guestNumbers.travellers');

  const handleRoomUpdate = (isAddition: boolean) => {
    if (isAddition) setValue('guestNumbers.room', roomNumber + 1);
    else setValue('guestNumbers.room', roomNumber - 1);
  };

  const handleTravellersUpdate = (isAddition: boolean) => {
    if (isAddition) setValue('guestNumbers.travellers', travelersNumber + 1);
    else setValue('guestNumbers.travellers', travelersNumber - 1);
  };

  const handleHotelHomeInit = (data: RoomSelectionFormSchema) => {
    console.log(data);
  };

  return (
    <div className='booking-content flex flex-col gap-4 text-[#191E3B]'>
      <Card className='w-full px-4 shadow-lg gap-4'>
        <CardTitle>
          <h2 className='font-light text-xl md:text-2xl leading-8'>Choose your room</h2>
        </CardTitle>
        <CardContent>
          <Form {...roomSelectionForm}>
            <form onSubmit={handleSubmit(handleHotelHomeInit)}>
              <div className='flex flex-col gap-1'>
                <div className=' grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <DatePickerField<RoomSelectionFormSchema>
                    label='Start Date'
                    placeholder='Select Date...'
                    control={control}
                    name='lodgingStartDate'
                  />
                  <DatePickerField<RoomSelectionFormSchema>
                    label='End Date'
                    placeholder='Select Date...'
                    control={control}
                    name='lodgingEndDate'
                  />
                  <FormField
                    control={control}
                    name='guestNumbers'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='px-4 mt-2'>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={'outline'}
                                  className='w-full flex overflow-x-hidden justify-between text-left font-normal p-0 border-gray-800 h-auto shadow-none hover:bg-gray-50'
                                >
                                  <div className='flex items-start gap-2'>
                                    <FaRegUser size={64} className='mt-4' />
                                    <div className='flex flex-col p-2'>
                                      <span className='text-xs font-medium text-gray-500'>Traveler Profile</span>
                                      <div className='flex items-center box-border cursor-pointer leading-4 rounded px-1 py-0'>
                                        {field.value.room > 0 || field.value.travellers > 0 ? (
                                          <span className='w-full overflow-hidden whitespace-nowrap font-normal text-[#051a37] text-sm'>
                                            {`${field.value.room} room . ${field.value.travellers} traveler`}
                                          </span>
                                        ) : (
                                          <span className='font-medium text-gray-600 text-sm'>
                                            Select Guest Profile...
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <ChevronDown className='ml-2 h-4 w-4' />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className='w-full flex items-center justify-center overflow-hidden p-0'
                                align='start'
                              >
                                <div className='w-full flex flex-col gap-4 px-4 py-6'>
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
                                        {field.value.room > 1 ? 'Rooms' : 'room'}
                                      </div>
                                    </div>
                                    <Button
                                      variant='outline'
                                      size='icon'
                                      className='h-8 w-8 shrink-0 rounded-full text-gray-600 disabled:text-gray-300 cursor-pointer disabled:cursor-default'
                                      // onClick={() =>
                                      //   setValue('guestNumbers.adult', alert(""), { shouldValidate: true })
                                      // }
                                      onClick={() => handleRoomUpdate(true)}
                                      disabled={roomNumber >= 50}
                                    >
                                      <Plus />
                                      <span className='sr-only'>Increase Room</span>
                                    </Button>
                                  </div>
                                  <div className='flex items-center justify-center space-x-2'>
                                    <Button
                                      variant='outline'
                                      size='icon'
                                      className='h-8 w-8 shrink-0 rounded-full text-gray-600 disabled:text-gray-400 cursor-pointer disabled:cursor-default'
                                      onClick={() => handleTravellersUpdate(false)}
                                      disabled={travelersNumber <= 0}
                                    >
                                      <Minus />
                                      <span className='sr-only'>Reduce Child</span>
                                    </Button>
                                    <div className='flex-1 text-center'>
                                      <div className='text-xl font-bold tracking-tighter'>{travelersNumber}</div>
                                      <div className='text-gray-500 text-xs uppercase'>
                                        {field.value.travellers > 1 ? 'Travellers' : 'Travller'}
                                      </div>
                                    </div>
                                    <Button
                                      variant='outline'
                                      size='icon'
                                      className='h-8 w-8 shrink-0 rounded-full text-gray-600 disabled:text-gray-300 cursor-pointer disabled:cursor-default'
                                      onClick={() => handleTravellersUpdate(true)}
                                      disabled={travelersNumber >= 50}
                                    >
                                      <Plus />
                                      <span className='sr-only'>Increase Traveller</span>
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
                </div>
                <div className='flex items-start gap-2 w-full text-sm leading-4 text-[#666666]'>
                  <Button variant={'outline'} className='border-2 rounded-4xl border-gray-800 bg-slate-100'>
                    All rooms
                  </Button>
                  <Button variant={'outline'} className='rounded-4xl border-gray-700'>
                    1 bed
                  </Button>
                  <Button variant={'outline'} className='rounded-4xl border-gray-700'>
                    2 bed
                  </Button>
                  <Button variant={'outline'} className='rounded-4xl border-gray-700'>
                    3+ bed
                  </Button>
                </div>
                <div className='mt-5 flex items-center justify-center w-full'>
                  <Button
                    size='sm'
                    className='bg-[#E63A24] h-[2.3rem] hover:bg-red-700 text-gray-100 rounded-[4px] shadow-lg transform transition-all hover:scale-105'
                    type='submit'
                  >
                    <span>Search Profile</span> <Search className='w-5 h-5' />
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {roomProfileConstant && roomProfileConstant.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
          {roomProfileConstant.map((item) => (
            <RoomProfileCard key={item.hotelName} profile={item} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const RoomProfileCard = ({ profile }: { profile: IRoomProfileSelectProps }) => {
  return (
    <Card className='p-0'>
      <CardTitle className='p-0'>
        {/* Image Display section */}
        <div className='w-full'>
          <Image src={profile.imgSrc} alt='Rooms' width={368.41} height={207.21} quality={95} />
        </div>
      </CardTitle>
      <CardContent className='mb-4 px-4'>
        <div className='flex flex-col gap-4'>
          <div className='block space-y-4 text-[#191E3B]'>
            <h4 className='text-base leading-5'>{profile.hotelName}</h4>
            {profile.reviewProfile && (
              <div className='w-full inline-flex gap-2'>
                <div className='flex item-center justify-center w-fit rounded-2xl rounded-tr-none shadow-2xl bg-[#009DC4] py-3 px-4'>
                  <span className='text-xs leading-4 text-white'>{`${profile.reviewProfile.rating}/10`}</span>
                </div>
                <div className='block space-x-0.5'>
                  <h4 className='text-sm leading-5'>{profile.reviewProfile.reviewStatement}</h4>
                  <span className='text-xs leading-4'>{`${profile.reviewProfile.numberOfReview} reviews`}</span>
                </div>
              </div>
            )}
            <div className='flex flex-col gap-2'>
              {profile.amenitiesProvided.sqFeet && (
                <div className='inline-flex space-x-1'>
                  <TbArrowAutofitWidth size={18} />
                  <span className='text-sm leading-5'>{`${profile.amenitiesProvided.sqFeet}`}</span>
                </div>
              )}
              {profile.amenitiesProvided.availableSleeps && (
                <div className='inline-flex space-x-1'>
                  <FiUser size={18} />
                  <span className='text-sm leading-5'>{`${profile.amenitiesProvided.availableSleeps}`}</span>
                </div>
              )}
              {profile.amenitiesProvided.availableBed && (
                <div className='inline-flex space-x-1'>
                  <FaBed size={18} />
                  <span className='text-sm leading-5'>{`${profile.amenitiesProvided.availableBed} Twin Beds`}</span>
                </div>
              )}
              {profile.amenitiesProvided.isWifiAvailable && (
                <div className='inline-flex space-x-1'>
                  <Wifi size={18} />
                  <span className='text-sm leading-5'>Free Wifi</span>
                </div>
              )}
              {profile.amenitiesProvided.isFreeWater && (
                <div className='mt-3 w-[60%] bg-[#EFF3F7] py-5 rounded-2xl shadow-md flex flex-col items-center justify-center'>
                  <Check />
                  <span className='text-sm leading-4'>Free bottled water</span>
                </div>
              )}
              {profile.amenitiesProvided.isPartiallyRefundable && (
                <div className='inline-flex space-x-1'>
                  <span>Partially refundable</span>
                  <LuInfo />
                </div>
              )}
            </div>
            <Button variant={'link'}>
              <div className='w-full inline-flex gap-3 text-[#009DC4] hover:text-[#0083a3] cursor-pointer'>
                <h5 className='text-[15px] leading-5 '>More details</h5>
                <IoIosArrowForward className='mt-[0.2rem]' />
              </div>
            </Button>
          </div>
          <div className='relative h-[310px]'>
            {profile.extras && profile.extras.extrasProfile.length > 0 ? (
              <div className='flex flex-col gap-3'>
                <Separator />
                <div className='grid grid-cols-3 gap-2'>
                  <div className='col-span-2 flex flex-col gap-3'>
                    <h4 className='text-[15px] leading-5'>Extras</h4>
                    <div className='flex flex-col gap-1'>
                      <RadioGroup defaultValue='No extras' className='space-y-2 mt-2'>
                        {profile.extras.extrasProfile.map(({ name }, index) => (
                          <div key={name} className='flex items-center space-x-2'>
                            <RadioGroupItem
                              id={`${name}-${index}`}
                              value={name}
                              className='border-gray-400 hover:bg-gray-100 data-[state=checked]:bg-green-600 data-[state=checked]:text-white'
                            />
                            <Label className='text-sm leading-4' htmlFor={`${name}-${index}`}>
                              {name}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  <div className='flex flex-col gap-3 items-end'>
                    <h4 className='text-[0.836rem] leading-5'>per night</h4>
                    <div className='flex flex-col gap-2 text-[0.975rem] leading-4 items-end'>
                      {profile.extras.extrasProfile.map(({ amount }, index) => (
                        <div key={index} className='mt-2 inline-flex space-x-1'>
                          <span>+</span>
                          <span>{amount}</span>
                        </div>
                      ))}
                      {profile.extras.amountOff && (
                        <div className='mt-1 flex item-center rounded-sm bg-[#227950] text-white w-fit p-2'>
                          <span>{`${profile.extras.amountOff} off`}</span>
                        </div>
                      )}
                      <div className='mt-2 inline-flex items-end space-x-1'>
                        <span className=' underline'>{`${profile.extras.nightlyAmount} nightly`}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex items-end justify-end space-x-2'>
                  {profile.extras.nightlyAmountOff && (
                    <span className=' line-through text-xs'>{profile.extras.nightlyAmountOff}</span>
                  )}
                  <span>{`${profile.extras.totalAmount} total`}</span>
                </div>
                <div className='flex items-center justify-between gap-1 text-[0.656rem] leading-[13.37px]'>
                  <span className='text-[#A7183C] text-right'>We have 3 left</span>
                  <div className='inline-flex space-x-0.5 text-[#227950]'>
                    <Check size={12} />
                    <span>Total includes taxes and fees</span>
                  </div>
                </div>
                <div className='flex items-center justify-center w-full'>
                  <Button variant={'outline'} className='border-[#B02D1C] text-[#B02D1C] font-bold text-sm'>
                    Reserve
                  </Button>
                </div>
                <div className='flex items-center justify-center w-full'>
                  <span className='text-[0.736rem] leading-[13.37px]'>You will not be charged yet</span>
                </div>
              </div>
            ) : (
              <div className='absolute bottom-0 right-2'>
                <span className='text-sm leading-4 text-[#B02D1C]'>We are sold out</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomSelectionForm;
