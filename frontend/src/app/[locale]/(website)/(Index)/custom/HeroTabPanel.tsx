'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { ITabItem } from '@/types/default.type';
import gsap from 'gsap';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslations } from 'next-intl';

interface ICustomTabPanelProps {
  tabs: ITabItem[];
}

const HeroTabPanel: React.FC<ICustomTabPanelProps> = ({ tabs }) => {
  const t = useTranslations('services.tabs');
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
    animateIn(activeTab);
  }, [activeTab]);
  return (
    <Tabs
      value={activeTab}
      defaultValue={firstTabValue}
      onValueChange={setActiveTab}
      className='relative w-full bg-transparent'
    >
      <TabsList className='bg-transparent md:bg-[#F5F5F5] flex flex-wrap md:flex-nowrap w-full justify-start gap-2 overflow-x-auto'>
        {tabs.map(({ value, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className='text-base cursor-pointer text-[#666666] hover:text-black hover:bg-gray-50 data-[state=active]:text-white data-[state=active]:bg-[#E63A24] hover:data-[state=active]:cursor-default'
          >
            <div className='flex gap-2 items-center justify-center w-full'>
              {Icon ? <Icon className=' h-4 w-4' /> : ''}
              <span>{t(value)}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <Card className='destination-card h-auto absolute top-[35px] left-1/2 transform -translate-x-1/2 -translate-y-[0%] w-[160%] bg-white rounded-lg backdrop-blur-md border-white/20 text-gray-700 pointer-events-auto hover:bg-white/98 transition-all cursor-default group'>
            <CardContent className='px-4 flex justify-center items-center h-auto'>
              <ScrollArea className='h-[150px] w-full'>{tab.content}</ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default HeroTabPanel;
