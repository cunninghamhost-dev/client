'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaCar, FaHome, FaPlaneDeparture } from 'react-icons/fa';
import { TbSocial } from 'react-icons/tb';
import { gsap } from 'gsap';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import FlightSession from '@/app/[locale]/(website)/(Index)/custom/FlightSession';

// interface ICustomTabPanelProps {
//   tabs: ITabItem[];
// }
const tabs = [
  {
    value: 'flight',
    label: 'Flight',
    icon: FaPlaneDeparture,
    content: <FlightSession />,
  },
  {
    value: 'hotel_home',
    label: 'Hotels',
    icon: FaHome,
    // content: <HotelHomes />,
  },
  {
    value: 'car',
    label: 'Cars',
    icon: FaCar,
  },
  // {
  //   value: 'train',
  //   label: 'Trains',
  //   icon: FaTrain,
  //   content: <p>Book your Train ticket with us.</p>,
  // },
  {
    value: 'attention',
    label: 'Tours',
    icon: TbSocial,
    content: <p>Attention and Tours here.</p>,
  },
];

const HeroMenuContent = ({ serviceType, isImage }: { serviceType: number; isImage?: boolean }) => {
  console.log('HeroMenuContent component', isImage);
  const firstTabValue = tabs[serviceType - 1]?.value || '';
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
    <div className='container flex justify-center items-center'>
      <div className='row'>
        <Tabs value={activeTab} defaultValue={firstTabValue} onValueChange={setActiveTab} className='relative w-full'>
          <TabsList className='grid grid-cols-4 space-x-4 w-full justify-start gap-2 overflow-x-auto rounded-none bg-transparent'>
            {tabs.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className='text-base cursor-default disabled data-[state=active]:border-b-2 data-[state=active]:border-b-white rounded-none justify-baseline flex-none focus-visible:border-none focus-visible:ring-ring/0 focus-visible:outline-none text-gray-400 data-[state=active]:text-white overflow-hidden data-[state=active]:shadow-none data-[state=active]:bg-transparent'
              >
                <div className='flex gap-2 items-center justify-center w-full'>
                  {Icon ? <Icon className=' h-4 w-4' /> : ''}
                  <span>{label}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default HeroMenuContent;
