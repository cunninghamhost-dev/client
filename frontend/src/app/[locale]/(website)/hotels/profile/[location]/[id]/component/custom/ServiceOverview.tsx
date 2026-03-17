import StarRating from '@/components/defaults/StarRating';
import { Check } from 'lucide-react';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { TbParking } from 'react-icons/tb';
import { MdStorefront } from 'react-icons/md';
import { TbAirConditioning } from 'react-icons/tb';
import { MdOutlinePets } from 'react-icons/md';
import { MdOutlineFreeBreakfast } from 'react-icons/md';
import { IoWifiSharp } from 'react-icons/io5';
import { MdOutlineLocationOn } from 'react-icons/md';
import { GiCommercialAirplane } from 'react-icons/gi';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const ServiceOverview = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-2 text-[#191E3B]'>
      <div className=' col-span-2 flex flex-col gap-8'>
        <div className='block space-y-1'>
          <h2 className='font-light text-2xl md:text-3xl leading-7 md:leading-8 '>
            B&B Hotel Marne-La-Vallée ValD&apos;Europe
          </h2>
          <StarRating rating={3} maxStars={5} />
          <div className='flex items-start gap-2'>
            <Check size={24} />
            <span className='text-sm leading-4 text-[#148148]'>Reserve now, pay later</span>
          </div>
        </div>
        <div className='block space-y-1'>
          <div className='w-full inline-flex gap-4'>
            <div className='flex item-center justify-center w-fit rounded-4xl rounded-tr-none shadow-2xl bg-[#009DC4] p-2'>
              <span className='text-sm leading-4 text-white'>9.5/10</span>
            </div>
            <h4 className='text-lg leading-5 mt-0.5'>Wonderful</h4>
          </div>
          <div className='w-full inline-flex gap-3 text-[#009DC4] hover:text-[#0083a3] cursor-pointer'>
            <h5 className='text-[15px] leading-5 '>See all 63 reviews</h5>
            <IoIosArrowForward className='mt-[0.2rem]' />
          </div>
        </div>
        <div className='block space-y-1'>
          <h3 className='font-normal text-base md:text-xl lg:text-xl leading-normal md:leading-6'>
            About this property
          </h3>
          <h5 className='font-normal text-sm md:text-base leading-normal md:leading-5'>
            Hotel with a 24-hour front desk, near Val d&apos;Europe
          </h5>
          <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='inline-flex space-x-2'>
              <TbParking size={24} />
              <span className='text-sm md:text-base leading-5'>Parking available</span>
            </div>
            <div className='inline-flex space-x-2'>
              <MdStorefront size={24} />
              <span className='text-sm md:text-base leading-5'>24/7 front desk</span>
            </div>
            <div className='inline-flex space-x-2'>
              <TbAirConditioning size={24} />
              <span className='text-sm md:text-base leading-5'>Air conditioning</span>
            </div>
            <div className='inline-flex space-x-2'>
              <MdOutlinePets size={24} />
              <span className='text-sm md:text-base leading-5'>Pet friendly</span>
            </div>
            <div className='inline-flex space-x-2'>
              <MdOutlineFreeBreakfast size={24} />
              <span className='text-sm md:text-base leading-5'>Breakfast available</span>
            </div>
            <div className='inline-flex space-x-2'>
              <IoWifiSharp size={24} />
              <span className='text-sm md:text-base leading-5'>Free WiFi</span>
            </div>
          </div>
        </div>
        <div className='w-full inline-flex gap-3 text-[#009DC4] hover:text-[#0083a3] cursor-pointer'>
          <h5 className='text-[15px] leading-5 '>See all about this property</h5>
          <IoIosArrowForward className='mt-[0.2rem]' />
        </div>
      </div>
      <div className='flex flex-col gap-4 items-start'>
        <div className='block space-y-2'>
          <h5 className='font-normal text-base md:text-xl leading-normal md:leading-6'>Explore the area</h5>
          <Card className='p-0 '>
            <CardContent className='p-0'>
              <div className='flex flex-col gap-2 items-start'>
                <Image src={'/images/main/anonymous_map.png'} alt='Map' width={343.99} height={242.85} quality={95} />
                <div className='block px-4 py-2 space-y-1'>
                  <h3 className='font-normal text-sm leading-normal md:leading-5'>
                    ZAC Couternois, 11 impasse Dorothée le Maître, Serris, Seine-et-Marne, 77700
                  </h3>
                  <div className='w-full inline-flex gap-3 text-[#009DC4] hover:text-[#0083a3] cursor-pointer'>
                    <h5 className='text-[15px] leading-5 '>View in a map</h5>
                    <IoIosArrowForward className='mt-[0.2rem]' />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='flex flex-col gap-3 w-full'>
          <div className='flex items-start gap-2 w-full'>
            <div className='flex-[1_1_auto] flex items-start gap-2 w-full'>
              <MdOutlineLocationOn size={28} />
              <span className='flex-1 font-normal text-xs leading-normal md:leading-4'>Val d&apos;Europe</span>
            </div>
            <div className='flex w-full items-end justify-end'>
              <span className='font-normal text-xs leading-normal md:leading-4 text-right'>9 min walk</span>
            </div>
          </div>
          <div className='flex items-start gap-2 w-full'>
            <div className='flex-[1_1_auto] flex items-start gap-1 w-full'>
              <MdOutlineLocationOn size={28} />
              <span className='flex-1 font-normal text-xs leading-normal md:leading-4'>
                Val d&apos;Europe Shopping Center
              </span>
            </div>
            <div className='flex-none'>
              <span className='w-full flex items-end justify-end font-normal text-xs leading-normal md:leading-4 text-right'>
                2 min drive
              </span>
            </div>
          </div>
          <div className='flex items-start gap-2 w-full'>
            <div className='flex-[1_1_auto] flex items-start gap-1 w-full'>
              <MdOutlineLocationOn size={28} />
              <span className='flex-1 font-normal text-xs leading-normal md:leading-4'>Disneyland® Paris</span>
            </div>
            <div className='flex-none'>
              <span className='flex w-full items-end justify-end font-normal text-xs leading-normal md:leading-4 text-right'>
                6 min drive
              </span>
            </div>
          </div>
          <div className='flex items-start gap-2 w-full'>
            <div className='flex-[1_1_auto] flex items-start gap-1 w-full'>
              <GiCommercialAirplane size={28} />
              <span className='flex-1 font-normal text-xs leading-normal md:leading-4'>
                Paris (CDG-Roissy-Charles deGaulle)
              </span>
            </div>
            <div className='flex-none'>
              <span className='flex w-full items-end justify-end font-normal text-xs leading-normal md:leading-4 text-right'>
                32 min drive
              </span>
            </div>
          </div>
          <div className='w-full inline-flex gap-3 text-[#009DC4] hover:text-[#0083a3] cursor-pointer'>
            <h5 className='text-sm leading-5 '>See all about this area</h5>
            <IoIosArrowForward className='mt-[0.2rem]' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceOverview;
