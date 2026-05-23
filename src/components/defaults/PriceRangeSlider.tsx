import React, { useState } from 'react';
import { Slider } from '../ui/slider';

interface IPriceRangeData {
  title?: string;
}

const PriceRangeSlider = ({ title }: IPriceRangeData) => {
  const [range, setRange] = useState<[number, number]>([10, 10000]); // Default range

  const handleChange = (value: number[]) => {
    if (value.length === 2) {
      setRange([value[0], value[1]]);
    }
  };

  return (
    <div className='price-range w-full max-w-md mx-auto space-y-4'>
      <div className='text-start'>
        <p className=' font-sans text-[13.67px] leading-[18px] text-[#223344]'>
          {title ? `${title}: $10 - $10000` : '$10 - $10000'}
        </p>
      </div>
      <Slider
        min={10}
        max={10000}
        step={10}
        value={range}
        onValueChange={handleChange}
        className='w-full bg-[#E63A24]'
      />
      <div className='flex flex-row items-start justify-between w-full font-sans text-sm leading-[18px] text-[#6B8299]'>
        <h6>{formatCurrency(range[0])}</h6>
        <h6>{formatCurrency(range[1])}</h6>
      </div>
    </div>
  );
};

const formatCurrency = (value: number) => {
  return `$${value.toLocaleString()}`;
};

export default PriceRangeSlider;
