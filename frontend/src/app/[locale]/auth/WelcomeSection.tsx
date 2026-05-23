import React from 'react';
import Image from 'next/image';

const WelcomeContent = () => {
  return (
    <div className='flex flex-col items-center gap-2 w-full'>
      <h3 className='text-[#121417] font-bold text-2xl leading-9 text-center -tracking-1'>Welcome to</h3>
      <div className='flex flex-col gap-0 mb-2'>
        <a href={'/'} className='text-center text-[#B02D1C] font-bold text-2xl md:text-[2rem] leading-9 -tracking-1'>
          Cunninham Global Travel
        </a>
        <span className='text-center text-[#121417] font-bold italic text-sm leading-9 -tracking-1'>
          Everything You Need for Travel - in One Convenient Place
        </span>
      </div>
      <Image src={'/images/main/auth_img.png'} alt='Welcome Onboard' width={325.5} height={325} />
    </div>
  );
};

export default WelcomeContent;
