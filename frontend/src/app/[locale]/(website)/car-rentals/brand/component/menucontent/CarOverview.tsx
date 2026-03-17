import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import useCarRentalProfileStore from '@/store/website/carrentals/carprofile.store';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { LuCalendarCheck2 } from 'react-icons/lu';
import { RxCaretRight } from 'react-icons/rx';

const CarOverview = () => {
  const { brand, model, img_src, main_amenitels, numbers_rated, amenities, percentage_rating, review } =
    useCarRentalProfileStore();
  return (
    <div className='flex flex-col gap-3 w-full'>
      <Card>
        <CardContent>
          <div className='flex flex-col gap-8 w-full'>
            <div className='grid grid-cols-1 md:grid-cols-3 w-full'>
              <div className=' col-span-2 flex flex-col gap-4 w-full'>
                <div className='flex flex-col gap-0'>
                  <span className='text-xl md:text-2xl lg:text-[28px] leading-6 md:leading-7 lg:leading-8'>
                    {brand}
                  </span>
                  <span className='text-sm leading-4 text-[#1A1A1A]'>{model}</span>
                </div>
                {main_amenitels && (
                  <div className='grid grid-cols-2 gap-5 text-[#1A1A1A]'>
                    {main_amenitels.map(({ label, value, icon: Icon, includeInfo }) => (
                      <div key={label} className='flex item-start gap-3'>
                        {Icon && <Icon width={12} height={13.5} className='mt-1' />}
                        <div className='flex gap-1'>
                          <span className='text-sm leading-4'>{value ? `${value} ${label}` : `${label}`}</span>
                          {includeInfo && (
                            <Link href={'#'}>
                              <IoIosInformationCircleOutline width={18} height={18} />
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className='block w-full'>
                {img_src && <Image src={img_src} alt={brand} width={200} height={120} quality={95} />}
              </div>
            </div>
            <Separator orientation='horizontal' />
            <div className='flex flex-col gap-2'>
              <div className=' space-y-1'>
                <Image
                  src={'/images/main/img-europcar-rental.png'}
                  alt='Car Rental Shop'
                  width={49.52}
                  height={16}
                  priority
                />
                <span className='text-[#666666] text-sm leading-4 '>at STN airport</span>
              </div>
              <div className=' inline-flex space-x-1.5 font-semibold'>
                <span className='py-1 px-2 bg-[#E6F5F9] rounded-md text-xs leading-3.5 '>{`${percentage_rating}%`}</span>
                <span className='mt-0.5 text-sm leading-4'>{`${review}`}</span>
              </div>
              <div className='flex items-start justify-between gap-2'>
                <div className='flex-grow inline-flex space-x-1'>
                  <span className='text-sm leading-4'>{`${numbers_rated} verified rating`}</span>
                  <Link href={'#'} className='mt-0.5'>
                    <IoIosInformationCircleOutline width={18} height={18} />
                  </Link>
                </div>
                <div className='flex-none'>
                  <div className='flex items-end text-right'>
                    <Link rel='stylesheet' href='#'>
                      <div className=' inline-flex gap-2 text-[#009DC4] hover:text-[#0285a6] text-base'>
                        <span className='leading-4'>See rating details</span>
                        <RxCaretRight />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className='w-full'>
        <CardContent>
          <div className='flex items-start gap-4'>
            <LuCalendarCheck2 size={40} />
            <div className='space-y-1'>
              {amenities && (
                <div className='flex flex-col gap-0.5'>
                  {amenities.map((item) => (
                    <span key={item} className='text-sm font-bold leading-4 text-[#1A1A1A]'>
                      {item}
                    </span>
                  ))}
                </div>
              )}
              <span className='text-sm leading-4 text-[#1A1A1A]'>
                Lock in this price today, cancel free of charge anytime. Reserve now and pay at pick-up.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarOverview;
