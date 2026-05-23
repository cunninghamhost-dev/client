'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaArrowLeft, FaRegHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const RevertProfile = () => {
  const router = useRouter();
  const handlerProfileBack = () => {
    router.push('/car-rentals/profile');
  };
  return (
    <Card className='w-full rounded-none mx-auto py-2'>
      <CardContent className='w-full'>
        <div className='flex items-start px-8 justify-between'>
          <Button
            onClick={handlerProfileBack}
            variant={'ghost'}
            className='text-[#1A1A1A] hover:text-[#E63A24] hover:bg-transparent cursor-pointer'
          >
            <FaArrowLeft width={16} height={14} />
            <span className='text-sm md:text-base leading-4 md:leading-5'>See all cars</span>
          </Button>
          <Button variant={'ghost'} className='text-[#1A1A1A] hover:text-[#E63A24] hover:bg-transparent cursor-pointer'>
            <FaRegHeart width={24} height={24} />
            <span className='text-sm md:text-base leading-4 md:leading-5'>Save</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevertProfile;
