'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { ConstantExploreService as services } from '@/lib/constants/website/index/expolore-service.constant';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { cardVariants } from '@/components/website/types/motion/index.motion';
import { useTranslations } from 'next-intl';

const ExploreServices = () => {
  const CARD_WIDTH = 300;
  const GAP = 16;
  const AUTO_PLAY_SPEED = 40;

  const controls = useAnimationControls();
  const xRef = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const items = useMemo(() => [...services, ...services], []);
  const totalWidth = services.length * (CARD_WIDTH + GAP);

  const t = useTranslations('IndexPage.exploreServices');

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (paused) {
      controls.stop();
      return;
    }

    const animate = async () => {
      await controls.start({
        x: -totalWidth,
        transition: {
          duration: totalWidth / AUTO_PLAY_SPEED,
          ease: 'linear',
        },
      });

      // Instant reset (illusion)
      xRef.current = 0;
      controls.set({ x: 0 });
      animate();
    };

    animate();
  }, [paused, controls, shouldReduceMotion, totalWidth]);

  //const visibleCards = 3; // Total cards shown per view including extras

  return (
    <section className='w-full max-w-[62rem] mx-auto overflow-hidden lg:mt-[230px] mb-12'>
      <motion.div
        className='flex gap-4 px-4 cursor-grab active:cursor-grabbing'
        animate={controls}
        style={{
          willChange: 'transform',
          cursor: 'grab',
        }}
        drag='x'
        dragConstraints={{
          left: -totalWidth,
          right: 0,
        }}
        dragElastic={0.05}
        onHoverStart={() => setPaused(true)}
        onHoverEnd={() => setPaused(false)}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
      >
        {items.map((service, _idx) => (
          <motion.div
            key={`${service.id}-${_idx}`}
            className='shrink-0'
            style={{ width: CARD_WIDTH }}
            variants={cardVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
            whileHover={!shouldReduceMotion ? { y: -6, scale: 1.02 } : undefined}
          >
            <Card className='h-full shadow-lg bg-gray-100 hover:bg-gray-200 transition-transform duration-300'>
              <CardContent className='p-4'>
                <div className='flex flex-row'>
                  <div className='basis-1/3'>
                    <Image src='/images/main/visa_assistance.png' alt='Service Assistance' width={52} height={100} />
                  </div>
                  <div className='basis-2/3 flex flex-col items-start'>
                    <h3 className='text-base md:text-lg font-semibold'>{t(`${service.key}.title`)}</h3>
                    <p className='text-sm md:text-base mt-2 text-muted-foreground'>{t(`${service.key}.description`)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ExploreServices;
