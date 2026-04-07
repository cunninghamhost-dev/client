import { TStarRatingProps } from '@/types/default.type';
import React from 'react';

const StarRating = ({ rating, maxStars = 5 }: TStarRatingProps) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0);

  const stars = [];
  // Add filled stars
  for (let i = 0; i < filledStars; i++) {
    stars.push(
      <span key={`full-${i}`} style={{ color: '#F39C12', fontSize: '16px' }}>
        ★
      </span>
    );
  }

  // Add half star (optional: use an icon or half-color if needed)
  if (hasHalfStar) {
    stars.push(
      <span key='half' style={{ color: '#F39C12', fontSize: '16px' }}>
        ⯪
      </span>
    ); // Or use ★ with opacity
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} style={{ color: '#ccc', fontSize: '16px' }}>
        ★
      </span>
    );
  }
  return <div>{stars}</div>;
};

export default StarRating;
