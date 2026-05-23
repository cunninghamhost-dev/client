'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Slider from 'react-slick';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import SVGIcon from '@/components/defaults/SVGIcons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/defaults/StarRating';
import { TPropertyFeatureModel } from '@/types/home.type';

const featuredCities: string[] = ['Paris', 'Shanghai', 'Bangkok', 'Beijing', 'Manchester', 'Istanbul', 'Hong Kong'];

const propertyList: TPropertyFeatureModel[] = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  title: `Hotel Saint`,
  rating: 8.2,
  image_reference: '/images/main/resort_center.png',
  star_count: 4,
  pricing: '£65',
  reviews: 145,
}));

const FeatureProperty = () => {
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
            <h3 className='text-xl md:text-3xl leading-normal text-[#1A1A1A]'>Featured Properties</h3>
            <div className='flex items-start gap-6 p-0'>
              <div className='flex gap-0'>
                <Button variant={'link'} className='p-0'>
                  <SVGIcon fileName='love_check.svg' alt='Love Check' />
                  <span className='font-medium text-xs md:text-[13.67px] leading-normal md:leading-[18px] text-[#666666]'>
                    We price match
                  </span>
                </Button>
              </div>
              <div className='flex gap-0'>
                <Button variant={'link'} className='p-0'>
                  <SVGIcon fileName='check_square.svg' alt='Cheack Square' />
                  <span className='font-medium text-xs md:text-[13.67px] leading-normal md:leading-[18px] text-[#666666]'>
                    Hotel Booking Guarantee
                  </span>
                </Button>
              </div>
              <div className='flex gap-0'>
                <Button variant={'link'} className='p-0'>
                  <SVGIcon fileName='check_seat.svg' alt='Check Seat' />
                  <span className='font-medium text-xs md:text-[13.67px] leading-normal md:leading-[18px] text-[#666666]'>
                    Hotel Stay Guarantee
                  </span>
                </Button>
              </div>
            </div>
            <div className='flex items-start gap-6 mt-4'>
              {featuredCities.map((city) => (
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
              {propertyList.map((item) => (
                <div
                  ref={(el) => setRef(el, item.id)}
                  key={item.id}
                  className=' shrink-0 px-2'
                  style={{ width: `${cardWidth}px` }}
                >
                  <PropertyItem {...item} />
                </div>
              ))}
            </Slider>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

const PropertyItem = ({ image_reference, title, star_count, rating, reviews, pricing }: TPropertyFeatureModel) => {
  return (
    <Card className='h-full rounded-sm shadow-lg transition-transform duration-300 pt-2 bg-white'>
      <CardContent className='px-3'>
        <div className=' p-2 bg-[#FFF6EC]'>
          <Image src={image_reference} alt={title} width={250} height={200} />
        </div>
      </CardContent>
      <CardFooter className='my-0 relative'>
        <div className='flex flex-col items-start gap-2'>
          <div className='flex items-start'>
            <h4 className='font-normal text-base md:text-lg leading-normal md:leading-7'>{title}</h4>
            <div className=' absolute top-1 right-4'>
              <StarRating rating={star_count} maxStars={4} />
            </div>
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
            <div className='flex items-end justify-start gap-0'>
              <span className='font-sans font-normal text-[13.45px] leading-[26px]'>From:</span>
              <h5 className='font-bold text-[#1A1A1A] text-base md:text-lg lg:text-xl leading-normal lg:leading-[26px]'>
                {`${pricing}`}
              </h5>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeatureProperty;
