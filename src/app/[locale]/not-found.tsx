'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { gsap } from 'gsap';

export default function NotFound() {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4'>
      <Card ref={cardRef} className='max-w-md w-full rounded-2xl shadow-lg bg-orange-300'>
        <CardContent className='p-8 text-center'>
          <h1 className='text-4xl font-bold mb-4'>🚧 Under Development</h1>
          <p className='text-lg text-gray-700 mb-6'>
            The page you{"'"}re looking for is still being built. We{"'"}re working on it!
          </p>
          <a
            href={'/'}
            className=' text-white hover:text-gray-300 bg-gray-700 hover:bg-gray-900 p-2 rounded-lg transition-all duration-300 font-medium group'
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                duration: 0.2,
                y: -2,
                ease: 'power2.out',
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                duration: 0.2,
                y: 0,
                ease: 'power2.out',
              });
            }}
          >
            <span>Back to Home Page</span>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
