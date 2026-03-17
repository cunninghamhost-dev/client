import { Car, Hotel, Mountain, Plane, Train } from 'lucide-react';
import React from 'react';

const menuItems = [
  { icon: Plane, label: 'Flight' },
  { icon: Hotel, label: 'Hotels & Homes' },
  { icon: Train, label: 'Trains' },
  { icon: Car, label: 'Cars' },
  { icon: Mountain, label: 'Attractions & Tours' },
];

const ImmigrationTypeSubMenu = () => {
  return (
    <div className='flex justify-center space-x-10 md:space-x-16 mt-10 text-white text-sm md:text-base'>
      {menuItems.map(({ icon: Icon, label }, index) => (
        <div key={index} className='flex gap-2 items-center cursor-pointer hover:text-gray-300 transition-colors'>
          <Icon className='h-4 w-4' />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default ImmigrationTypeSubMenu;
