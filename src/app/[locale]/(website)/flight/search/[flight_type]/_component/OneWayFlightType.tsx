import { ICategoryTabItem } from '@/types/default.type';
import React from 'react';
import CheapestFlightCategory from './category/CheapestFlightCategory';
import CategoryPanelProfile from './CategoryPanelProfile';

const categoryTabs: ICategoryTabItem[] = [
  {
    value: 'cheapest',
    label: 'Cheapest',
    amount: '$1,189',
    timeline: '35h 05m',
    content: <CheapestFlightCategory />,
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
];

const OneWayFlightType = () => {
  return (
    <div className='w-full'>
      <CategoryPanelProfile tabs={categoryTabs} />
    </div>
  );
};

export default OneWayFlightType;
