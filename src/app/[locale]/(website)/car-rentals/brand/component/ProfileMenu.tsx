'use client';
import React from 'react';
import CarOverview from './menucontent/CarOverview';
import PricingDetails from './PricingDetails';
import CarLocation from './menucontent/CarLocation';
import CarInsurance from './menucontent/CarInsurance';
import CarRentalPolicy from './menucontent/CarRentalPolicy';
import CarExtras from './menucontent/CarExtras';

const ProfileMenu = ({ name, id }: { name: string; id: string }) => {
  return (
    <div className='flex flex-col gap-8 w-full my-40'>
      <div className='px-20 grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className=' col-span-2 flex flex-col gap-4 items-start w-full'>
          <section className='flex flex-col gap-2 items-start w-full' id='overview'>
            <CarOverview />
          </section>
          <section className='flex flex-col gap-2 items-start w-full' id='location'>
            <CarLocation />
          </section>
          <section className='flex flex-col gap-2 items-start w-full' id='insurance'>
            <CarInsurance />
          </section>
          <section className='flex flex-col gap-2 items-start w-full' id='policies'>
            <CarRentalPolicy />
          </section>
          <section className='flex flex-col gap-2 items-start w-full' id='extras'>
            <CarExtras />
          </section>
        </div>
        <div className='col-span-1'>
          <PricingDetails name={name} id={id} />
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
