import TabPanelControl from '@/components/defaults/TabPanelControl';
import { ITabItem } from '@/types/default.type';
import React from 'react';
import CarTabSection from './TabContent/CarTabSection';
import AirportTabSection from './TabContent/AirportTabSection';

const CarsTab: ITabItem[] = [
  {
    value: 'car_rentals',
    label: 'Car Rental',
    content: <CarTabSection />,
  },
  {
    value: 'airport_transfer',
    label: 'Airport Transfer',
    content: <AirportTabSection />,
  },
];

const CarRentals = () => {
  return <TabPanelControl tabs={CarsTab} />;
};

export default CarRentals;
