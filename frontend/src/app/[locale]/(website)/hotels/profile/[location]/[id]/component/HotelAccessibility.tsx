import React, { ComponentType, SVGProps } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import HouseIcon from '@/assets/icons/icon-house.svg';
import DoorOpenIcon from '@/assets/icons/icon-door-open.svg';

interface IAccessibilityProps {
  title: string;
  description: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  others?: string;
}

const accessibilities: IAccessibilityProps[] = [
  {
    title: 'Common areas',
    description: 'Wheelchair accessible (may have limitations)',
    others: 'Elevator (28 inch wide door)',
    icon: HouseIcon,
  },
  {
    title: 'Rooms',
    description: 'Smooth flooring in room',
    icon: DoorOpenIcon,
  },
];

const HotelAccessibility = () => {
  return (
    <Card>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-[#191E3B]'>
          <div className='flex flex-col gap-4 items-start'>
            <h2 className='text-xl md:text-2xl lg:text-[28px] leading-6 md:leading-7 lg:leading-9'>Accessibility</h2>
            <div className='flex flex-col gap-2'>
              <span className='text-sm leading-[22.04px]'>
                If you have requests for specific accessibility needs, please contact the property using the information
                on the reservation confirmation received after booking.
              </span>
            </div>
          </div>
          {accessibilities.map(({ title, description, icon: Icon, others }) => (
            <div key={title} className='flex flex-col gap-4 items-start'>
              <div className='inline-flex space-x-1'>
                {Icon && <Icon />}
                <h2 className='text-lg md:text-xl leading-6'>{title}</h2>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-sm md:text-[0.964rem] leading-3.5 md:leading-[22.04px]'>{description}</span>
                {others && <span className='text-[13px] leading-4'>{others}</span>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelAccessibility;
