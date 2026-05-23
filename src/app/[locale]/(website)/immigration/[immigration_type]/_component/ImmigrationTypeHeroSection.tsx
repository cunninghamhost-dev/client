'use client';
import { heroProfileData } from '@/lib/constants/home.constant';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import clsx from 'clsx';
import { Card, CardContent } from '@/components/ui/card';
import ImmigrationTypeFormField from './ImmigrationTypeFormField';
import { TCountryResponse } from '@/lib/hooks/defaults/countries.hook';

const ImmigrationTypeHeroSection = ({
  type,
  source,
  destination,
}: {
  type: string;
  source: TCountryResponse;
  destination: TCountryResponse;
}) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

      tl.from(sectionRef.current, { opacity: 0, y: 40, duration: 1.2 });
      tl.from(linksRef.current, { opacity: 0, y: 20, stagger: 0.15 }, '-=0.6');
      if (headingRef.current) tl.from(headingRef.current, { opacity: 0, y: 30 }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className='visa-section' ref={sectionRef}>
      <div className='wrapper-content h-44'>
        <div className='wrapper-overlay'>
          <div className='container row-rep py-20 lg:py-12'>
            <div className='pb-0'>
              <div className='w-full flex flex-col justify-center items-center gap-1'>
                <div className='w-full max-w-xl flex flex-col md:flex-row justify-center md:justify-baseline gap-4 md:gap-10 mt-8 '>
                  {heroProfileData.map((profile, _idx) => (
                    <div key={profile.name} className='flex items-center gap-2 w-full'>
                      <Separator orientation='vertical' className={`border-gray-200 ${_idx === 0 ? ' hidden' : ''}`} />
                      <Link
                        href={profile.link ? profile.link : '#'}
                        ref={(el) => {
                          if (el) linksRef.current[_idx] = el; // ✅ Safe assignment
                        }}
                        className={clsx(
                          'relative inline-block px-2 py-1 hover:bg-transparent cursor-pointer hover:scale-110 text-gray-100 hover:text-[#E63A24]',
                          _idx === 1 &&
                            'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-100 hover:after:bg-[#E63A24]',
                        )}
                      >
                        <span className='font-light text-center text-sm md:text-base leading-5'>{profile.name}</span>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className='relative w-full bg-transparent'>
                  <Card className='h-auto absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-[10%] w-full max-w-5xl bg-white rounded-lg backdrop-blur-md border-white/20 text-gray-700 pointer-events-auto hover:bg-white/98 transition-all cursor-default group'>
                    <CardContent>
                      <ImmigrationTypeFormField type={type} source={source} destination={destination} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImmigrationTypeHeroSection;
