// src/app/[locale]/authentication/layout.tsx

import React from 'react';
import WelcomeContent from './WelcomeSection';

interface ILayoutProps {
  children: React.ReactNode;
}

export default function AuthenticationLayout({ children }: ILayoutProps) {
  return (
    <div className='flex flex-1 flex-col gap-0 w-full p-0'>
      <main className='min-h-screen'>
        <div className='auth-wrapper'>
          <div className='auth-content'>{children}</div>
          <div className='auth-content hidden md:block bg-[#F5F5F5] text-black w-full mx-auto p-12'>
            <WelcomeContent />
          </div>
        </div>
      </main>
    </div>
  );
}
