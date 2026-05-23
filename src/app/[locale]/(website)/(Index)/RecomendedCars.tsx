'use client';
import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { gsap } from 'gsap';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import SVGIcon from '@/components/defaults/SVGIcons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { TCarRecommended } from '@/types/home.type';

const recommendedCities: string[] = ['London', 'Orlando', 'Geneva', 'Belfast', 'Dublin', 'Faro', 'Malaga', 'Lyon'];

const evaluations = [
  {
    id: 1,
    icon_link: 'progress_break.svg',
    alt_name: 'Progress Status',
    name: 'Free Cancellations',
  },
  {
    id: 2,
    icon_link: 'armour_check.svg',
    alt_name: 'Armour Check',
    name: 'No Credit Card Fees',
  },
  {
    id: 3,
    icon_link: 'love_check.svg',
    alt_name: 'Desire Check',
    name: 'Reliable Support',
  },
];

const productList: TCarRecommended[] = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  title: `Flat 500 or Similar`,
  rating: 8.2,
  image_reference: '/images/main/honda_car.png',
  vendor: '/images/main/drivalia_vendor.png',
  pricing: '£65',
  status: 'Average',
}));

const RecomendedCars = () => {
  const [currentIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef(new Map());
  const cardWidth = 300; // You can adjust this

  const scrollToIndex = (i: number) => {
    const offset = i * cardWidth;
    containerRef.current?.scrollTo({
      left: offset,
      behavior: 'smooth',
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
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 100%',
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
            <h3 className='text-xl md:text-3xl leading-normal text-[#1A1A1A]'>Recommended Cars</h3>
            <div className='flex items-start gap-4 p-0'>
              {evaluations.map((item) => (
                <div key={item.id} className='flex gap-0'>
                  <Button variant={'link'} className='p-0'>
                    <SVGIcon fileName={item.icon_link} alt={item.alt_name} />
                    <span className='font-medium text-xs md:text-[13.67px] leading-normal md:leading-[18px] text-[#666666]'>
                      {item.name}
                    </span>
                  </Button>
                </div>
              ))}
            </div>
            <div className='flex items-start gap-4 mt-2'>
              {recommendedCities.map((city) => (
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
              {productList.map((item) => (
                <div
                  ref={(el) => setRef(el, item.id)}
                  key={item.id}
                  className=' shrink-0 px-2'
                  style={{ width: `${cardWidth}px` }}
                >
                  <CarRecommendedProfile {...item} />
                </div>
              ))}
            </Slider>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

const CarRecommendedProfile = ({ id, title, image_reference, vendor, rating, status, pricing }: TCarRecommended) => {
  return (
    <Card key={id} className='h-full rounded-sm shadow-lg transition-transform duration-300 pt-2 bg-white'>
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
              <Image src={vendor} alt='Vendor' width={36} height={22} />
            </div>
          </div>
          <div className='flex items-center gap-10'>
            <div className='flex items-center gap-2'>
              <Badge className='p-2 bg-[#009DC4] text-[#BDBDBD]' asChild>
                <span className='text-xs font-normal leading-[18px]'>
                  <h5 className=' text-white font-normal text-sm md:text-base leading-normal md:leading-6'>{rating}</h5>
                  /10
                </span>
              </Badge>
              <h5 className='text-[#009DC4] text-sm leading-5'>{status}</h5>
            </div>
            <div className='flex items-end justify-start gap-1'>
              <span className='font-sans font-normal text-[13.45px] leading-[26px]'>From</span>
              <h5 className='font-bold text-[#1A1A1A] text-base md:text-lg lg:text-xl leading-normal lg:leading-[26px]'>
                {pricing}
              </h5>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecomendedCars;
