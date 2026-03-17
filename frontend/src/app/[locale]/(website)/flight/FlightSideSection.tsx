import React from 'react';
import NotificationTrackPrice from './custom/NotificationTrackPrice';
import InstructionsFlightProfile from './custom/InstructionsFlightProfile';

const FlightSideSection = () => {
  return (
    <aside>
      <div className='flex flex-col items-start gap-4'>
        <NotificationTrackPrice />
        <InstructionsFlightProfile />
      </div>
    </aside>
  );
};

export default FlightSideSection;
