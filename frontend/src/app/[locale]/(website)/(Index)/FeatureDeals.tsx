import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import GreatDeal from './custom/GreatDeal';
import ThumbnailDisplay from './custom/ThumbnailDisplay';

const FeatureDeals = () => {
  return (
    <section className='w-full max-w-[62rem] mx-auto overflow-hidden my-16'>
      <Card className='relative rounded-xl bg-[#E6F5F9] p-0'>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 overflow-hidden scroll-smooth px-4 '>
            <GreatDeal />
            <div className='hidden lg:flex flex-col items-center justify-center'>
              <ThumbnailDisplay />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FeatureDeals;
