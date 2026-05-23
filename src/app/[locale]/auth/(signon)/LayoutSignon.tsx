'use client';

import React from 'react';
import SignonNavigation from './_component/SignonNavigation';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface ILayoutProps {
  children: React.ReactNode;
}

const LayoutSignon = ({ children }: ILayoutProps) => {
  const pathname = usePathname();
  return (
    <div className='flex flex-col gap-4 mt-4 px-12'>
      <SignonNavigation />
      <AnimatePresence mode='wait'>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LayoutSignon;
