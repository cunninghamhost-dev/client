import { ITabItem } from '@/types/default.type';
import React from 'react';
import MainTabPanel from './MainTabPanel';
import AirportToHotelTabSection from './AirportToHotelTabSection';

const MainAirportTabSection = () => {
  const airportTab: ITabItem[] = [
    {
      value: 'airport_hotel',
      label: 'Airport to hotel',
      content: <AirportToHotelTabSection />,
    },
    {
      value: 'hotel_airport',
      label: 'Hotel to airport',
      content: <p>Hotel To Airport Here</p>,
    },
    {
      value: 'roundtrip',
      label: 'Round trip',
      content: <h3>Round trip section still undergoing development</h3>,
    },
  ];
  return <MainTabPanel tabs={airportTab} index={0} />;
};

export default MainAirportTabSection;
