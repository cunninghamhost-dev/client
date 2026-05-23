import React from 'react';
import AttractionFilters from '../_component/profile/AttractionFilters';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import AttractionTabContent from '../_component/profile/AttractionTabContent';

const AttractionTourPage = () => {
  return (
    <div className='p-0 max-w-full transition min-h-screen text-[#1A1A1A]'>
      <div className='block space-y-2'>
        {/* <BreadcrumbField linker={breadcrumbData} /> */}
        <div className='inline-flex gap-3 text-xs'>
          <Link href={'/'} className=' text-[#006CE4] leading-6'>
            Home
          </Link>
          <IoIosArrowForward className='mt-1.5' />
          <p className='leading-[18px] mt-0.5'>Merville-Franceville-Plage</p>
        </div>
        <h3 className='font-bold text-2xl leading-6'>Merville-Franceville-Plage attractions</h3>
        <span className='text-base font-bold leading-4'>195 results</span>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='w-full col-span-1'>
          <AttractionFilters />
        </div>
        <div className='mt-4 w-full col-span-2'>
          <AttractionTabContent />
        </div>
      </div>
    </div>
  );
};

export default AttractionTourPage;
