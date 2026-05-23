import HeroMenuContent from '@/components/website/HeroMenuContent';
import { ILayoutProps } from '@/types/default.type';
import React from 'react';
import AirportSubMenu from '../custom/AirportSubMenu';

const AirportTransferLayout = ({ children }: ILayoutProps) => {
  return (
    <section className='airporttransfer-wrapper'>
      <div className='flex flex-col gap-8'>
        <div className='wrapper-content h-[12rem]'>
          <div className='wrapper-overlay'>
            <div className='container row-rep py-20 lg:py-12'>
              <div className='pb-0'>
                <div className='relative w-full flex flex-col justify-center items-center gap-2'>
                  <div className='flex justify-center items-center mt-4 overflow-hidden'>
                    <HeroMenuContent serviceType={3} />
                  </div>
                  <div className='absolute top-[90px] left-1/2 transform -translate-x-1/2 w-full max-w-[90%]'>
                    <AirportSubMenu />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className='mt-24 w-full min-h-screen max-w-[1070px] mx-auto px-4 sm:px-6 lg:px-8'>{children}</main>
      </div>
    </section>
  );
};

export default AirportTransferLayout;
