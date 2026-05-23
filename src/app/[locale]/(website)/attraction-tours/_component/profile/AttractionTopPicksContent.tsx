'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { CiClock2 } from 'react-icons/ci';
import { ConstAttractionProfileList as list } from '@/lib/constants/website/attractionstour/attraction-profiles.constant';
import { LuCalendarCheck2 } from 'react-icons/lu';

// const images = [
//   '/images/main/home/double_room.png',
//   '/images/main/home/quadraple_room.png',
//   '/images/main/home/london3_figure_exterior.png',
//   '/images/main/home/lobby_sitting.png',
// ];

const AttractionTopPicksContent = () => {
  return (
    <div className='flex flex-col gap-4 mt-2 mb-4'>
      {list.map((item) => (
        <Card
          key={item.id}
          className='w-full max-w-5xl mx-auto rounded-2xl shadow-none border-[#E0E0E0] overflow-hidden text-[#1A1A1A]'
        >
          <CardContent className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Left: Image Gallery */}
            <div className='w-full col-span-1'>
              <Card className='rounded-2xl border-none shadow-none p-0 w-full'>
                <div className='grid grid-cols-2 gap-0 h-64'>
                  {item.image_names &&
                    item.image_names.map((src, _idx) => (
                      <motion.div
                        key={_idx}
                        whileHover={{ scale: 1.05 }}
                        className='relative w-full rounded-none overflow-hidden shadow-none'
                      >
                        <Image
                          src={`/images/main/attractions/${src}`}
                          alt={`${item.city_name} - ${_idx + 1}`}
                          fill
                          className='object-cover'
                        />
                      </motion.div>
                    ))}
                </div>
              </Card>
            </div>

            {/* Right: Content */}
            <div className='w-full col-span-2'>
              <div className='flex flex-col justify-between space-y-4'>
                <div>
                  <h2 className='text-xl font-bold mb-1'>{item.full_city_name}</h2>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <span className='text-sm leading-5 text-[#666666]'>{item.city_name}</span>
                    {item.best_seller && (
                      <span className='px-2 py-1 text-xs rounded bg-[#009DC4] text-white'>{item.best_seller}</span>
                    )}
                    {item.early_booking && (
                      <span className='px-2 py-1 text-xs rounded bg-[#F5F5F5] text-[#B02D1C]'>
                        {item.early_booking}
                      </span>
                    )}
                  </div>

                  <p className='text-sm mt-1 lading-5'>{item.description}</p>

                  <div className='flex items-center gap-2 mt-4 text-sm font-medium'>
                    <CiClock2 className='text-[#1A1A1A]' />
                    <span className='text-sm leading-4'>{`Duration: ${item.duration}`}</span>
                  </div>

                  <div className='mt-2 flex items-start justify-between'>
                    <div className='flex flex-col gap-2'>
                      {item.star_rating && (
                        <div className='flex items-center gap-2 text-sm font-medium'>
                          <FaStar className='text-yellow-500' />
                          <span>{`${item.star_rating} ( ${item.reviews} )`}</span>
                        </div>
                      )}
                      {item.amenities && (
                        <div className='inline-flex space-x-1 text-sm leading-4 text-[#008234]'>
                          <LuCalendarCheck2 />
                          <span>{item.amenities}</span>
                        </div>
                      )}
                    </div>

                    <div className='mt-1 flex flex-col items-end justify-end'>
                      <p className='text-xs leading-3 text-[#666666]'>
                        from: <span className='font-bold text-base'>€80</span>
                      </p>
                      <p className='mt-1 text-xs text-[#666666] leading-[18px]'>Available starting Aug 31</p>
                      <Button
                        variant={'outline'}
                        size='lg'
                        className='mt-2 rounded-xl px-6 border-[#B02D1C] text-[#B02D1C] hover:bg-orange-600 hover:text-white cursor-pointer'
                      >
                        See availability
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AttractionTopPicksContent;
