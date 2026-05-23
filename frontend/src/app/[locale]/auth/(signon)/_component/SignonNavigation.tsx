import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mockSignonTab } from '../_constants/signon-tab.constants';

const SignonNavigation = () => {
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/^\/[a-z]{2}(?=\/)/, '');

  return (
    <div className='flex justify-center w-[90%] md:w-2/3'>
      <div className='relative w-full'>
        <div className='flex space-x-4 w-full justify-start gap-2 overflow-x-auto rounded-none border-none shadow-none bg-transparent'>
          {mockSignonTab.map(({ label, href, title }) => {
            const isActive = normalizedPathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`cursor-pointer rounded-none justify-baseline flex-none focus-visible:border-none focus-visible:ring-ring/0 focus-visible:outline-none font-bold text-[#1A1A1A] hover:text-gray-500 text-base md:text-xl leading-8 overflow-hidden ${
                  isActive
                    ? 'border-b-2 border-b-[#E63A24] hover:border-b-red-800 shadow-none bg-transparent text-[#E63A24] hover:text-red-600'
                    : ''
                }`}
                title={title}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SignonNavigation;
