'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Slider from 'react-slick';
import styles from '@/components/sample/group-card.module.css';
import Image from 'next/image';
import { Check } from 'lucide-react';
import StarRating from '@/components/defaults/StarRating';
import { Button } from '@/components/ui/button';
import { THotelHomeProfile } from '@/types/website/hotels.type';
import { MainHotelProfileConstant as hotelProfiles } from '@/lib/constants/website/hotels/profile.constant';
import useHotelLocationStore from '@/store/website/hotel/profileLocation.store';

const HotelProfile = ({ numberOfDays, numberOfRooms }: { numberOfDays: number; numberOfRooms: number }) => {
  return (
    <div className='mt-2 flex flex-col gap-4'>
      {hotelProfiles && hotelProfiles.length > 0
        ? hotelProfiles.map((profile) => (
            <HotelProfileItem key={profile.id} profile={profile} night={numberOfDays} rooms={numberOfRooms} />
          ))
        : null}
    </div>
  );
};

const HotelProfileItem = ({ profile, night, rooms }: { profile: THotelHomeProfile; night: number; rooms: number }) => {
  const router = useRouter();
  const setHotelLocation = useHotelLocationStore((state) => state.setHotelLocationDetails);
  const sliderRef = useRef<Slider>(null);
  const cardWidth = 120; // You can adjust this
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    speed: 500,
    arrows: true,
  };

  const handleHotelDetails = (id: number, location: string) => {
    setHotelLocation({
      name: profile.name,
      imgSrcUrl: profile.imgSrcUrl,
      relatedImgUrl: profile.relatedImgUrl,
      numberOfReviews: profile.numberOfReviews,
      totalCost: profile.totalCost,
      unitCost: profile.unitCost,
      amenities: profile.amenities,
      description: profile.description,
      isFeaturedExist: profile.isFeaturedExist,
    });

    // Navigate with dynamic routes and optional query param
    router.push(`/hotels/profile/${location}/${id}`);
  };
  return (
    <Card className='p-0'>
      <CardContent className='p-0'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Image Section of the Profile Component */}
          <div className='p-0 slide-container overflow-hidden scroll-smooth'>
            {/* <h4>Just Testing</h4> */}
            {profile.imgSrcUrl ? (
              <Slider ref={sliderRef} {...settings}>
                <div className=' shrink-0' style={{ width: `${cardWidth}px` }}>
                  <div className='p-0 outline-none'>
                    <div className='relative overflow-hidden rounded-[0.5rem]'>
                      <div className={`${styles.imageWrap}`}>
                        <Image src={profile.imgSrcUrl} alt={'Home Lobby'} fill className={styles.image} />
                        <div className={`${styles.overlay} relative`}>
                          <div className='text-white'></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            ) : null}
          </div>
          <div className='py-4 flex flex-col gap-3 items-start'>
            {profile.isFeaturedExist ? (
              <div className='bg-[#DFE0E4] py-[2px] rounded-xs px-2 flex items-center gap-2 justify-between text-[10px] text-[#191E3B] leading-3'>
                <h6>Featured</h6>
                <div className=' rounded-full bg-[#191E3B] text-[8.76px] text-gray-300 w-[10px] h-[10px] text-center font-bold pb-2'>
                  i
                </div>
              </div>
            ) : null}
            <div className='block'>
              <h3 className='font-semibold text-base leading-6 text-[#191E3B]'>{profile.name}</h3>
              <StarRating rating={profile.starRating} maxStars={5} />
              <h5 className='font-normal text-sm leading-[18px] text-[#191E3B]'>{profile.location}</h5>
            </div>
            <div className='block'>
              {profile.guestRatingReview && profile.guestRatingReview.length > 0
                ? profile.guestRatingReview.map((review) => (
                    <div key={review} className='font-normal text-sm leading-[18px]'>
                      <span className='text-[#191E3B]'>{review}</span>
                    </div>
                  ))
                : null}
              {profile.generalRating && profile.generalRating > 2 ? (
                <div className='my-2 flex item-start gap-2'>
                  <div className='w-fit text-center px-1 py-[2px] rounded-xl shadow-lg rounded-tr-lg bg-[#009DC4]'>
                    <span className='text-xs leading-4 text-white'>{`${profile.generalRating}/10`}</span>
                  </div>
                  <h6 className='mt-2 font-normal text-xs leading-4 text-[#191E3B]'>{`${profile.numberOfReviews} reviews`}</h6>
                </div>
              ) : null}
              {profile.description && profile.description.length > 0 ? (
                <div className='flex flex-col gap-0'>
                  <div className='font-bold text-sm leading-[18px] '>
                    <span className='text-[#227950]'>Breakfast Included</span>
                  </div>
                  {profile.description.map((item) => (
                    <div key={item} className='flex item-start gap-1'>
                      <Check size={16} />
                      <h6 className='font-bold text-xs leading-[18px] text-[#227950]'>{item}</h6>
                    </div>
                  ))}
                  <h6 className='font-bold text-[10px] leading-[18px] text-[#E63A24]'>
                    Only 5 rooms left at this price on our site
                  </h6>
                </div>
              ) : null}
            </div>
          </div>
          <div className='py-8 px-8 flex flex-col gap-3 items-end'>
            {profile.percentageDiscount > 0 ? (
              <div className='w-full max-w-[60px] text-center px-2 py-1 rounded-lg shadow-lg rounded-tr-none bg-[#009DC4]'>
                <span className='text-xs leading-4 text-white'>{`${profile.percentageDiscount}% off`}</span>
              </div>
            ) : null}
            <div className='block text-[#191E3B] text-right'>
              <h4 className='font-light text-lg leading-6'>{`€${profile.totalCost}`}</h4>
              <span className='font-normal text-[11px] leading-4'>{`for ${night} nights, ${rooms} rooms.`}</span>
              <h5 className='font-normal text-xs leading-4'>{`€${profile.unitCost} per night`}</h5>
              <h6 className='font-normal text-[10px] leading-4'>Includes taxes and fees</h6>
            </div>
            <div className='w-full'>
              <Button
                variant={'outline'}
                className='border-[#B02D1C] hover:bg-[#B02D1C]  py-2 px-3.5 text-[#B02D1C] hover:text-white font-semibold cursor-pointer'
                onClick={() => handleHotelDetails(profile.id, profile.location)}
              >
                Check Availability
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelProfile;
