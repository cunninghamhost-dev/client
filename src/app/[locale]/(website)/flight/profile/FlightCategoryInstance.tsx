'use client';
import React from 'react';
import { ICategoryTabItem } from '@/types/default.type';
import CheapestCategory from './category/CheapestCategory';
import CategoryProfile from './CategoryProfile';

const categoryTabs: ICategoryTabItem[] = [
  {
    value: 'cheapest',
    label: 'Cheapest',
    amount: '$1,189',
    timeline: '35h 05m',
    content: <CheapestCategory />,
  },
  {
    value: 'best',
    label: 'Best',
    amount: '$1,189',
    timeline: '25h 15m',
    // content: <RegistrationForm />,
  },
  {
    value: 'fastest',
    label: 'Fastest',
    amount: '$5,932',
    timeline: '17h 30m',
    // content: <RegistrationForm />,
  },
  {
    value: 'others',
    label: 'Other Sort',
    // content: <RegistrationForm />,
  },
];

const FlightCategoryInstance = () => {
  return (
    <div className='relative flex-[1_1_auto] flex flex-col gap-4 w-full'>
      {/* <h2>Just Testing</h2> */}
      <CategoryProfile tabs={categoryTabs} />
    </div>
  );
};

export default FlightCategoryInstance;
