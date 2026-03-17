'use client';
import { ITabItemMB } from '@/types/default.type';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface ICustomTabPanelProps {
  tabs: ITabItemMB[];
}

const HeroTabPanelMobile: React.FC<ICustomTabPanelProps> = ({ tabs }) => {
  const firstTabValue = tabs[0]?.value || '';
  const [activeTab, setActiveTab] = useState<string>(firstTabValue || 'flight');
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const animateIn = (key: string) => {
    const el = contentRefs.current[key];
    if (el) {
      gsap.fromTo(el, { autoAlpha: 0, y: 20 }, { duration: 1, autoAlpha: 1, y: 0 });
    }
  };
  useEffect(() => {
    if (!contentRefs.current[activeTab]) return;
    animateIn(activeTab);
  }, [activeTab]);
  return (
    <Tabs
      value={activeTab}
      defaultValue={firstTabValue}
      onValueChange={setActiveTab}
      className='lg:relative w-full bg-transparent px-4'
    >
      <TabsList className='bg-transparent grid grid-cols-4 items-center w-full gap-2'>
        {tabs.map(({ value, label, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className='block space-y-2 cursor-pointer py-2 hover:bg-gray-50 data-[state=active]:text-white bg-white border border-[#D9E2E8] rounded-[8px] data-[state=active]:bg-[#E63A24] hover:data-[state=active]:cursor-default'
          >
            <div className='flex gap-2 items-center justify-center w-full'>{Icon}</div>
            <span className='text-[12px] leading-[150%] text-wrap'>{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className='mt-6'>
          <Card className='destination-card w-full py-6 mt-4 mx-auto lg:mt-0 lg:w-[160%] lg:absolute lg:top-30 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-[0%] bg-white rounded-lg backdrop-blur-md border-white/20 text-gray-700 pointer-events-auto hover:bg-white/98 transition-all cursor-default group'>
            <CardContent className='px-3'>{tab.content}</CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default HeroTabPanelMobile;
