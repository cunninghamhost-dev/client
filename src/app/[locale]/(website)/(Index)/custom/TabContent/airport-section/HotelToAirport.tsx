import React from 'react';
import AirportTransitionForm from '../../AirportTransitionForm';

const HotelToAirport = () => {
  return (
    <div className='booking-content'>
      <AirportTransitionForm isAirportFirst={false} />
    </div>
  );
};

export default HotelToAirport;
