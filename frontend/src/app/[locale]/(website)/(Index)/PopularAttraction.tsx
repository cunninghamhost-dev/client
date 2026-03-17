'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Slider from 'react-slick';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
//import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TAttractionModel } from '@/types/home.type';

const popularCities: string[] = ['London', 'Manchester', 'Istanbul', 'Bangkok', 'Birmingham', 'Amsterdam'];

const resortList: TAttractionModel[] = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  title: `Westminster Abbey`,
  rating: 8.2,
  image_reference: '/images/main/westminster_resort.png',
  reviews: 145,
}));

const PopularAttraction = () => {
  const [currentIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef(new Map());

  const cardWidth = 300; // You can adjust this

  const scrollToIndex = (i: number) => {
    const offset = i * cardWidth;
    containerRef.current?.scrollTo({
      left: offset,
      behavior: 'instant',
    });
  };

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, []);

  const setRef = (el: unknown, index: number) => {
    if (el) {
      cardsRef.current.set(index, el);
    } else {
      cardsRef.current.delete(index);
    }
  };

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    infinite: false,
    speed: 500,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <section className='w-full max-w-[62rem] mx-auto overflow-hidden my-24'>
      <Card className='relative rounded-xl bg-gradient-to-b from-white to-gray-100'>
        <CardTitle className='px-8'>
          <div className='flex flex-col items-start gap-2'>
            <h3 className='text-xl md:text-3xl leading-normal text-[#1A1A1A]'>Popular Attractions</h3>
            <div className='flex items-start gap-6 mt-2'>
              {popularCities.map((city) => (
                <Button key={city} variant={'outline'}>
                  {city}
                </Button>
              ))}
            </div>
          </div>
        </CardTitle>
        <CardContent>
          <div ref={containerRef} className={`px-8 pt-4 pb-12 bg-white slide-container`}>
            <Slider ref={sliderRef} {...settings}>
              {resortList.map((item) => (
                <div
                  ref={(el) => setRef(el, item.id)}
                  key={item.id}
                  className=' shrink-0 px-2'
                  style={{ width: `${cardWidth}px` }}
                >
                  <ResortItem {...item} />
                </div>
              ))}
            </Slider>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

const ResortItem = ({ image_reference, title, rating, reviews }: TAttractionModel) => {
  return (
    <Card className='h-full rounded-sm shadow-lg transition-transform duration-300 pt-2 bg-white'>
      <CardContent className='px-3'>
        <div className=' p-2 bg-transparent'>
          <Image src={image_reference} alt={title} width={250} height={200} />
        </div>
      </CardContent>
      <CardFooter className='my-0 relative'>
        <div className='flex flex-col items-start gap-2'>
          <div className='flex items-start'>
            <h4 className='font-normal text-base md:text-lg leading-normal md:leading-7'>{title}</h4>
          </div>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-1'>
              <Badge className='p-1 bg-[#009DC4] text-[#BDBDBD]' asChild>
                <span className='text-xs font-normal leading-[18px]'>
                  <h5 className=' text-white font-normal text-sm md:text-base leading-normal md:leading-6'>{rating}</h5>
                  /10
                </span>
              </Badge>
              <h5 className='text-[#009DC4] text-xs leading-5'>{`${reviews} reviews`}</h5>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PopularAttraction;
