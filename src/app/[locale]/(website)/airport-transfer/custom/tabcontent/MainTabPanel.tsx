'use client';
import { ITabPanelProps } from '@/types/default.type';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MainTabPanel: React.FC<ITabPanelProps> = ({ tabs, index }) => {
  const firstTabValue = index ? tabs[index]?.value : tabs[0]?.value;
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
    <div className='w-full'>
      <Tabs value={activeTab} defaultValue={firstTabValue} onValueChange={setActiveTab} className='relative w-full'>
        <TabsList className='px-4 flex space-x-8 w-full items-start justify-start gap-2 overflow-x-auto rounded-none shadow-none bg-transparent hover:bg-transparent'>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='items-center justify-center border border-[#1A1A1A] rounded-md py-2 px-3.5 mr-6 text-[#192024] bg-transparent data-[state=active]:bg-[#E6F5F9] flex-none focus-visible:border focus-visible:ring-ring/1 focus-visible:outline-none overflow-hidden data-[state=active]:shadow-md cursor-pointer'
            >
              <h6 className='font-semibold  text-sm leading-5 text-center'>{tab.label}</h6>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className='w-full mt-4'>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default MainTabPanel;
