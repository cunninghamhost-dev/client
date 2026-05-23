import React from 'react';
import SVGIcon from '@/components/defaults/SVGIcons';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import useCarRentalProfileStore from '@/store/website/carrentals/carprofile.store';
import { FaCheck } from 'react-icons/fa';

const PricingDetails = ({ name, id }: { name: string; id: string }) => {
  const router = useRouter();
  const { rental_per_day, total_amount, amenities } = useCarRentalProfileStore();

  const handleReserveCar = () => {
    router.push(`/car-rentals/reserve/${name}/${id}`);
  };
  return (
    <div className='flex flex-col gap-4 w-full text-[#1A1A1A]'>
      <Card>
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <div className='inline-flex space-x-1 '>
                <h3 className='text-xl md:text-2xl lg:text-[28px] leading-6 md:leading-7 lg:leading-8'>{`$${rental_per_day}`}</h3>
                <span className='text-sm leading-4 mt-2.5'>per day</span>
              </div>
              {amenities && (
                <div className='flex flex-col gap-1'>
                  {amenities.map((item, index) => (
                    <span
                      key={item}
                      className={`text-sm leading-4 ${index === 0 ? ' text-[#148148]' : 'text-[#1A1A1A]'}`}
                    >
                      {item}
                    </span>
                  ))}
                  <span className={`text-sm leading-4`}>Reserve without a credit card</span>
                </div>
              )}
            </div>
            <Separator orientation='horizontal' />
            <div className='flex flex-col gap-2'>
              <span className={`text-sm leading-4`}>Additional benefits with this car rental</span>
              <div className=' inline-flex space-x-3'>
                <FaCheck />
                <span className={`text-sm leading-4`}>Online check-in</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='px-8 flex flex-col gap-3 w-full'>
        <div className='flex flex-col gap-1 w-full'>
          <h4 className='font-semibold text-base md:text-lg lg:text-xl leading-5 md:leading-6 lg:leading-7'>
            Price Details
          </h4>
          <span className='font-semibold text-sm leading-4'>Pay at pick-up</span>
        </div>
        <div className='flex items-start justify-between'>
          <div className='flex flex-col gap-1 w-full'>
            <h6 className='text-sm leading-4'>Car rental fee x 1 day</h6>
            <span className='text-xs leading-3'>{`$${total_amount} per day`}</span>
          </div>
          <div className='flex items-end text-right'>
            <span className='text-sm leading-4'>{`$${total_amount}`}</span>
          </div>
        </div>
        <div className='mt-4 flex items-start justify-between'>
          <h5 className='text-sm leading-[18px]'>Taxes and fees</h5>
          <div className='flex items-end text-right'>
            <h5 className='text-sm leading-[18px]'>$4.00</h5>
          </div>
        </div>
        <Separator className='my-2' orientation='horizontal' />
        <div className='flex flex-col gap-2'>
          <div className='flex items-start justify-between font-semibold text-base leading-5'>
            <span>Total</span>
            <div className='flex items-end'>
              <span>$116</span>
            </div>
          </div>
          <div className='mt-1 px-2 flex items-start gap-2'>
            <SVGIcon fileName='icon-tag-circled.svg' alt='Tagged-Icon' />
            <span className=' mt-1 text-sm leading-4'>11% - You save $13</span>
          </div>
          <div className='mt-3 flex flex-col gap-2 text-sm leading-4'>
            <div className='flex items-start justify-between'>
              <span>Pay at pick-up</span>
              <div className='flex items-end'>
                <span>$116</span>
              </div>
            </div>
            <div className='flex items-start justify-between'>
              <span>Pay now</span>
              <div className='flex items-end'>
                <span>$0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Button
          className='w-full bg-transparent border-[#E63A24] text-[#E63A24] font-bold text-base hover:bg-[#E63A24] hover:text-white cursor-pointer'
          variant={'outline'}
          onClick={handleReserveCar}
        >
          Reserve
        </Button>
        <span className='text-xs leading-4 text-center'>You will not be charged until pickup</span>
      </div>
    </div>
  );
};

export default PricingDetails;
