'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, SlidersHorizontal } from 'lucide-react';

interface IEmptyFlightsStateProps {
  hasFiltersApplied: boolean;
  onClearFilters?: () => void;
}

export default function EmptyFlightsState({ hasFiltersApplied, onClearFilters }: IEmptyFlightsStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Card className='border-dashed'>
        <CardContent className='flex flex-col items-center text-center py-16 px-6'>
          <div className='mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#E63A24]'>
            {hasFiltersApplied ? (
              <SlidersHorizontal className='h-7 w-7 text-white' />
            ) : (
              <Plane className='h-7 w-7 text-white' />
            )}
          </div>

          <h3 className='text-xl font-semibold mb-2'>
            {hasFiltersApplied ? 'No flights match your filters' : 'No flights available'}
          </h3>

          <p className='text-muted-foreground max-w-md mb-6'>
            {hasFiltersApplied
              ? 'Try adjusting or clearing some filters to see more flight options.'
              : 'We couldn’t find any flights for this route and date. Try different dates or destinations.'}
          </p>

          {hasFiltersApplied && onClearFilters && (
            <Button variant='outline' onClick={onClearFilters}>
              Clear all filters
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
