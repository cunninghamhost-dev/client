import React from 'react';
import TransitionContentForm from '../TransferContentForm';

const AirportToHotelTabSection = () => {
  return (
    <div className='booking-content'>
      <TransitionContentForm isAirportFirst={true} />
    </div>
  );
};

export default AirportToHotelTabSection;

// import React from 'react';
// import AirportTransitionForm from '../../AirportTransitionForm';

// const AirportToHotelTab = () => {
//   return (
//     <div className='booking-content'>
//       <AirportTransitionForm isAirportFirst={true} />
//     </div>
//   );
// };

// export default AirportToHotelTab;
