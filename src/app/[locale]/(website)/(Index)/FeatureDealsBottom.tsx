import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import GreatDeal from './custom/GreatDeal';
import ThumbnailDisplay from './custom/ThumbnailDisplay';

const FeatureDealsBottom = () => {
  return (
    <section className='w-full max-w-[62rem] mx-auto overflow-hidden my-16'>
      <Card className='relative rounded-xl bg-[#E6F5F9] p-0'>
        <CardContent>
          <div className='flex flex-row gap-8 overflow-hidden scroll-smooth'>
            <ThumbnailDisplay />
            <GreatDeal />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FeatureDealsBottom;
