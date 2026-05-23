import React from 'react';
import RecommendedInstruction from './instructions/RecommendedInstruction';
import AllianceInstruction from './instructions/AllianceInstruction';
import StopInstruction from './instructions/StopInstruction';
import AirlineInstruction from './instructions/AirlineInstruction';
import TimesInstruction from './instructions/TimesInstruction';
import DurationInstruction from './instructions/DurationInstruction';
import PriceInstruction from './instructions/PriceInstruction';
import { ScrollArea } from '@/components/ui/scroll-area';
import CabinInstruction from './instructions/CabinInstruction';
import StopoverInstruction from './instructions/StopoverInstruction';

const InstructionsFlightProfile = () => {
  return (
    <div className='space-y-0 py-2 px-1 w-full'>
      <div className='flex flex-row gap-1 mb-2'>
        <h6 className=' font-sans leading-5 text-[13.78px]'>
          <span className='font-semibold'>2</span>
          <span className='font-normal'>{`50 0f`}</span>
        </h6>
        <h6 className='font-normal text-sm leading-[21px]'>
          <span className='text-blue-600'>533</span>
          {` flights `}
        </h6>
      </div>
      <ScrollArea className='w-full h-screen overflow-y-hidden'>
        <div className='flex flex-col gap-0'>
          <RecommendedInstruction />
          <AllianceInstruction />
          <StopInstruction />
          <AirlineInstruction />
          <TimesInstruction />
          <DurationInstruction />
          <PriceInstruction />
          <CabinInstruction />
          <StopoverInstruction />
        </div>
      </ScrollArea>
    </div>
  );
};

export default InstructionsFlightProfile;
