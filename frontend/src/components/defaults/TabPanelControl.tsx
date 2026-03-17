'use client';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { ITabItem } from '@/types/default.type';

interface ICustomTabPanelProps {
  tabs: ITabItem[];
}

const TabPanelControl: React.FC<ICustomTabPanelProps> = ({ tabs }) => {
  const firstTabValue = tabs[0]?.value;
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
        <TabsList className='flex space-x-4 lg:space-x-8 w-full items-start justify-start gap-2 overflow-x-auto rounded-none shadow-none bg-transparent hover:bg-transparent'>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='items-start justify-start pr-6 data-[state=active]:border-b-4 data-[state=active]:border-b-[#E63A24] rounded-none flex-none focus-visible:border-none focus-visible:ring-ring/0 focus-visible:outline-none overflow-hidden data-[state=active]:shadow-none data-[state=active]:bg-transparent cursor-pointer'
            >
              <h3 className='text-[#192024] font-semibold text-sm lg:text-base leading-5'>{tab.label}</h3>
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

export default TabPanelControl;
