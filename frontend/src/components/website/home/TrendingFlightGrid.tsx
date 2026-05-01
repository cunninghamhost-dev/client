'use client';
import React, { useEffect, useRef, useState } from 'react';
import { mapTrendingFlightData } from '@/utils/server/amadeus/mapTrendingFlightDT';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { gsap } from 'gsap';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AmadeusResponse } from '@/types/server/amadeus.types';
import { Button } from '@/components/ui/button';
import styles from '@/components/sample/group-card.module.css';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { IoMdAirplane } from 'react-icons/io';
import Image from 'next/image';

type TrendingFlightProps = {
  amadeusResponse: AmadeusResponse;
};
const countriesTrending: string[] = ['Paris', 'Boston', 'UK', 'London', 'Istanbul', 'Manchester'];

const TrendingFlightGrid = ({ amadeusResponse }: TrendingFlightProps) => {
  const flights = mapTrendingFlightData(amadeusResponse);
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
    dots: false,
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
          <h3 className='text-xl md:text-3xl leading-normal text-[#1A1A1A]'>Trending Flight Deals</h3>
          <h5 className='text-lg md:text-xl text-[#666666]'>
            Get the best flight deals, airline specials and promotions.
          </h5>
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
            {flights.map((item, _index) => (
              <div
                ref={(el) => setRef(el, _index)}
                key={_index}
                className=' shrink-0 px-2'
                style={{ width: `${cardWidth}px` }}
              >
                <Card className='py-2 rounded-sm shadow-lg transition-transform duration-300 w-full shrink-0 card-mdf'>
                  <CardContent className='p-0'>
                    <div className={styles.cardWrapper}>
                      <div className={styles.card}>
                        <div className={styles.imageWrapper}>
                          <Image
                            src={'/images/main/amsterdam_1.webp'}
                            alt={`Card ${item.destinationName}`}
                            fill
                            className={styles.image}
                          />
                          <div className={`${styles.overlay} relative`}>
                            <div className='text-white'>
                              <div className='flex items-start justify-between gap-3 w-full'>
                                <RadioGroup defaultValue={item.origin} className='block space-y-2'>
                                  <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value={item.origin} id={item.origin} />
                                    <Label htmlFor='lagos' className=' text-[10px] leading-normal'>
                                      {item.originName}
                                    </Label>
                                  </div>
                                  {/* Centered and rotated airplane icon */}
                                  <div className='flex item-start'>
                                    <IoMdAirplane className='transform rotate-180 text-lg' />
                                  </div>
                                  <div className='flex items-center space-x-2'>
                                    <RadioGroupItem value={item.destination} id={item.destination} />
                                    <Label htmlFor={item.destination} className=' text-[10px] leading-normal'>
                                      {item.destinationName}
                                    </Label>
                                  </div>
                                </RadioGroup>
                                <Image
                                  src={'/images/main/badge-top-deals.png'}
                                  alt='top-deals'
                                  width={69}
                                  height={17}
                                />
                              </div>
                              {/* <div className='absolute top-4 right-4'>

                              </div> */}
                              <div className='absolute bottom-6 left-4'>
                                <div className='flex flex-col gap-0'>
                                  <h5 className=' text-lg md:text-xl leading-normal'>{`${item.currency} ${item.price}`}</h5>
                                  <span className='text-[7.24px] text-gray-300'>{`${item.departureDate} - ${item.returnDate}`}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className='w-full py-0 pb-2 flex justify-between'>
                      <Image src={'/images/logo/Airline Logo.png'} alt='qatar Airways' width={67} height={22.86} />
                      <a
                        href={item.flightOffersUrl}
                        className='text-[#B02D1C] border rounded-lg py-1 px-2 hover:text-white border-[#B02D1C] hover:bg-[#d44a38]'
                      >
                        Book Flight
                      </a>
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

export default TrendingFlightGrid;
