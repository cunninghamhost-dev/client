import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

const HotelPolicies = () => {
  return (
    <Card>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-[#191E3B]'>
          <div className='col-span-1'>
            <h2 className='text-lg md:text-xl lg:text-2xl leading-normal md:leading-7 lg:leading-8'>Policies</h2>
          </div>
          <div className='col-span-2 flex flex-col gap-2 items-start'>
            <div className='flex items-start gap-3'>
              <div className='block space-y-2 w-full max-w-[320px]'>
                <h3 className='text-base md:text-[1.353rem] leading-5 md:leading-6'>Check-In</h3>
                <span className='text-[0.964rem] leading-5'>
                  Check-in start time: 2:00 PM; Check-in end time: anytime
                </span>
              </div>
              <div className='block space-y-2'>
                <h3 className='text-base md:text-[1.353rem] leading-5 md:leading-6'>Check-Out</h3>
                <span className='text-[0.964rem] leading-5'>Check-out before noon</span>
              </div>
            </div>
            <div className='block space-y-1.5'>
              <span className='text-[0.948rem] leading-5'>Minimum check-in age: 18</span>
              <h3 className='text-base md:text-[1.353rem] leading-5 md:leading-6'>Special check-in instructions</h3>
              <span className='text-[0.948rem] leading-5'>
                Front desk staff will greet guests on arrival at the property
              </span>
            </div>
            <div className='block space-y-1.5'>
              <h3 className='text-base md:text-[1.353rem] leading-5 md:leading-6'>Access methods</h3>
              <span className='text-[0.948rem] leading-5'>Staffed front desk</span>
            </div>
            <div className='block space-y-1.5'>
              <h3 className='text-base md:text-[1.353rem] leading-5 md:leading-6'>Pets</h3>
              <span className='text-[0.948rem] leading-5'>
                Pets allowed for an extra charge of EUR 6 per pet, per night
              </span>
            </div>
            <div className='block space-y-2.5'>
              <span className='text-[0.948rem] leading-5'>Service animals are welcome, and are exempt from fees</span>
              <h3 className='text-base md:text-[1.353rem] leading-5 md:leading-6'>Children and extra beds</h3>
              <span className='text-[0.948rem] leading-5'>Children are welcome</span>
              <span className='text-[0.948rem] leading-5'>Rollaway/extra beds are not available</span>
            </div>
            <div className='block space-y-2.5 mt-2'>
              <span className='text-[0.948rem] leading-5'>Cribs (infant beds) are not available</span>
              <h3 className='text-base md:text-[1.353rem] leading-5 md:leading-[25px]'>Property payment types</h3>
            </div>
            <div className='flex items-start gap-0'>
              <Image
                src={'/images/main/payment/img-america-express.png'}
                alt='America Express'
                quality={95}
                width={109.71}
                height={69.29}
              />
              <Image
                src={'/images/main/payment/img-master-card.png'}
                alt='Master Card'
                quality={95}
                width={109.71}
                height={69.29}
              />
              <Image src={'/images/main/payment/img-visa.png'} alt='Visa' quality={95} width={124.63} height={69.29} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelPolicies;
