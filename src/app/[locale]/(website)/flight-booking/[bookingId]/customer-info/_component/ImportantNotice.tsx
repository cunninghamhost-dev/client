import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { IoInformationCircle } from 'react-icons/io5';

const ImportantNotice = () => {
  return (
    <motion.div layout>
      <Card>
        <Accordion type='single' defaultValue='notice' collapsible>
          <AccordionItem value='notice'>
            <AccordionTrigger className='px-6 py-4'>
              <div className='flex items-start justify-baseline gap-3'>
                <IoInformationCircle size={28} color='#E17100' />
                <h1 className='mt-0.5 font-bold text-base md:text-xl lg:text-2xl leading-[150%] text-gray-800'>
                  Important Information
                </h1>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className='mt-2 space-y-4'>
                <h2 className='font-semibold text-orange-700 text-sm md:text-base leading-[150%]'>NOTICE</h2>
                <p className='font-medium text-gray-600 text-sm md:text-base leading-5 w-full md:max-w-xl'>
                  We recommend double-checking your route and itinerary before continuing. This helps avoid any issues,
                  as Cunningham cannot be held responsible for errors resulting from an incorrect route selection.
                </p>
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </motion.div>
  );
};

export default ImportantNotice;
