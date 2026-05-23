'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { ConstRatings as ratings } from '@/lib/constants/website/attractionstour/tour-details.constants';
import { IRating } from '@/types/website/attractions.type';

const UserRating = ({ overallRating, totalReviews }: { overallRating: number; totalReviews: number }) => {
  const [ratingData, setRatingData] = useState<IRating[]>();
  useEffect(() => {
    setRatingData(ratings);
  }, []);
  return (
    <div className='my-4 px-12 flex flex-col gap-4 max-w-3xl'>
      <div className='block space-y-2'>
        <Label className='font-bold text-xl leading-7'>User ratings</Label>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2 text-base leading-7'>
            <FaStar className='w-5 h-5 fill-[#F39C12] text-[#F39C12]' />
            <span className='font-semibold'>{overallRating}</span>
            <span className='font-semibold'>Exceptional</span>
            <span>({totalReviews} reviews)</span>
          </div>
          <Button variant={'link'} className='text-[#009DC4] text-sm p-0 ml-2'>
            See all reviews
          </Button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {ratingData &&
            ratingData.map((rating, index) => (
              <motion.div
                key={rating.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className='space-y-2'
              >
                <div className='flex justify-between text-sm'>
                  <span className='font-semibold'>{rating.category}</span>
                  <span className='font-medium'>{rating.score}</span>
                </div>
                <Progress
                  value={(rating.score / rating.maxScore) * 100}
                  className='h-2 bg-gray-300 [&>div]:bg-[#148148]'
                />
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserRating;
