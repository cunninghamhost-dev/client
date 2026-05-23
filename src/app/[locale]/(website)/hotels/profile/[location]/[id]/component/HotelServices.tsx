'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ITabItem } from '@/types/default.type';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ServiceOverview from './custom/ServiceOverview';

const tabs: ITabItem[] = [
  {
    value: 'overview',
    label: 'Overview',
    content: <ServiceOverview />,
  },
  {
    value: 'about',
    label: 'About',
    content: <p>About Content Here</p>,
  },
  {
    value: 'rooms',
    label: 'Rooms',
    content: <p>Rooms Content Here</p>,
  },
  {
    value: 'accessibility',
    label: 'Accessibility',
    content: <p>Accessibility Content Here</p>,
  },
  {
    value: 'policies',
    label: 'Policies',
    content: <p>Policies Content Here</p>,
  },
];

const HotelServices = () => {
  const firstTabValue = tabs[0]?.value || '';
  const [activeTab, setActiveTab] = useState<string>(firstTabValue);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const animateIn = (key: string) => {
    const el = contentRefs.current[key];
    if (el) {
      gsap.fromTo(el, { autoAlpha: 0, y: 20 }, { duration: 1, autoAlpha: 1, y: 0 });
    }
  };
  useEffect(() => {
    animateIn(activeTab);
  }, [activeTab]);
  return (
    <div className='row mt-8 px-4'>
      <Tabs value={activeTab} defaultValue={firstTabValue} onValueChange={setActiveTab} className='relative w-full'>
        <Card className='w-full rounded-none py-3'>
          <CardContent>
            <div className='w-full flex items-start justify-between'>
              <TabsList className='flex w-full justify-start gap-3 overflow-x-auto rounded-none bg-transparent'>
                {tabs.map(({ value, label }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className='text-base text-[#191E3B] hover:text-black hover:bg-gray-50 data-[state=active]:border-b-2 data-[state=active]:border-b-[#E63A24] rounded-none justify-baseline flex-none focus-visible:border-none focus-visible:ring-ring/0 focus-visible:outline-none overflow-hidden data-[state=active]:shadow-none hover:data-[state=active]:bg-gray-100 cursor-pointer'
                  >
                    <div className='w-full'>
                      <span className='text-sm leading-5 font-semibold '>{label}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className='flex items-end justify-end'>
                <Button
                  variant={'default'}
                  className='bg-[#E63A24] text-white hover:bg-orange-700 text-sm leading-5 py-2'
                >
                  Select a room
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <Card className='my-4 destination-card w-full bg-white rounded-md backdrop-blur-md border-white/20 hover:bg-white/80 transition-all group'>
              <CardContent>{tab.content}</CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HotelServices;
