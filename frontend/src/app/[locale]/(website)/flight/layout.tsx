import React from 'react';
import { heroProfileData } from '@/lib/constants/home.constant';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import HeroMenuContent from '@/components/website/HeroMenuContent';
import FlightSubMenu from './custom/FlightSubMenu';

interface ILayoutProps {
  children: React.ReactNode;
}

const FlightLayout = ({ children }: ILayoutProps) => {
  return (
    <section>
      <div className='flight-wrapper'>
        <div className='flex flex-col gap-8 lg:gap-16'>
          <div className='wrapper-content h-auto lg:h-48'>
            <div className='wrapper-overlay'>
              <div className='container row-rep py-20 lg:py-12'>
                <div className='pb-0'>
                  <div className='lg:relative w-full flex flex-col justify-center items-center gap-0'>
                    <div className='flex flex-row justify-center md:justify-baseline gap-4 md:gap-12 my-4 border md:border-none rounded-xl md:rounded-none bg-[rgba(102,102,102,0.4)] md:bg-transparent'>
                      {heroProfileData.map((profile, index) => (
                        <div key={profile.name} className='flex items-center gap-2 w-full'>
                          <Separator orientation='vertical' className={index === 0 ? ' hidden' : 'inline'} />
                          <Button
                            variant={'ghost'}
                            size={'lg'}
                            className='w-fit hover:bg-transparent cursor-pointer hover:scale-110 px-2'
                          >
                            <span className='text-wrap lg:text-nowrap font-light text-gray-100 hover:text-gray-300 text-center text-sm md:text-base leading-5'>
                              {profile.name}
                            </span>
                          </Button>
                        </div>
                      ))}
                    </div>
                    {/* <h1 className='hidden lg:block mt-4 max-w-2xl text-xl font-bold text-center text-white md:text-3xl lg:text-4xl md:leading-[150%]'>
                      From Dreams to Destinations, We Take You There
                    </h1> */}
                    <div className='flex flex-col justify-center items-center overflow-hidden'>
                      <HeroMenuContent serviceType={1} />
                    </div>
                    <div className='lg:absolute lg:top-27.5 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-full mx-auto lg:max-w-[90%]'>
                      <FlightSubMenu />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full xl:max-w-267.5 mx-auto px-4 sm:px-6 lg:px-8 min-h-screen lg:mt-20'>{children}</div>
        </div>
      </div>
    </section>
  );
};

export default FlightLayout;
