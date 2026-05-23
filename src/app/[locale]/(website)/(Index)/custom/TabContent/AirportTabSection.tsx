import { ITabItem } from '@/types/default.type';
import React from 'react';
import AirportToHotelTab from './airport-section/AirportToHotelTab';
import AirportTabPanel from '@/components/defaults/tabpanels/AirportTabPanel';
import HotelToAirport from './airport-section/HotelToAirport';

const AirportTabSection = () => {
  const airportTab: ITabItem[] = [
    {
      value: 'airport_hotel',
      label: 'Airport to hotel',
      content: <AirportToHotelTab />,
    },
    {
      value: 'hotel_airport',
      label: 'Hotel to airport',
      content: <HotelToAirport />,
    },
    {
      value: 'roundtrip',
      label: 'Round trip',
      content: <h3>Round trip section still undergoing development</h3>,
    },
  ];
  return <AirportTabPanel tabs={airportTab} />;
};

export default AirportTabSection;
