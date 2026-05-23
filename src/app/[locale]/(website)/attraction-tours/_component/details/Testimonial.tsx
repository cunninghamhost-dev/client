'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ConstTestimonials as testimonials } from '@/lib/constants/website/attractionstour/tour-details.constants';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
//import { cn } from '@/lib/utils';

const Testimonial = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  //const [photoEmblaRef, photoEmblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrevTestimonial = () => emblaApi?.scrollPrev();
  const scrollNextTestimonial = () => emblaApi?.scrollNext();
  return (
    <div className='my-4 px-12 flex flex-col gap-4'>
      <div className='flex items-start justify-between'>
        <Label className='font-bold text-xl leading-7'>What guests loved most</Label>
        <Button variant={'link'} className='text-[#009DC4] text-sm p-0 ml-2'>
          See all reviews
        </Button>
      </div>
      <div className='relative'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex'>
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className='flex-[0_0_100%] md:flex-[0_0_50%] px-4'
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Card className='h-full'>
                  <CardContent className='px-4'>
                    <div className='flex flex-col gap-2'>
                      <div className='flex items-center gap-3 mb-3'>
                        <div className='w-8 h-8 rounded-full bg-[#009DC4] flex items-center justify-center text-white text-sm leading-5 font-bold'>
                          {testimonial.initial}
                        </div>
                        <div className='space-y-3'>
                          <p className='font-medium text-sm leading-5'>{testimonial.name}</p>
                        </div>
                      </div>
                      <p className='text-base leading-6'>{testimonial.review}</p>
                      <p className='text-xs leading-[18px] text-[#666666]'>
                        Posted {testimonial.date} on {testimonial.platform}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        <Button
          variant='default'
          size='sm'
          className='absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-[#c42c18] hover:bg-orange-700 cursor-pointer'
          onClick={scrollPrevTestimonial}
        >
          <ChevronLeft className='w-4 h-4' />
        </Button>
        <Button
          variant='default'
          size='sm'
          className='absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-[#c42c18] hover:bg-orange-700 cursor-pointer'
          onClick={scrollNextTestimonial}
        >
          <ChevronRight className='w-4 h-4' />
        </Button>
      </div>
    </div>
  );
};

export default Testimonial;
