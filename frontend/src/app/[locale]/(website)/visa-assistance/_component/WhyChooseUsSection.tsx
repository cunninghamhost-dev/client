'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';

export default function WhyChooseUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.card-item', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.section-title', {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: 'Expert Guidance',
      description: 'Years of experience navigating complex visa processes with a proven track record of approvals!',
      color: 'bg-[#009DC4]',
    },
    {
      title: 'Personalized Support',
      description: 'Tailored advice and step-by-step guidance for your unique travel or immigration needs.',
      color: 'bg-[#003651]',
    },
    {
      title: 'Transparency & Trust',
      description: 'Clear pricing, honest communication, and no hidden surprises from start to finish.',
      color: 'bg-[#007BB4]',
    },
  ];

  return (
    <section className='w-full max-w-5xl mx-auto overflow-hidden py-8 md:py-10'>
      <div className='container mx-auto w-full'>
        <div className='text-center mb-12'>
          <h2 className='text-xl md:text-3xl lg:text-4xl xl:text-5xl leading-[155%] font-bold'>Why Choose Us</h2>
          <p className='text-[#666666] mt-2 max-w-xl md:max-w-3xl mx-auto text-base md:text-lg leading-[150%]'>
            We’re more than just a visa assistance service — we’re your trusted partner for a smooth, stress-free
            journey.
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-5xl w-full'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='card-item flex flex-col rounded-none shadow-md hover:shadow-lg transition-shadow p-0'
            >
              <div className={`${feature.color} text-white text-left px-5 py-10`}>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-semibold'>{feature.title}</h3>
              </div>
              <CardContent className='text-[#666666] leading-[50.4px] text-left p-5'>
                <p className='text-sm md:text-base leading-6'>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className='mt-10 bg-red-500 hover:bg-red-600 text-white rounded-md px-6 py-2'>Learn More</Button>
      </div>
    </section>
  );
}
