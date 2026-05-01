'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ICategoryTabItem } from '@/types/default.type';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ICategoryTabProps {
  tabs: ICategoryTabItem[];
}

const CategoryPanelProfile = ({ tabs }: ICategoryTabProps) => {
  const firstTabValue = tabs[0]?.value;
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeTab, setActiveTab] = useState<string>(firstTabValue);

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
    <div className='flex justify-center items-center w-full'>
      <Tabs value={activeTab} defaultValue={firstTabValue} onValueChange={setActiveTab} className='relative w-full'>
        <TabsList className='grid grid-cols-3 w-full h-16 items-start justify-start gap-2 overflow-x-auto rounded-lg shadow-lg bg-white'>
          {tabs.map(({ value, label, amount, timeline }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='items-start justify-start pr-8 border-r-1 border-r-[#d2d5d7] data-[state=active]:border-b-4 data-[state=active]:border-b-[#E63A24] rounded-none flex-none focus-visible:border-none focus-visible:ring-ring/0 focus-visible:outline-none overflow-hidden data-[state=active]:shadow-none data-[state=active]:bg-transparent'
            >
              <div className='flex flex-col gap-2 items-start'>
                <h3 className='text-[#192024] font-semibold  text-sm lg:text-base leading-5'>{label}</h3>
                {amount ? (
                  <div className='flex items-start gap-1 font-normal text-[10px] lg:text-[13.45px] leading-[160%]'>
                    <h6>{amount}</h6>
                    <span>•</span>
                    <h6>{timeline}</h6>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className='flex flex-col gap-4 pt-2 items-start'>
          <h3 className='w-full lg:max-w-[80%] font-bold text-xs lg:text-sm leading-[21px] text-gray-400'>
            Prices may change based on availability and are not final until you complete your purchase. Certain payment
            methods may carry an additional <span className=' underline text-blue-500'>fee.</span>
          </h3>
          <div className='w-full'>
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default CategoryPanelProfile;
