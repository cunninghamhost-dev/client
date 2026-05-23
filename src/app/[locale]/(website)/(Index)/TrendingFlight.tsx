'use client';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { gsap } from 'gsap';
import { IoMdAirplane } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { TSourceFlightProfile } from '@/types/home.type';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import styles from '@/components/sample/group-card.module.css';
import { useTranslations } from 'next-intl';

const countriesTrending: string[] = [
  'Lagos',
  'Bangkok',
  'Beijing',
  'London',
  'Istanbul',
  'Manchester',
  'Hongkok',
  'Mumbai',
];

const destinationList: TSourceFlightProfile[] = [
  {
    id: 1,
    destination: 'London',
    amountInNaira: '1,500,354',
    fromDate: 'Sunday, June 29, 2025',
    toDate: 'Monday, June 30, 2025',
    flightName: 'Qatar Airways',
    imageSource: '/images/main/london_1.webp',
  },
  {
    id: 2,
    destination: 'United Arab Emirate',
    amountInNaira: '1,245,000',
    fromDate: 'Sunday, June 28, 2025',
    toDate: 'Tuesday, July 01, 2025',
    flightName: 'Azman Air',
    imageSource: '/images/main/amsterdam_1.webp',
  },
  {
    id: 3,
    destination: 'Johanesburg',
    amountInNaira: '950,890',
    fromDate: 'Sunday, June 29, 2025',
    toDate: 'Monday, June 30, 2025',
    flightName: 'Air Peace',
    imageSource: '/images/main/london_2.webp',
  },
  {
    id: 4,
    destination: 'New York City',
    amountInNaira: '3,214,354',
    fromDate: 'Sunday, June 29, 2025',
    toDate: 'Wednesday, July 02, 2025',
    flightName: 'Overland Airways',
    imageSource: '/images/main/nyc_1.webp',
  },
  {
    id: 5,
    destination: 'Frankfurt',
    amountInNaira: '1,260,354',
    fromDate: 'Sunday, June 29, 2025',
    toDate: 'Monday, June 30, 2025',
    flightName: 'Qatar Airways',
    imageSource: '/images/main/nyc_2.webp',
  },
];

const TrendingFlight = () => {
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

  const t = useTranslations('IndexPage.trendingFlight');

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
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          },
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
    <section id='trending-flight' className='w-full max-w-[62rem] mx-auto overflow-hidden my-24'>
      <div className='p-4 bg-white'>
        <div className='flex flex-col items-start gap-1'>
          <h3 className='text-xl md:text-3xl leading-normal text-[#1A1A1A]'>{t(`header`)}</h3>
          <h5 className='text-lg md:text-xl text-[#666666]'>{t('sub_header')}</h5>
          <div className='flex items-start gap-8 mt-6'>
            {countriesTrending.map((country) => (
              <Button key={country} variant={'outline'}>
                {country}
              </Button>
            ))}
          </div>
        </div>
        <div ref={containerRef} className='px-8 pt-4 pb-12 slide-container overflow-hidden scroll-smooth'>
          <Slider ref={sliderRef} {...settings}>
            {destinationList.map((item) => (
              <div
                ref={(el) => setRef(el, item.id)}
                key={item.id}
                className=' shrink-0 px-2'
                style={{ width: `${cardWidth}px` }}
              >
                <Card className='py-2 rounded-sm shadow-lg transition-transform duration-300 w-full shrink-0 card-mdf'>
                  <CardContent className='p-0'>
                    <div className={styles.cardWrapper}>
                      <div className={styles.card}>
                        <div className={styles.imageWrapper}>
                          {item.imageSource ? (
                            <Image src={item.imageSource} alt={`Card ${item.id}`} fill className={styles.image} />
                          ) : (
                            ''
                          )}
                          <div className={`${styles.overlay} relative`}>
                            <div className='text-white'>
                              <div className='flex items-start justify-evenly w-full'>
                                <RadioGroup defaultValue='option-one' className='flex flex-col gap-1'>
                                  <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value='lagos' id='lagos' />
                                    <Label htmlFor='lagos' className=' text-xs leading-normal'>
                                      Lagos
                                    </Label>
                                  </div>
                                  <IoMdAirplane />
                                  <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value={item.destination} id={item.destination} />
                                    <Label htmlFor={item.destination} className=' text-xs leading-normal'>
                                      {item.destination}
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                              <div className='absolute top-4 right-4'>
                                <Image
                                  src={'/images/main/badge-top-deals.png'}
                                  alt='top-deals'
                                  width={69}
                                  height={17}
                                />
                              </div>
                              <div className='absolute bottom-6 left-4'>
                                <div className='flex flex-col gap-0'>
                                  <h5 className=' text-lg md:text-xl leading-normal'>{`#${item.amountInNaira}`}</h5>
                                  <span className='text-[7.24px] text-gray-300'>{`${item.fromDate} - ${item.toDate}`}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className='my-4'>
                    <div className='w-full py-0 pb-2 flex justify-between'>
                      <Image src={'/images/logo/Airline Logo.png'} alt='qatar Airways' width={67} height={22.86} />
                      <Button
                        variant='outline'
                        className='text-[#B02D1C] hover:text-white border-[#B02D1C] hover:bg-[#d44a38]'
                      >
                        {t('button_text')}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TrendingFlight;
