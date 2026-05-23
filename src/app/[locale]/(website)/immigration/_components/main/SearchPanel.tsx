import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import ImmigrationFormField from './ImmigrationFormField';
//import VisaFormField from './VisaFormField';

const SearchPanel = () => {
  return (
    <div className='relative w-full bg-transparent'>
      <Card className='h-auto absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[50%] w-full max-w-5xl bg-white rounded-lg backdrop-blur-md border-white/20 text-gray-700 pointer-events-auto hover:bg-white/98 transition-all cursor-default group'>
        <CardContent>
          <ImmigrationFormField />
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchPanel;
