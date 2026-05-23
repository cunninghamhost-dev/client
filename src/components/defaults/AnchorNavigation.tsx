'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IAnchorNavigationProps } from '@/types/default.type';
import { Card, CardContent } from '../ui/card';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const AnchorNavigation = ({ items }: IAnchorNavigationProps) => {
  const [activeId, setActiveId] = useState<string>(items[0].hash);
  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    // Smooth scroll on click
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.hasAttribute('data-scroll-to')) {
        e.preventDefault();
        const targetId = target.getAttribute('data-scroll-to');
        if (targetId) {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: `#${targetId}`, offsetY: 70 },
            ease: 'power2.out',
          });
        }
      }
    };

    document.addEventListener('click', handleClick);

    // ScrollTrigger to detect active section
    items.forEach((item) => {
      ScrollTrigger.create({
        trigger: `#${item.hash}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveId(item.hash),
        onEnterBack: () => setActiveId(item.hash),
      });
    });

    return () => {
      document.removeEventListener('click', handleClick);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [items]);

  return (
    <Card className='w-full rounded-none mx-auto py-2'>
      <CardContent>
        <ul className='relative flex gap-12 px-12 item-start'>
          {items.map((item) => (
            <li key={item.hash}>
              <a
                ref={(el) => {
                  navRefs.current[item.hash] = el; // ✅ assign manually
                }}
                href={`#${item.hash}`}
                data-scroll-to={item.hash}
                className={`relative pb-2 cursor-pointer transition-colors ${
                  activeId === item.hash
                    ? 'text-[#E63A24] font-semibold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-[#E63A24] after:rounded-full'
                    : 'hover:text-[#E63A24]'
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AnchorNavigation;
