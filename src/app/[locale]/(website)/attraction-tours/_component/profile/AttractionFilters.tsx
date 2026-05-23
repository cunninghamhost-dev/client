import { Button } from '@/components/ui/button';
import React from 'react';
import AttractionMenuChecker from './AttractionMenuChecker';
import { ScrollArea } from '@/components/ui/scroll-area';

const AttractionFilters = () => {
  return (
    <aside className='border flex flex-col max-h-[calc(-32px_+_100vh)] my-4 overflow-hidden relative rounded-lg border-solid border-[rgb(231,231,231)]'>
      <div className='flex flex-row items-center justify-between p-4 border-b-[rgb(231,231,231)] border-b border-solid filters-header'>
        <h3 className='font-bold text-base leading-6'>Filter by:</h3>
        <Button variant={'ghost'} className='border-none bg-transparent text-[#006ce4] cursor-pointer'>
          Clear
        </Button>
      </div>
      <div className='overflow-hidden w-full flex gap-6 flex-col pt-2 pb-0 px-4'>
        <ScrollArea className='h-[100vh]'>
          <div className='flex flex-col'>
            <AttractionMenuChecker />
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default AttractionFilters;
