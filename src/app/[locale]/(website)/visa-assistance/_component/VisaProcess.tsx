'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react'; // No type import needed if not available
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ConstVisaProcesses as processes } from '@/lib/constants/website/visa-assistance/visa.constant';
import { EmblaCarouselType } from 'embla-carousel';

export default function VisaProcess() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentTabImage, setCurrentTabImage] = useState(processes[0].image);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback((api: EmblaCarouselType) => {
    api.selectedScrollSnap();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const handleTabChange = (value: string) => {
    const selectedProcess = processes.find((p) => p.value === value);
    if (selectedProcess) {
      setCurrentTabImage(selectedProcess.image);
    }
  };

  return (
    <section className='w-full max-w-5xl mx-auto overflow-hidden py-8 md:py-12'>
      <div className='container mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-xl md:text-3xl lg:text-4xl xl:text-5xl leading-[155%] font-bold'>How it works</h2>
          <p className='text-[#666666] mt-2 max-w-xl md:max-w-3xl mx-auto text-base md:text-lg lg:text-xl leading-[150%]'>
            Learn more about the process of each kind of Visa we can help you apply for
          </p>
        </div>
        <Tabs defaultValue={processes[0].value} className='w-full' onValueChange={handleTabChange}>
          {/* --- Scrollable Tabs List using Embla Carousel --- */}
          <div className='flex items-center justify-center relative border-b border-gray-300'>
            <Button
              onClick={scrollPrev}
              variant='ghost'
              size='icon'
              className='hidden md:inline-flex absolute left-[-50px] top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-white hover:bg-orange-600 shadow-md cursor-pointer'
              disabled={!emblaApi?.canScrollPrev()}
            >
              <ChevronLeft className='h-6 w-6' />
            </Button>
            <div className='overflow-hidden w-full max-w-xl' ref={emblaRef}>
              <TabsList className='embla__container !flex-row !h-auto !p-0 bg-transparent gap-12'>
                {processes.map((process) => (
                  <TabsTrigger
                    key={process.value}
                    value={process.value}
                    className='embla__slide flex-shrink-0 text-[#666666] hover:text-gray-700 data-[state=active]:text-[#E63A24] data-[state=active]:shadow-none border-0 data-[state=active]:border-b-2 data-[state=active]:border-[#E63A24] data-[state=active]:bg-transparent rounded-none px-4 py-2 text-md font-medium cursor-pointer'
                  >
                    {process.type}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <Button
              onClick={scrollNext}
              variant='ghost'
              size='icon'
              className='hidden md:inline-flex absolute right-[-50px] top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-white shadow-md'
              disabled={!emblaApi?.canScrollNext()}
            >
              <ChevronRight className='h-6 w-6' />
            </Button>
          </div>
          {/* --- Tab Content Section --- */}
          <div className='mt-8'>
            {processes.map((process) => (
              <TabsContent key={process.value} value={process.value}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                  {/* Left Side: Steps */}
                  <div className='space-y-8 px-12'>
                    {process.steps.map((step) => (
                      <div key={step.id} className='flex items-start space-x-4'>
                        <div className='flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#E6F5F9] text-xl md:text-2xl lg:text-3xl'>
                          {step.id}
                        </div>
                        <div className='space-y-0'>
                          <h3 className='text-lg font-bold'>{step.title}</h3>
                          <p className='text-sm text-[#666666]'>{step.description}</p>
                        </div>
                      </div>
                    ))}
                    <div className='pt-4 px-4'>
                      <Button className='bg-[#E63A24] hover:bg-orange-700 rounded-[8px] py-3 px-5 font-semibold cursor-pointer'>
                        Learn More
                      </Button>
                    </div>
                  </div>
                  {/* Right Side: Image */}
                  <div className='hidden md:block'>
                    <Image
                      src={currentTabImage}
                      alt={process.type}
                      width={500}
                      height={750}
                      className='rounded-lg object-cover w-full h-full max-h-[500px]'
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
