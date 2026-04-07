'use client';
import useCarRentalProfileStore from '@/store/website/carrentals/carprofile.store';
import React from 'react';
import { FaAsterisk } from 'react-icons/fa6';
import { FiUser } from 'react-icons/fi';
import { GiCarDoor } from 'react-icons/gi';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { TbAutomaticGearboxFilled } from 'react-icons/tb';

const CarProfileReserved = () => {
  const { brand } = useCarRentalProfileStore();
  return (
    <div className='flex flex-col items-start gap-0'>
      <div className='flex-1 flex gap-1 items-start font-bold text-[#1668E3]'>
        <span className='text-sm leading-5'>{brand}</span>
        <MdKeyboardDoubleArrowDown className='mt-1' size={15} />
      </div>
      <h6 className='font-bold text-xs leading-[18.35px]'>2 Coin St, London, United Kingdom</h6>
      <span className='text-xs leading-[18.35px]'>Mon, Sep 8 - Tue, Sep 9</span>
      <div className='flex item-start gap-4 text-[#1A1A1A] text-xs leading-[18.35px]'>
        <div className='flex gap-1'>
          <FiUser size={13} />
          <span>5</span>
        </div>
        <div className='flex gap-1'>
          <GiCarDoor size={13} />
          <span>5</span>
        </div>
        <div className='flex gap-1'>
          <FaAsterisk size={13} />
          <span>AC</span>
        </div>
        <div className='flex gap-1'>
          <TbAutomaticGearboxFilled size={13} />
          <span>Automatic</span>
        </div>
      </div>
    </div>
  );
};

export default CarProfileReserved;
