import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Share } from 'lucide-react';
import React from 'react';
import { TbArrowBack } from 'react-icons/tb';

const PropertyCard = () => {
  return (
    <Card className='w-full rounded-none py-2'>
      <CardContent>
        <div className='w-full flex items-start justify-between'>
          <Button className='text-sm md:text-base text-[#1668E3] leading-5' variant={'ghost'}>
            <TbArrowBack />
            <span>See all properties</span>
          </Button>
          <div className='flex items-end gap-2 justify-end'>
            <Button variant={'outline'} className='bg-transparent flex items-center gap-2'>
              <Share size={14} className='text-[#1668E3]' />
              <span className='text-sm md:text-base leading-5 text-[#191E3B]'>Share</span>
            </Button>
            <Button variant={'outline'} className='bg-transparent flex items-center gap-2'>
              <Heart size={20} className='text-[#E61E43]' />
              <span className='text-sm md:text-base leading-5 text-[#191E3B]'>Save</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
