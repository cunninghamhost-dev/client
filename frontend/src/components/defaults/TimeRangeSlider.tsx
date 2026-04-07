import React, { useState } from 'react';
import { Slider } from '../ui/slider';

interface ITimeRangeData {
  title: string;
}

const TimeRangeSlider = ({ title = 'Select Timer' }: ITimeRangeData) => {
  const [range, setRange] = useState<[number, number]>([0, 1440]); // Default: 08:00 - 17:00

  const handleChange = (value: number[]) => {
    if (value.length === 2) {
      setRange([value[0], value[1]]);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto space-y-4'>
      <div className='text-start'>
        <p className=' font-sans text-[13.67px] leading-[18px] text-[#223344]'>
          {`${title}: 00:00 - 24:00`}
          {/* Selected Range: <strong>{minutesToTime(range[0])}</strong> - <strong>{minutesToTime(range[1])}</strong> */}
        </p>
      </div>
      <Slider min={0} max={1440} step={15} value={range} onValueChange={handleChange} className='w-full' />
      <div className='flex flex-row items-start justify-between w-full font-sans text-sm leading-[18px] text-[#6B8299]'>
        <h6>{minutesToTime(range[0])}</h6>
        <h6>{minutesToTime(range[1])}</h6>
      </div>
    </div>
  );
};

const minutesToTime = (minutes: number) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export default TimeRangeSlider;
