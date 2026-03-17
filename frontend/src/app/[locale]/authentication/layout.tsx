// src/app/[locale]/authentication/layout.tsx

import React from 'react';

interface ILayoutProps {
  children: React.ReactNode;
}

export default function AuthenticationLayout({ children }: ILayoutProps) {
  return (
    <div className='flex flex-1 flex-col gap-0 w-full p-0'>
      <main className='min-h-screen'>{children}</main>
    </div>
  );
}
