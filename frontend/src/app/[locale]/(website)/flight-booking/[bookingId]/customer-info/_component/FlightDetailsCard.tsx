'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TTiqwaConfirmPriceResponse } from '@/lib/schemas/server/tiqwa/response/confirm-price-response.schema';
import FlightSegmentRow from './FlightSegmentRow';
import { ArrowLeftRight } from 'lucide-react';

const FlightDetailsCard = ({ data }: { data: TTiqwaConfirmPriceResponse }) => {
  const first = data.outbound[0];
  const last = data.outbound[data.outbound.length - 1];
  return (
    <motion.div layout>
      <Card>
        <Accordion type='single' defaultValue='flight' collapsible>
          <AccordionItem value='flight'>
            <AccordionTrigger className='px-3 py-4'>
              <div className='block space-y-1.5'>
                <div className='flex items-start justify-baseline gap-4'>
                  <h2 className='text-base md:text-xl font-semibold'>{first.airport_from_details.city}</h2>
                  <ArrowLeftRight />
                  <h2 className='text-base md:text-xl font-semibold'>{last.airport_to_details.city}</h2>
                </div>

                <p className='text-sm text-muted-foreground px-2'>
                  {data.outbound_stops} Stop • {Math.floor(data.total_duration / 60)}h {data.total_duration % 60}m
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className='space-y-6'>
                {data.outbound.map((segment, idx) => (
                  <FlightSegmentRow key={idx} segment={segment} />
                ))}
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </motion.div>
  );
};

export default FlightDetailsCard;
