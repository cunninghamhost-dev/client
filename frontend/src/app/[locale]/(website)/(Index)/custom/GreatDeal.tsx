'use client';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';

const GreatDeal = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        // Check for 'isLoggedIn=true' instead of 'token='
        const cookies = document.cookie.split(';');
        const isUserLoggedIn = cookies.some((item) => item.trim().startsWith('isLoggedIn=true'));
        
        setIsLoggedIn(isUserLoggedIn);
      };

      checkAuth();
      
      // This listener helps if the user logs out in another tab
      window.addEventListener('focus', checkAuth); 
      return () => window.removeEventListener('focus', checkAuth);
    }, []);
  return (
    <div className='col-span-2 flex flex-col items-start justify-center gap-4 py-8 lg:py-4'>
      <h3 className='font-normal text-xl md:text-3xl lg:text-5xl leading-normal lg:leading-[67.2px]'>
        Dont miss a great deal
      </h3>
      {!isLoggedIn ? (
          <span className='text-sm md:text-base leading-normal text-[#666666]'>
            Sign in, save money <br /> save 10% when you sign in to use the platform.
          </span>
        ) : (
          <span className='text-sm md:text-base leading-normal text-orange-600 font-medium'>
            Welcome back! Your 10% member discount is now active. <br /> 
            Enjoy your exclusive deals.
          </span>
        )}
      <div className='flex flex-col lg:flex-row items-start gap-4 w-full'>
        {!isLoggedIn ? (
          <>
                <Button className='w-full lg:w-fit bg-orange-600 hover:bg-amber-700 text-gray-50 hover:text-white'>
                  Login
                </Button>
                <Button
                  variant={'outline'}
                  className='w-full lg:w-fit border-orange-600 hover:border-orange-700 text-orange-600 hover:text-orange-700 font-semibold'
                >
                  Register
                </Button>
          </>
        ) : (<></>)}
      </div>
    </div>
  );
};

export default GreatDeal;
