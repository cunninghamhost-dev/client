'use client';
import { Card, CardContent } from '@/components/ui/card';
import { ConstCarDisplayShow as displays } from '@/lib/constants/website/carrentals/cars-main-content.constant';
import Image from 'next/image';
import React from 'react';
import { IoMdPerson } from 'react-icons/io';
import { TbAutomaticGearbox } from 'react-icons/tb';
import { RxTimer } from 'react-icons/rx';
import { MdFlightTakeoff } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { ICarProfile } from '@/types/website/carrentals.type';
import { useRouter } from 'next/navigation';
import useCarRentalProfileStore from '@/store/website/carrentals/carprofile.store';

const RentalDisplay = () => {
  const router = useRouter();
  const setCarRentalProfile = useCarRentalProfileStore((state) => state.setCarRentalProfileDetails);

  const handleBrandPageNavigation = (profile: ICarProfile) => {
    setCarRentalProfile({
      brand: profile.description.brand,
      model: profile.description.model,
      img_src: profile.description.img_src,
      engine_type: profile.description.engine_type,
      numberForSale: profile.description.numberForSale,
      mileage_form: profile.description.mileage_form,
      evaluation: profile.description.evaluation,
      main_amenitels: profile.description.main_amenitels,
      amenities: profile.ratings.amenities,
      classImg: profile.ratings.classImg,
      percentage_rating: profile.ratings.percentage_rating,
      review: profile.ratings.review,
      numbers_rated: profile.ratings.numbers_rated,
      rental_per_day: profile.cost.rental_per_day,
      total_amount: profile.cost.total_amount,
      car_location: profile.location,
    });
    // Navigate with dynamic routes and optional query param
    router.push(`/car-rentals/brand/${profile.description.brand}/${profile.id}`);
  };
  return (
    <div className='flex flex-col gap-4 w-full items-start'>
      {displays.map((display) => (
        <Card key={display.id}>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <div className='flex items-start gap-2'>
                <div className='block space-x-1.5 px-1'>
                  {display.description.img_src && (
                    <Image src={display.description.img_src} alt={display.description.brand} width={164} height={135} />
                  )}
                </div>
                <div className='flex-[1_1_auto] w-full'>
                  <div className='flex flex-col gap-1'>
                    <h3 className=' font-semibold text-base md:text-lg leading-5 md:leading-6 text-left'>
                      {display.description.brand}
                    </h3>
                    <span className='text-sm leading-4'>{display.description.model}</span>
                    <div className='flex items-start gap-3'>
                      <IoMdPerson size={12} />
                      <span className='text-sm leading-4'>{display.description.numberForSale}</span>
                      <TbAutomaticGearbox />
                      <span className='text-sm leading-4'>{display.description.engine_type}</span>
                    </div>
                    <div className='flex items-start gap-3'>
                      <RxTimer width={14.96} height={11.97} />
                      <span className='text-sm leading-4'>{display.description.mileage_form}</span>
                    </div>
                    <div className='flex items-start gap-3'>
                      <MdFlightTakeoff width={21.97} height={18.88} />
                      <span className='text-xs leading-4'>{display.description.evaluation}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex items-start gap-2'>
                <div className='flex-grow mt-6 flex flex-col gap-2 items-start w-full'>
                  {display.ratings.amenities && (
                    <div className='flex flex-col gap-0'>
                      {display.ratings.amenities.map((item) => (
                        <span key={item} className='text-sm leading-[18px] text-[#148148]'>
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className='flex item-start gap-1'>
                    {display.ratings.classImg && (
                      <Image src={display.ratings.classImg} alt='Review Class' width={64} height={24} />
                    )}
                    <div className='p-1.5 bg-[#009DC4] rounded-md rounded-tr-xs text-white text-xs'>{`${display.ratings.percentage_rating}%`}</div>
                    <div className='flex flex-col gap-0'>
                      <span className='text-sm leading-[18px] font-semibold'>{display.ratings.review}</span>
                      <span className='text-[13px] leading-4'>{`${display.ratings.numbers_rated} ratings`}</span>
                    </div>
                  </div>
                </div>
                <div className='flex-none'>
                  <div className='flex flex-col gap-2 items-end w-full text-[#4D5167]'>
                    <span className='font-bold text-lg md:text-2xl leading-7 text-right'>
                      {`$${display.cost.rental_per_day}`}
                    </span>
                    <span className='text-xs leading-4 text-right'>per day</span>
                    <span className='text-xs leading-4 text-right'>{`$${display.cost.total_amount} total`}</span>
                    <Button
                      onClick={() => handleBrandPageNavigation(display)}
                      variant={'outline'}
                      className='border-[#E63A24] text-[#E63A24] hover:bg-[#E63A24] hover:text-white text-sm leading-4'
                    >
                      Reserve
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RentalDisplay;
