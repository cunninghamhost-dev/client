import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import useCarRentalProfileStore from '@/store/website/carrentals/carprofile.store';

const CarLocation = () => {
  const { car_location } = useCarRentalProfileStore();
  return (
    <div className='flex flex-col gap-3 w-full'>
      <Card>
        <CardContent>
          <div className='flex flex-col gap-4 text-[#1A1A1A]'>
            <div className='space-y-0.5'>
              <h3 className='font-semibold text-base md:text-lg lg:text-xl leading-[18px] md:leading-6'>
                Car rental location
              </h3>
              <span className=' font-semibold text-sm leading-[18px]'>Pick-up & Drop-off</span>
            </div>
            {car_location && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {car_location.map(({ title, description, icon: Icon }) => (
                  <div key={title} className='flex flex-col items-start gap-2 text-sm leading-[18px]'>
                    <div className='flex gap-1'>
                      {Icon && <Icon size={18} />}
                      <span>{title}</span>
                    </div>
                    {description && (
                      <div className='ml-6 flex flex-col items-start gap-1'>
                        {description.map((desc) => (
                          <h6 key={desc}>{desc}</h6>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarLocation;
