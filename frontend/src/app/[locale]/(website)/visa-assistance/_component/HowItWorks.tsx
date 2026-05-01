'use client';

import * as React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react'; // No type import needed if not available
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmblaCarouselType } from 'embla-carousel';

interface VisaStep {
  id: string;
  title: string;
  description: string;
}

interface IVisaProcess {
  type: string;
  value: string;
  image: string;
  steps: VisaStep[];
}

// --- 1. DATA STRUCTURE ---
const visaProcesses: IVisaProcess[] = [
  {
    type: 'Student Visa',
    value: 'student-visa',
    image: '/images/travELER-woman.png',
    steps: [
      {
        id: '01',
        title: 'Fill out online application',
        description: 'Complete our easy online application and pay with credit card or PayPal.',
      },
      {
        id: '02',
        title: 'Receive document via email',
        description: "No need to deal with the embassy. We do it for you so you don't lose valuable time.",
      },
      {
        id: '03',
        title: 'Enter destination',
        description: 'Present your Passport and the Document we provide upon entry to the destination country.',
      },
    ],
  },
  {
    type: 'Work Permit',
    value: 'work-permit',
    image: '/images/work-permit-person.png',
    steps: [
      {
        id: '01',
        title: 'Submit Job Offer',
        description: 'Provide your official job offer and company details through our secure portal.',
      },
      {
        id: '02',
        title: 'We Handle the Paperwork',
        description: 'Our experts liaise with employers and immigration authorities to process your permit.',
      },
      {
        id: '03',
        title: 'Start Your New Job',
        description: 'Receive your work permit and get ready to begin your career in a new country.',
      },
    ],
  },
  {
    type: 'Immigration',
    value: 'immigration',
    image: '/images/family-immigrating.png',
    steps: [
      {
        id: '01',
        title: 'Initial Consultation',
        description: 'Schedule a consultation with our immigration lawyers to discuss your eligibility and options.',
      },
      {
        id: '02',
        title: 'Document Compilation',
        description: 'We guide you through gathering all necessary documents for a strong application.',
      },
      {
        id: '03',
        title: 'Residency Achieved',
        description: 'Upon approval, receive your residency documents and start your new life.',
      },
    ],
  },
] as const;

// --- 2. MAIN COMPONENT ---
export function HowItWorks() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentTabImage, setCurrentTabImage] = React.useState<string>(visaProcesses[0].image);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // const onSelect = React.useCallback((emblaApi: any) => {
  //   setSelectedSnap(emblaApi.selectedScrollSnap());
  // }, []);
  const onSelect = React.useCallback((api: EmblaCarouselType) => {
    api.selectedScrollSnap();
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const handleTabChange = (value: string) => {
    const selectedProcess = visaProcesses.find((p) => p.value === value);
    if (selectedProcess) {
      setCurrentTabImage(selectedProcess.image);
    }
  };

  return (
    <section className='w-full py-16 md:py-24 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>How it works</h2>
          <p className='text-gray-600 mt-2 max-w-2xl mx-auto'>
            Learn more about the process of each kind of Visa we can help you apply for
          </p>
        </div>

        <Tabs defaultValue={visaProcesses[0].value} className='w-full' onValueChange={handleTabChange}>
          {/* --- Scrollable Tabs List using Embla Carousel --- */}
          <div className='flex items-center justify-center relative'>
            <Button
              onClick={scrollPrev}
              variant='ghost'
              size='icon'
              className='hidden md:inline-flex absolute left-[-50px] top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-white shadow-md'
              disabled={!emblaApi?.canScrollPrev()}
            >
              <ChevronLeft className='h-6 w-6' />
            </Button>
            <div className='overflow-hidden w-full max-w-xl' ref={emblaRef}>
              <TabsList className='embla__container !flex-row !h-auto !p-0 bg-transparent'>
                {visaProcesses.map((process) => (
                  <TabsTrigger
                    key={process.value}
                    value={process.value}
                    className='embla__slide flex-shrink-0 text-gray-500 data-[state=active]:text-red-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none px-4 py-2 text-md font-medium'
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
          <div className='mt-12'>
            {visaProcesses.map((process) => (
              <TabsContent key={process.value} value={process.value}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                  {/* Left Side: Steps */}
                  <div className='space-y-8'>
                    {process.steps.map((step) => (
                      <div key={step.id} className='flex items-start space-x-4'>
                        <div className='flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg'>
                          {step.id}
                        </div>
                        <div>
                          <h3 className='text-lg font-semibold text-gray-800'>{step.title}</h3>
                          <p className='text-gray-600 mt-1'>{step.description}</p>
                        </div>
                      </div>
                    ))}
                    <div className='pt-4'>
                      <Button size='lg' className='bg-red-600 hover:bg-red-700'>
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
