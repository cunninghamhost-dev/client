import Link from 'next/link';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import {
  ConstSampleStops as stops,
  ConstTourDetails as details,
  constDeparturePoint as departures,
  ConstEndPoint as endpoints,
} from '@/lib/constants/website/attractionstour/tour-details.constants';
import TourGalleryProfile from '../_component/details/TourGalleryProfile';
import ItineraryInfo from '../_component/details/ItineraryInfo';
import ItineraryTimeline from '../_component/details/ItineraryTimeline';
import UserRating from '../_component/details/UserRating';
import Testimonial from '../_component/details/Testimonial';
import PhotoGallery from '../_component/details/PhotoGallery';
import AttractionFAQ from '../_component/details/AttractionFAQ';
import AvailabilityDate from '../_component/details/AvailabilityDates';
import { Label } from '@/components/ui/label';
import TourOptions from '../_component/details/TourOptions';

const AttractionDetailPage = () => {
  return (
    <div className='p-0 w-full transition min-h-screen text-[#1A1A1A]'>
      <div className='block space-y-2'>
        {/* <BreadcrumbField linker={breadcrumbData} /> */}
        <div className='inline-flex gap-3 text-xs'>
          <Link href={'/'} className=' text-[#006CE4] leading-6'>
            Home
          </Link>
          <IoIosArrowForward className='mt-1.5' />
          <Link href={'/attraction-tours/profile'} className=' text-[#006CE4] leading-6'>
            Attractions
          </Link>
          <IoIosArrowForward className='mt-1.5' />
          <p className='leading-[18px] mt-0.5'>Merville-Franceville-Plage</p>
        </div>
        <h3 className='font-bold text-2xl leading-8'>Normandy U.S. D-Day Sites Half Day Tour From Bayeuxs</h3>
        <div className='flex items-start gap-2'>
          <div className='font-semibold py-0.5 px-[5px] text-xs bg-[#009DC4] text-center text-white'>Genius</div>
          <div className='py-0.5 px-[5px] text-xs bg-[#009DC4] text-center text-white'>100% off</div>
          <div className='py-0.5 px-[5px] text-xs bg-[#009DC4] text-center text-white'>#2 Best seller in Bayeuxs</div>
          <div className='py-0.5 px-[5px] text-xs bg-transparent text-center text-[#7C7C7C]'>
            Early booking recommended
          </div>
        </div>
        <div className='flex flex-col gap-6 items-start w-full'>
          <TourGalleryProfile
            mainImage={details.mainImage}
            thumbnails={details.thumbnails}
            reviews={details.reviews}
            rating={details.rating}
            reviewCount={details.reviewCount}
            duration={details.duration}
            description={details.description}
            includes={details.includes}
            excludes={details.excludes}
          />
          <ItineraryInfo />
          <ItineraryTimeline stops={stops} departurePoint={departures} endPoint={endpoints} />

          {/* <TourBooking /> */}
        </div>
        <div className='w-full flex flex-col gap-4'>
          <UserRating overallRating={4.7} totalReviews={221} />
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
            {/* Left Section - Testimonial, Photos and FAQ */}
            <div className='lg:col-span-2 flex flex-col gap-3'>
              <Testimonial />
              <PhotoGallery />
              <AttractionFAQ />
            </div>
            {/* Right Section - Booking */}
            <div className='lg:col-span-1 flex flex-col gap-6 mt-24'>
              <Label className='font-bold text-xl leading-7'>Tickets and prices</Label>
              <AvailabilityDate />
              <TourOptions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetailPage;
