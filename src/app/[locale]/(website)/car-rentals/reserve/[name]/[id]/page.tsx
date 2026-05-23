import { Card, CardContent } from '@/components/ui/card';
import { CalendarCheck2 } from 'lucide-react';
import React from 'react';
import DriversProfile from '../../custom/DriversProfile';
import DriverCarProtection from '../../custom/DriverCarProtection';
import ConfirmationEmail from '../../custom/ConfirmationEmail';
import ImportantInformation from '../../custom/ImportantInformation';
import PolicyStatement from '../../custom/PolicyStatement';
import { Separator } from '@/components/ui/separator';
import CarProfileReserved from '../../custom/CarProfileReserved';
import CarReserveCharges from '../../custom/CarReserveCharges';

interface ICarRentalReserveProps {
  params: Promise<{
    name: string;
    id: string;
  }>;
}

const CarRentalReserveBrand = async ({ params }: ICarRentalReserveProps) => {
  const { name, id } = await params;
  console.log(name);
  console.log(id);

  return (
    <main className='min-h-screen w-full flex items-start justify-center'>
      <div className='mt-4 relative max-w-[1400px] w-full py-2 flex flex-col gap-4 items-start px-16'>
        <h3 className='font-bold text-[1.563rem] leading-[33.75px]'>{`Secure booking - only takes 2 minutes!`}</h3>
        <Card className='rounded-sm w-full p-3'>
          <CardContent>
            <div className='flex item-start gap-4'>
              <CalendarCheck2 size={40} />
              <div className='flex flex-col gap-1'>
                <h6 className='text-base leading-[21.18px] text-[#1A1A1A] tracking-1'>
                  Free cancellation if plans change
                </h6>
                <span className='text-sm leading-[18.35px] text-[#666666]'>
                  Cancel free of charge by Wed, Aug 27 10:30am.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='w-full grid grid-cols-1 md:grid-cols-3 items-start gap-2'>
          <div className='col-span-2 w-full flex flex-col gap-4 items-start'>
            <DriversProfile />
            <DriverCarProtection />
            <ConfirmationEmail />
            <ImportantInformation />
            <PolicyStatement />
          </div>
          <div className='col-span-1 w-full mt-4 flex flex-col gap-4 px-4'>
            <Separator orientation='horizontal' className='w-full' />
            <CarProfileReserved />
            <Separator orientation='horizontal' className='w-full' />
            <CarReserveCharges />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarRentalReserveBrand;
