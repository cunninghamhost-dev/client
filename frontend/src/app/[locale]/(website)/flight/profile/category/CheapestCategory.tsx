import SVGIcon from '@/components/defaults/SVGIcons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

const CheapestCategory = () => {
  return (
    <Card className='mt-4 relative rounded-xs bg-white border-none shadow-md'>
      <CardContent>
        <div className='flex flex-col gap-8 items-start'>
          <div className='flex items-start justify-between w-full'>
            <div className='flex gap-2 p-1 bg-[#FFF6EC]'>
              <SVGIcon fileName='icon-bagage-normal.svg' alt='Baggage' width={16} height={16} />
              <SVGIcon fileName='icon-bagage-small.svg' alt='Baggage' width={16} height={16} />
              <h6 className='font-normal text-[#1A1A1A] text-xs leading-[18px]'>Included</h6>
            </div>
            <div className='flex gap-2 items-end justify-end'>
              <Button variant={'outline'} className=' cursor-pointer bg-[#F5F5F5] border-[#E0E0E0] hover:bg-gray-200'>
                <SVGIcon fileName='icon-love.svg' alt='Icon' width={14.35} height={12.8} />
                <span className='font-semibold text-[#1A1A1A] text-xs leading-[18px]'>Save</span>
              </Button>
              <Button variant={'outline'} className=' cursor-pointer bg-[#F5F5F5] border-[#E0E0E0] hover:bg-gray-200'>
                <SVGIcon fileName='icon-thick-right-arrow.svg' alt='Icon' width={13.6} height={12} />
                <span className='font-semibold text-[#1A1A1A] text-xs leading-[18px]'>Share</span>
              </Button>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-12 w-full'>
            <div className='col-span-3 flex flex-col gap-8'>
              <div className='flex items-start gap-6'>
                <div className='flex items-start gap-2'>
                  <Image
                    src={'/images/main/double-airplane-fly.png'}
                    alt='Airplane'
                    width={40}
                    height={40}
                    quality={85}
                    priority
                  />
                  <div className='flex flex-col gap-2 text-[13.78px] leading-[18px]'>
                    <h4 className='font-normal text-[#0F294D]'>Brussels Airlines</h4>
                    <h6 className='font-normal text-[#8592A6]'>Codeshare flight</h6>
                    <div className='flex items-start gap-3'>
                      <SVGIcon fileName='icon-lightning.svg' alt='lightning' width={9.34} height={12.84} />
                      <SVGIcon fileName='icon-cutlery.svg' alt='lightning' width={11.38} height={11.96} />
                      <SVGIcon fileName='icon-play.svg' alt='lightning' width={14} height={10.5} />
                      <SVGIcon fileName='icon-wifi.svg' alt='lightning' width={11.68} height={1021} />
                    </div>
                  </div>
                </div>
                <div className='flex-[1_1_auto] flex items-end justify-end gap-4'>
                  <div className='block'>
                    <h4 className='font-bold text-[#0F294D] text-base md:text-xl leading-normal md:leading-5'>23:55</h4>
                    <span className='font-normal text-[#8592A6] text-[12.8px] leading-[18px]'>LOS T1I</span>
                  </div>
                  <div className='flex flex-col gap-1 items-center justify-center'>
                    <h6 className='text-[#8592A6] text-[11.44px] leading-[18px]'>20h 2m</h6>
                    <div className='relative flex items-start gap-24 display-progress'>
                      <div className='h-[6px] w-[6px] bg-[#DADFE6] rounded-none'></div>
                      <div className='h-[8px] w-[8px] border-2 border-[#DADFE6] bg-transparent rounded-none'></div>
                      <div className='h-[6px] w-[6px] bg-[#DADFE6] rounded-none'></div>
                    </div>
                    <h6 className='text-[#8592A6] text-[12px] leading-[18px]'>2 stops in Frankfurt., Airport</h6>
                  </div>
                  <div className='block relative'>
                    <span className='absolute -top-3 -right-4 font-mono text-[#FF6F00] text-sm'>+1</span>
                    <h4 className='font-bold text-[#0F294D] text-base md:text-xl leading-normal md:leading-5'>14:57</h4>
                    <span className='font-normal text-[#8592A6] text-[12.8px] leading-[18px]'>YXU</span>
                  </div>
                </div>
              </div>
              <div className='flex items-start gap-6'>
                <div className='flex items-start gap-2'>
                  <Image
                    src={'/images/main/double-airplane-fly.png'}
                    alt='Airplane'
                    width={40}
                    height={40}
                    quality={85}
                    priority
                  />
                  <div className='flex flex-col gap-2 text-[13.78px] leading-[18px]'>
                    <h4 className='font-normal text-[#0F294D]'>United Airlines, Air Canada</h4>
                    <h6 className='font-normal text-[#8592A6]'>Codeshare flight</h6>
                    <div className='flex items-start gap-3'>
                      <SVGIcon fileName='icon-lightning.svg' alt='lightning' width={9.34} height={12.84} />
                      <SVGIcon fileName='icon-cutlery.svg' alt='lightning' width={11.38} height={11.96} />
                      <SVGIcon fileName='icon-play.svg' alt='lightning' width={14} height={10.5} />
                      <SVGIcon fileName='icon-wifi.svg' alt='lightning' width={11.68} height={1021} />
                    </div>
                  </div>
                </div>
                <div className='flex-[1_1_auto] flex items-end justify-end gap-4'>
                  <div className='block'>
                    <h4 className='font-bold text-[#0F294D] text-base md:text-xl leading-normal md:leading-5'>23:55</h4>
                    <span className='font-normal text-[#8592A6] text-[12.8px] leading-[18px]'>LOS T1I</span>
                  </div>
                  <div className='flex flex-col gap-1 items-center justify-center'>
                    <h6 className='text-[#8592A6] text-[11.44px] leading-[18px]'>20h 2m</h6>
                    <div className='relative flex items-start gap-24 display-progress'>
                      <div className='h-[6px] w-[6px] bg-[#DADFE6] rounded-none'></div>
                      <div className='h-[8px] w-[8px] border-2 border-[#DADFE6] bg-transparent rounded-none'></div>
                      <div className='h-[6px] w-[6px] bg-[#DADFE6] rounded-none'></div>
                    </div>
                    <h6 className='text-[#8592A6] text-[12px] leading-[18px]'>2 stops in Frankfurt., Airport</h6>
                  </div>
                  <div className='block relative'>
                    <span className='absolute -top-3 -right-4 font-mono text-[#FF6F00] text-sm'>+1</span>
                    <h4 className='font-bold text-[#0F294D] text-base md:text-xl leading-normal md:leading-5'>14:57</h4>
                    <span className='font-normal text-[#8592A6] text-[12.8px] leading-[18px]'>YXU</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-full justify-center items-start gap-2'>
              <div className='w-full flex flex-col gap-1 items-end justify-end'>
                <Button variant={'outline'} className=' rounded-full p-4 text-xs font-bold'>
                  i
                </Button>
                <h2 className='font-bold text-[#1A1A1A] text-base md:text-xl lg:text-2xl leading-normal md:leading-[33.6px]'>
                  US$8,992
                </h2>
                <h5 className='font-sans font-normal text-[#666666] text-sm leading-[21px]'>Return</h5>
              </div>
              <div className=' relative pr-4'>
                <div className=' absolute top-0 left-[2.6rem] -translate-x-1/2 -translate-y-1/2'>
                  <Badge className='text-xs leading-normal bg-[#009DC4]'>{`<5 left`}</Badge>
                </div>
                <Button className='p-6 rounded-lg border border-[#E63A24] bg-[#E63A24] hover:bg-orange-700 cursor-pointer'>
                  Select
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheapestCategory;
