'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useEmblaCarousel from 'embla-carousel-react';
import { addDays, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface Rating {
  category: string;
  score: number;
  maxScore: number;
}

interface Testimonial {
  id: string;
  name: string;
  initial: string;
  rating: number;
  review: string;
  date: string;
  platform: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface TourPhoto {
  id: string;
  url: string;
  alt: string;
}

const TourBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('09:00 AM');
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set());

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [photoEmblaRef, photoEmblaApi] = useEmblaCarousel({ loop: true });

  const overallRating = 4.7;
  const totalReviews = 221;

  const ratings: Rating[] = [
    { category: 'Good value', score: 4.6, maxScore: 5.0 },
    { category: 'Facilities', score: 4.6, maxScore: 5.0 },
    { category: 'Quality of service', score: 4.8, maxScore: 5.0 },
    { category: 'Ease of access', score: 4.5, maxScore: 5.0 },
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Reinhold K',
      initial: 'R',
      rating: 5,
      review: 'Tour was awesome. Appreciated the insight and historical information from guides. Beautiful scenery.',
      date: 'March 28, 2024',
      platform: 'Viator',
    },
    {
      id: '2',
      name: 'Keith R',
      initial: 'K',
      rating: 5,
      review: 'Matt provided the best experience and tour. He was incredibly thoughtful, courteous and informative.',
      date: 'February 03, 2024',
      platform: 'Viator',
    },
    {
      id: '3',
      name: 'Sarah M',
      initial: 'S',
      rating: 5,
      review: 'Absolutely fantastic tour! The guide was knowledgeable and the sites were breathtaking.',
      date: 'January 15, 2024',
      platform: 'Viator',
    },
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I book a ticket?',
      answer:
        'You can book a ticket by selecting your preferred date and time, choosing the number of tickets, and proceeding to checkout.',
    },
    {
      id: '2',
      question: 'When do I pay?',
      answer:
        'Payment is processed immediately upon booking confirmation. We accept all major credit cards and digital payment methods.',
    },
    {
      id: '3',
      question: 'How do digital tickets work?',
      answer:
        'Digital tickets will be sent to your email after booking. Simply show the QR code on your phone at the meeting point.',
    },
    {
      id: '4',
      question: 'Can I cancel or modify my tickets?',
      answer: 'Yes, you can cancel or modify your booking up to 24 hours before the tour date for a full refund.',
    },
  ];

  const tourPhotos: TourPhoto[] = [
    {
      id: '1',
      url: 'https://images.pexels.com/photos/2901134/pexels-photo-2901134.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Ancient ruins and stone structures',
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/3355788/pexels-photo-3355788.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Scenic countryside landscape',
    },
    {
      id: '3',
      url: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Historical monument',
    },
  ];

  const availableDates = [
    { date: new Date(), label: '31\nAug', day: 'Sun' },
    { date: addDays(new Date(), 1), label: '1\nSep', day: 'Mon' },
    { date: addDays(new Date(), 2), label: '2\nSep', day: 'Tue' },
    { date: addDays(new Date(), 3), label: '3\nSep', day: 'Wed' },
  ];

  const timeSlots = ['09:00 AM', '02:00 PM'];
  const adultPrice = 280;
  const childPrice = 54;
  const total = adultCount * adultPrice + childCount * childPrice;

  const toggleFAQ = (id: string) => {
    const newOpenFAQs = new Set(openFAQs);
    if (newOpenFAQs.has(id)) {
      newOpenFAQs.delete(id);
    } else {
      newOpenFAQs.add(id);
    }
    setOpenFAQs(newOpenFAQs);
  };

  const scrollPrevTestimonial = () => emblaApi?.scrollPrev();
  const scrollNextTestimonial = () => emblaApi?.scrollNext();

  const scrollPrevPhoto = () => photoEmblaApi?.scrollPrev();
  const scrollNextPhoto = () => photoEmblaApi?.scrollNext();

  return (
    <div className='max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8'>
      {/* Left Section - Main Content */}
      <div className='lg:col-span-2 space-y-8'>
        {/* User Ratings Section */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-xl font-semibold'>User ratings</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-2'>
                <Star className='w-6 h-6 fill-orange-400 text-orange-400' />
                <span className='text-2xl font-bold'>{overallRating}</span>
                <span className='text-lg font-medium'>Exceptional</span>
                <span className='text-muted-foreground'>({totalReviews} reviews)</span>
              </div>
              <Button variant='link' className='text-blue-600 p-0'>
                See all reviews
              </Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {ratings.map((rating, index) => (
                <motion.div
                  key={rating.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='space-y-2'
                >
                  <div className='flex justify-between text-sm'>
                    <span className='font-medium'>{rating.category}</span>
                    <span className='font-medium'>{rating.score}</span>
                  </div>
                  <Progress value={(rating.score / rating.maxScore) * 100} className='h-2' />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Section */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='text-xl font-semibold'>What guests loved most</CardTitle>
            <Button variant='link' className='text-blue-600 p-0'>
              See all reviews
            </Button>
          </CardHeader>
          <CardContent>
            <div className='relative'>
              <div className='overflow-hidden' ref={emblaRef}>
                <div className='flex'>
                  {testimonials.map((testimonial) => (
                    <motion.div
                      key={testimonial.id}
                      className='flex-[0_0_100%] md:flex-[0_0_50%] px-3'
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className='h-full'>
                        <CardContent className='p-4'>
                          <div className='flex items-center gap-3 mb-3'>
                            <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold'>
                              {testimonial.initial}
                            </div>
                            <div>
                              <p className='font-medium'>{testimonial.name}</p>
                              <div className='flex items-center gap-1'>
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      'w-4 h-4',
                                      i < testimonial.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'
                                    )}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className='text-sm text-muted-foreground mb-3'>{testimonial.review}</p>
                          <p className='text-xs text-muted-foreground'>
                            Posted {testimonial.date} on {testimonial.platform}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
              <Button
                variant='outline'
                size='sm'
                className='absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0'
                onClick={scrollPrevTestimonial}
              >
                <ChevronLeft className='w-4 h-4' />
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0'
                onClick={scrollNextTestimonial}
              >
                <ChevronRight className='w-4 h-4' />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Traveler Photos Section */}
        <Card>
          <CardHeader>
            <CardTitle className='text-xl font-semibold'>Traveler photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='relative'>
              <div className='overflow-hidden rounded-lg' ref={photoEmblaRef}>
                <div className='flex'>
                  {tourPhotos.map((photo) => (
                    <div key={photo.id} className='flex-[0_0_100%] md:flex-[0_0_50%] px-2'>
                      <motion.img
                        src={photo.url}
                        alt={photo.alt}
                        className='w-full h-64 object-cover rounded-lg'
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <Button
                variant='outline'
                size='sm'
                className='absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0'
                onClick={scrollPrevPhoto}
              >
                <ChevronLeft className='w-4 h-4' />
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0'
                onClick={scrollNextPhoto}
              >
                <ChevronRight className='w-4 h-4' />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className='text-xl font-semibold'>Frequently asked questions</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Collapsible open={openFAQs.has(faq.id)} onOpenChange={() => toggleFAQ(faq.id)}>
                  <CollapsibleTrigger className='flex w-full items-center justify-between rounded-lg border p-4 text-left hover:bg-muted/50'>
                    <span className='font-medium'>{faq.question}</span>
                    <ChevronRight className={cn('w-4 h-4 transition-transform', openFAQs.has(faq.id) && 'rotate-90')} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className='px-4 pb-4 pt-2 text-sm text-muted-foreground'>
                    {faq.answer}
                  </CollapsibleContent>
                </Collapsible>
              </motion.div>
            ))}

            <Card className='mt-6 bg-muted/30'>
              <CardContent className='p-4'>
                <p className='text-sm text-muted-foreground mb-2'>
                  Tell us how we&apos;re doing and where we can improve
                </p>
                <Button variant='link' className='text-blue-600 p-0 h-auto'>
                  Leave feedback
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      {/* Right Section - Booking */}
      <div className='lg:col-span-1'>
        <Card className='sticky top-6'>
          <CardHeader>
            <CardTitle className='text-xl font-semibold'>Tickets and prices</CardTitle>
            <p className='text-sm text-muted-foreground'>Search ticket availability by date</p>
            <Button variant='link' className='text-blue-600 p-0 justify-start h-auto'>
              Show more dates
            </Button>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Date Selection */}
            <div>
              <div className='grid grid-cols-4 gap-2 mb-4'>
                {availableDates.map((dateInfo, index) => (
                  <Button
                    key={index}
                    variant={isSameDay(dateInfo.date, selectedDate || new Date()) ? 'default' : 'outline'}
                    className={cn(
                      'h-16 p-2 flex flex-col items-center justify-center',
                      isSameDay(dateInfo.date, selectedDate || new Date()) && 'bg-blue-600 text-white'
                    )}
                    onClick={() => setSelectedDate(dateInfo.date)}
                  >
                    <span className='text-xs'>{dateInfo.day}</span>
                    <span className='text-lg font-bold whitespace-pre-line'>{dateInfo.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <h3 className='font-medium mb-3'>Select time</h3>
              <div className='grid grid-cols-2 gap-2'>
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'default' : 'outline'}
                    onClick={() => setSelectedTime(time)}
                    className={cn(selectedTime === time && 'bg-blue-600 text-white')}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tour Options */}
            <Card className='bg-blue-50 border-blue-200'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between mb-3'>
                  <h3 className='font-medium'>Morning departure</h3>
                  <Badge className='bg-teal-600'>Genius</Badge>
                </div>
                <div className='space-y-2 text-sm'>
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 border-2 border-current rounded-full flex items-center justify-center'>
                      <div className='w-2 h-2 bg-current rounded-full'></div>
                    </div>
                    <span>Non-refundable</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 border-2 border-current rounded-full'></div>
                    <span>Morning departure</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language Options */}
            <div>
              <label className='text-sm font-medium mb-2 block'>Language options</label>
              <Select defaultValue='english-tour'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='english-tour'>English - Tour guide</SelectItem>
                  <SelectItem value='spanish-tour'>Spanish - Tour guide</SelectItem>
                  <SelectItem value='french-tour'>French - Tour guide</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ticket Quantity */}
            <div>
              <h3 className='font-medium mb-3'>How many tickets?</h3>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Adult (age 13-99)</p>
                    <p className='text-sm text-muted-foreground'>
                      €{adultPrice} x {adultCount}
                    </p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-8 h-8 p-0'
                      onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                    >
                      -
                    </Button>
                    <span className='w-8 text-center'>{adultCount}</span>
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-8 h-8 p-0'
                      onClick={() => setAdultCount(adultCount + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Child (age 4-12)</p>
                    <p className='text-sm text-muted-foreground'>
                      €{childPrice} x {childCount}
                    </p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-8 h-8 p-0'
                      onClick={() => setChildCount(Math.max(0, childCount - 1))}
                    >
                      -
                    </Button>
                    <span className='w-8 text-center'>{childCount}</span>
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-8 h-8 p-0'
                      onClick={() => setChildCount(childCount + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className='border-t pt-4'>
              <div className='flex items-center justify-between mb-2'>
                <span className='font-medium'>Total</span>
                <div className='text-right'>
                  <span className='text-sm text-muted-foreground line-through mr-2'>€{total + 30}</span>
                  <span className='text-xl font-bold'>€{total}</span>
                  <Badge variant='destructive' className='ml-2 text-xs'>
                    10% off
                  </Badge>
                </div>
              </div>
              <p className='text-xs text-muted-foreground'>Includes taxes and fees</p>
              <Button className='w-full mt-4 bg-orange-600 hover:bg-orange-700'>Next</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TourBooking;
