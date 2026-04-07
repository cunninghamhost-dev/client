'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { ITabItem } from '@/types/default.type';
// import { Button } from './ui/button';
// import { Label } from './ui/label';
import { gsap } from 'gsap';

interface IAuthTabProps {
  tabs: ITabItem[];
}

const AuthenticationForm = ({ tabs }: IAuthTabProps) => {
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
    <div className='flex justify-center w-[90%] md:w-2/3'>
      <Tabs value={activeTab} defaultValue={firstTabValue} onValueChange={setActiveTab} className='relative w-full'>
        <TabsList className='flex space-x-4 w-full justify-start gap-2 overflow-x-auto rounded-none bg-transparent'>
          {tabs.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className=' cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-b-[#E63A24] rounded-none justify-baseline flex-none focus-visible:border-none focus-visible:ring-ring/0 focus-visible:outline-none font-bold text-[#1A1A1A] text-lg md:text-xl leading-8 overflow-hidden data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[#E63A24]'
            >
              <span>{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AuthenticationForm;
