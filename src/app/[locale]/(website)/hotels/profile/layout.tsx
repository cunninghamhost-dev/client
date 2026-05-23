import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import HeroMenuContent from '@/components/website/HeroMenuContent';
import { heroProfileData } from '@/lib/constants/home.constant';
import React from 'react';
import HotelSubMenu from '../custom/HotelSubMenu';

interface ILayoutProps {
  children: React.ReactNode;
}

const HotelLayout = ({ children }: ILayoutProps) => {
  return (
    <section className='hotel-wrapper'>
      <div className='flex flex-col gap-8'>
        <div className='wrapper-content h-[15rem]'>
          <div className='wrapper-overlay'>
            <div className='container row-rep py-20 lg:py-12'>
              <div className='pb-0'>
                <div className='relative w-full flex flex-col justify-center items-center gap-2'>
                  <div className='flex flex-col md:flex-row justify-center md:justify-baseline gap-4 md:gap-12 mt-8 '>
                    {heroProfileData.map((profile, index) => (
                      <div key={profile.name} className='flex items-center gap-2 w-full'>
                        <Separator orientation='vertical' className={index === 0 ? ' hidden' : ''} />
                        <Button
                          variant={'ghost'}
                          size={'lg'}
                          className='w-fit hover:bg-transparent cursor-pointer hover:scale-110 px-2'
                        >
                          <span className=' font-light text-gray-100 hover:text-gray-300 text-center text-sm md:text-base leading-5'>
                            {profile.name}
                          </span>
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className='flex justify-center items-center mt-4 overflow-hidden'>
                    <HeroMenuContent serviceType={2} />
                  </div>
                  <div className='absolute top-[170px] left-1/2 transform -translate-x-1/2 w-full max-w-[90%]'>
                    <HotelSubMenu />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className='mt-14 w-full max-w-[1070px] mx-auto px-4 sm:px-6 lg:px-8'>{children}</main>
      </div>
    </section>
  );
};

export default HotelLayout;
