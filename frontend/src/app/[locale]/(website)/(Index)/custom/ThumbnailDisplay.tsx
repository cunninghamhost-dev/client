import Image from 'next/image';
import React from 'react';

const ThumbnailDisplay = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center'>
      <div className='flex flex-col gap-1 transform transition duration-500 hover:scale-105 hover:shadow-xl pt-8'>
        <Image src={'/images/main/sky_plane.png'} alt='Flying Plane' width={184.66} height={187.19} />
        <Image src={'/images/main/dinning_table.png'} alt='Dinning Table' width={184.66} height={187.19} />
      </div>
      <div className='flex flex-col gap-1 transform transition duration-500 hover:scale-105 hover:shadow-xl pb-8'>
        <Image src={'/images/main/space_train.png'} alt='Space Train' width={184.66} height={187.19} />
        <Image src={'/images/main/road_car.png'} alt='Road Car' width={184.66} height={187.19} />
      </div>
    </div>
  );
};

export default ThumbnailDisplay;
