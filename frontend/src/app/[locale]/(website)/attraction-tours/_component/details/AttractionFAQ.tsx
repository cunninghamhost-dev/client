'use client';
import { Label } from '@/components/ui/label';
import { ConstAskedQuestions as faqs } from '@/lib/constants/website/attractionstour/tour-details.constants';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AttractionFAQ = () => {
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set());

  const toggleFAQ = (id: string) => {
    const newOpenFAQs = new Set(openFAQs);
    if (newOpenFAQs.has(id)) {
      newOpenFAQs.delete(id);
    } else {
      newOpenFAQs.add(id);
    }
    setOpenFAQs(newOpenFAQs);
  };
  return (
    <div className='my-4 px-12 flex flex-col gap-4'>
      <Label className='font-bold text-xl leading-7'>Frequently asked questions</Label>
      <div className='space-y-4'>
        {faqs.map((faq, _idx) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: _idx * 0.05 }}
          >
            <Collapsible open={openFAQs.has(faq.id)} onOpenChange={() => toggleFAQ(faq.id)}>
              <CollapsibleTrigger className='flex w-full items-center justify-between rounded-lg border p-4 text-left hover:bg-muted/50'>
                <span className='font-bold text-sm leading-5'>{faq.question}</span>
                <ChevronRight className={cn('w-4 h-4 transition-transform', openFAQs.has(faq.id) && 'rotate-90')} />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-4 pb-4 pt-2 text-sm text-gray-600'>{faq.answer}</CollapsibleContent>
            </Collapsible>
          </motion.div>
        ))}
        <Card className='mt-6 bg-muted/30'>
          <CardContent className='px-4'>
            <p className='text-sm text-muted-foreground mb-2'>Tell us how we&apos;re doing and where we can improve</p>
            <Button variant='link' className='text-[#009DC4] text-sm leading-5 p-0 h-auto cursor-pointer'>
              Leave feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttractionFAQ;
