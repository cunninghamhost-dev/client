import React from 'react';
import { ILayoutProps } from '@/types/default.type';
import HeroMenuContent from '@/components/website/HeroMenuContent';

const AttractionDetailsLayout = ({ children }: ILayoutProps) => {
  return (
    <main className='attractions-details-wrapper'>
      <div className='flex flex-col gap-8'>
        <section className='wrapper-content h-[8rem]'>
          <div className='wrapper-overlay'>
            <div className='container row-rep py-20 lg:py-12'>
              <div className='pb-0'>
                <div className='relative w-full flex flex-col justify-center items-center gap-2'>
                  <div className='flex justify-center items-center mt-4 overflow-hidden'>
                    <HeroMenuContent serviceType={5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='w-full max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8'>{children}</div>
      </div>
    </main>
  );
};

export default AttractionDetailsLayout;
