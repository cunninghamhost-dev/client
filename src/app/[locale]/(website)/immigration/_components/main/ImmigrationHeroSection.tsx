'use client';
import { heroProfileData } from '@/lib/constants/home.constant';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import clsx from 'clsx';
import SearchPanel from './SearchPanel';

const ImmigrationHeroSection = () => {
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
    <section className='immigration-section' ref={sectionRef}>
      <div className='wrapper-content h-44'>
        <div className='wrapper-overlay'>
          <div className=' container row-rep py-20 lg:py-12'>
            <div className='pb-0'>
              <div className='w-full flex flex-col justify-center items-center gap-1'>
                <div className='w-full max-w-xl flex flex-col md:flex-row justify-center md:justify-baseline gap-4 md:gap-10 mt-8 '>
                  {heroProfileData.map((profile, _idx) => (
                    <div key={profile.name} className='flex items-end gap-2 w-full'>
                      <Separator orientation='vertical' className={`border-gray-200 ${_idx === 0 ? ' hidden' : ''}`} />
                      <Link
                        href={profile.link ? profile.link : '#'}
                        ref={(el) => {
                          if (el) linksRef.current[_idx] = el; // ✅ Safe assignment
                        }}
                        className={clsx(
                          'relative inline-block px-2 py-1 hover:bg-transparent cursor-pointer hover:scale-110 text-gray-100 hover:text-gray-300',
                          _idx === 1 &&
                            'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gray-100 hover:after:bg-gray-300',
                        )}
                      >
                        <span className='font-light text-right text-sm md:text-base leading-5'>{profile.name}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchPanel />
    </section>
  );
};

export default ImmigrationHeroSection;
