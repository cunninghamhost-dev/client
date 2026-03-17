import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ICategoryTabItem } from '@/types/default.type';
import { TabsContent } from '@radix-ui/react-tabs';
import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

interface ICategoryTabProps {
  tabs: ICategoryTabItem[];
}

const CategoryProfile = ({ tabs }: ICategoryTabProps) => {
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
    <div className='flex justify-center w-full'>
      <Tabs value={activeTab} defaultValue={firstTabValue} onValueChange={setActiveTab} className='relative w-full'>
        <TabsList className='flex space-x-8 w-full h-16 items-start justify-start gap-2 overflow-x-auto rounded-lg shadow-lg bg-white'>
          {tabs.map(({ value, label, amount, timeline }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='items-start justify-start pr-8 border-r-1 border-r-[#D9E2E8] data-[state=active]:border-b-4 data-[state=active]:border-b-[#E63A24] rounded-none flex-none focus-visible:border-none focus-visible:ring-ring/0 focus-visible:outline-none overflow-hidden data-[state=active]:shadow-none data-[state=active]:bg-transparent'
            >
              <div className='flex flex-col gap-2 items-start'>
                <h3 className='text-[#192024] font-semibold  text-base leading-5'>{label}</h3>
                {amount ? (
                  <div className='flex items-start gap-1 font-normal text-[13.45px] leading-5'>
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
        <div className='flex flex-col gap-8 pt-4 items-start'>
          <h3 className='max-w-[80%] font-bold text-sm leading-[21px] text-gray-900'>
            Prices may change based on availability and are not final until you complete your purchase. Certain payment
            methods may carry an additional <span className=' underline text-blue-500'>fee.</span>
          </h3>
          <div className='w-full mt-4'>
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

export default CategoryProfile;
