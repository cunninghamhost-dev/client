// src/app/[locale]/(website)/layout.tsx

import React from 'react';
import TopNavigation from '@/components/website/TopNavigation';
import FooterSection from '@/components/website/FooterSection';

interface ILayoutProps {
  children: React.ReactNode;
}

export default function WebsiteLayout({ children }: ILayoutProps) {
  return (
    <div className='flex flex-1 flex-col gap-0 w-full p-0'>
      <TopNavigation />
      <main className='bg-gray-100 text-[#191E3B]'>{children}</main>
      <FooterSection />
    </div>
  );
}
