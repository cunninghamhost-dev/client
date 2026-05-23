import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Copy } from 'lucide-react';
import React from 'react';
import { FaLock } from 'react-icons/fa6';

const PolicyStatement = () => {
  return (
    <Card className='rounded-sm shadow-none  border-[#BDBDBD] w-full p-[1px] text-[#1A1A1A]'>
      <CardContent>
        <div className='block space-y-6 px-[18px] pt-6 pb-[15px]'>
          <p className='text-[13px] leading-[18.2px]'>
            By clicking on the button below, I acknowledge that I have reviewed the{' '}
            <span className='px-4 text-[#009DC4] inline-flex space-x-8'>
              Privacy Statement &nbsp;
              <Copy className='mt-0.5' size={16} />{' '}
            </span>{' '}
            and
            <span className='pr-4 text-[#009DC4] inline-flex space-x-8'>
              Government Travel Advice &nbsp;
              <Copy className='mt-0.5' size={16} />{' '}
            </span>{' '}
            and have reviewed and accept the
            <span className='px-4 text-[#009DC4] inline-flex space-x-8'>
              Rules and Restrictions &nbsp;
              <Copy className='mt-0.5' size={16} />{' '}
            </span>{' '}
            and
            <span className='text-[#009DC4] inline-flex space-x-8'>
              Terms of Use &nbsp;
              <Copy className='mt-0.5' size={16} />{' '}
            </span>
            {' .'}
          </p>
          <Button className='bg-[#E63A24] cursor-pointer hover:bg-[#c2240f]' variant={'default'} asChild>
            <div className='inline-flex space-x-2 text-white'>
              <span className='text-sm leading-[21px]'>Reserve Now</span>
              <ChevronRight className='mt-0.5' size={16} />
            </div>
          </Button>
          <div className='flex items-start gap-3 text-[#666666]'>
            <FaLock size={24} />
            <div className='mt-1 block space-y-3 text-[13px] leading-[18.2px] '>
              <p>We use secure transmission and encrypted storage to protect your personal information.</p>
              <p>
                Payments are processed in the U.S. except where the travel provider (hotel / airline etc) processes your
                payment outside the U.S., in which case your card issuer may charge a foreign transaction fee.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicyStatement;
