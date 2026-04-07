'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { TTiqwaConfirmPriceResponse } from '@/lib/schemas/server/tiqwa/response/confirm-price-response.schema';
import { formatNGN, truncateText } from '@/lib/helper/string-manipulator.helper';
import { FlightSearchQuery } from '@/lib/types/flight-search/flight-search-url';
import { PlaneIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

const FareSummaryCard = ({ data, params }: { data: TTiqwaConfirmPriceResponse; params: FlightSearchQuery }) => {
  const first = data.outbound[0];
  const last = data.outbound[data.outbound.length - 1];
  const number_travellers = Number(params.adult) + Number(params.child);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className='lg:sticky lg:top-24 h-fit'
    >
      <Card>
        <CardContent className='space-y-4'>
          <h3 className='text-lg font-semibold'>Price details</h3>
          {/**Flight Search Profile details */}
          <div className='block space-y-2'>
            <p className='font-semibold text-base text-gray-700'>Flight</p>
            <div className='flex items-start gap-1 mt-3'>
              <PlaneIcon width={12} height={12} />
              <span className='font-medium text-sm leading-3 text-gray-600'>
                {`${truncateText(first.airport_from_details.city, 16)}(${params.from_code}) to ${truncateText(last.airport_to_details.city, 16)}(${params.to_code})`}
              </span>
            </div>
            <div className='flex items-start gap-1'>
              <span className='font-medium text-sm leading-3 text-gray-600'>Departure date:</span>
              <span className='font-light text-sm leading-3 text-gray-500'>{params.departure}</span>
              <span className='font-light text-sm leading-3 text-gray-500'>
                {format(new Date(first.departure_time), 'HH:mm')}
              </span>
            </div>
          </div>
          <Separator orientation='horizontal' />
          <div className='space-y-2 text-sm'>
            <p className='font-semibold text-base text-gray-700'>Flight Pricing Summary</p>
            <div className='flex justify-between'>
              <div className='flex items-start gap-2'>
                <span className='font-medium text-sm leading-3 text-gray-600'>Base Fare</span>
                <span className='font-medium text-xs leading-3 text-gray-500 mt-0.5'>{`for ${number_travellers} ${number_travellers > 1 ? 'travellers' : 'traveller'}`}</span>
              </div>
              <span>{formatNGN(data.pricing.base_fare)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Taxes</span>
              <span>{data.pricing.tax ? formatNGN(data.pricing.tax) : 0}</span>
            </div>
            <div className='flex justify-between'>
              <span>Discount</span>
              <span>{data.pricing.markup ? formatNGN(data.pricing.markup) : 0}</span>
            </div>
          </div>
          <div className='border-t pt-4 flex justify-between text-lg font-semibold'>
            <span>Total</span>
            <span>{formatNGN(data.pricing.payable)}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FareSummaryCard;
