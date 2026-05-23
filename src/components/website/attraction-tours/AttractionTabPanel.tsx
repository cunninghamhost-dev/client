'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { ICustomTabPanelProps } from '@/types/default.type';
import gsap from 'gsap';

const AttractionTabPanel: React.FC<ICustomTabPanelProps> = ({ tabs }) => {
  const firstTabValue = tabs[0]?.value || '';
  const [activeTab, setActiveTab] = useState<string>(firstTabValue || 'top_picks');
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
      className='relative w-full rounded-none shadow-none border-none'
    >
      <TabsList className='bg-[#F5F5F5] border shadow-2xl rounded-[6px] p-1 flex flex-wrap md:flex-nowrap w-full justify-start gap-2 overflow-x-auto'>
        {tabs.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className='text-base cursor-pointer text-[#1A1A1A] hover:bg-gray-50 data-[state=active]:bg-white hover:data-[state=active]:cursor-default'
          >
            <div className='flex gap-2 items-center justify-center w-full'>
              <span className='text-sm leading-5 text-center'>{label}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AttractionTabPanel;
