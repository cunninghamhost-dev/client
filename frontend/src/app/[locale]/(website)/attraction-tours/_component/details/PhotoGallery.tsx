'use client';
import { Label } from '@/components/ui/label';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ConstTourPhotos as photos } from '@/lib/constants/website/attractionstour/tour-details.constants';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PhotoGallery = () => {
  const [photoEmblaRef, photoEmblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrevPhoto = () => photoEmblaApi?.scrollPrev();
  const scrollNextPhoto = () => photoEmblaApi?.scrollNext();
  return (
    <div className='my-4 px-12 flex flex-col gap-4'>
      <Label className='font-bold text-xl leading-7'>Traveller Photo</Label>
      <div className='relative'>
        <div className='overflow-hidden rounded-lg' ref={photoEmblaRef}>
          <div className='flex'>
            {photos.map((photo) => (
              <div key={photo.id} className='flex-[0_0_100%] md:flex-[0_0_50%] px-2'>
                <motion.img
                  src={photo.url}
                  alt={photo.alt}
                  className='w-full h-64 object-cover rounded-lg'
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            ))}
          </div>
        </div>
        <Button
          variant='default'
          size='sm'
          className='absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 p-0 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-900'
          onClick={scrollPrevPhoto}
        >
          <ChevronLeft className='w-4 h-4' />
        </Button>
        <Button
          variant='default'
          size='sm'
          className='absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 p-0 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-900'
          onClick={scrollNextPhoto}
        >
          <ChevronRight className='w-4 h-4' />
        </Button>
      </div>
    </div>
  );
};

export default PhotoGallery;
