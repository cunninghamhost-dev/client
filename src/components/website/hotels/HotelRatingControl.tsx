import StarRating from '@/components/defaults/StarRating';
import React from 'react';

const HotelRatingControl = ({ value }: { value: number }) => {
  return (
    <div className='flex items-center justify-center gap-1'>
      <h6>{value}</h6>
      <StarRating rating={1} maxStars={1} />
    </div>
  );
};

export default HotelRatingControl;
