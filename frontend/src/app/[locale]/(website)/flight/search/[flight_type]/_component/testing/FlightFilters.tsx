import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, MapPin, Plane, Filter } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { formatDuration, formatNGN } from '@/lib/helper/string-manipulator.helper';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { flightFilterState } from '@/lib/types/flight-search/flight-search-parser';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface IFlightFiltersProps {
  filterState: flightFilterState;
  onPriceChange: (value: number[]) => void;
  onDurationChange: (value: number[]) => void;
  toggleStop: (stop: number) => void;
  toggleAirline: (airline: string) => void;
  setRefundableOnly: (value: boolean) => void;
  onClear?: () => void;
  uniqueAirlines: string[];
  minPrice: number;
  maxPrice: number;
  maxDuration: number;
}

const FlightFilters: React.FC<IFlightFiltersProps> = ({
  filterState,
  onPriceChange,
  onDurationChange,
  toggleStop,
  toggleAirline,
  setRefundableOnly,
  onClear,
  uniqueAirlines,
  minPrice,
  maxPrice,
  maxDuration,
}) => {
  const stopOptions = [
    { value: 0, label: 'Non-stop' },
    { value: 1, label: '1 stop' },
    { value: 2, label: '2+ stops' },
  ];
  return (
    <div className='space-y-6 p-6'>
      <Accordion type='multiple' className='w-full px-4' defaultValue={['price', 'stops']}>
        <AccordionItem value='price'>
          <AccordionTrigger className='hover:no-underline'>
            <div className='flex items-center gap-2'>
              <Filter className='h-4 w-4' /> <span>Price</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className='space-y-4 mt-1.5'>
              <Slider
                value={filterState.priceRange}
                onValueChange={onPriceChange}
                max={maxPrice}
                min={minPrice}
                step={10000}
                className='w-full'
              />
              <div className='flex justify-between text-xs text-muted-foreground'>
                <span>{formatNGN(filterState.priceRange[0])}</span>
                <span>{formatNGN(filterState.priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='stops'>
          <AccordionTrigger>
            <div className='flex items-center gap-2'>
              <MapPin className='h-4 w-4' /> <span>Stops</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className='space-y-2'>
              {stopOptions.map(({ value, label }) => (
                <div key={value} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`stop-${value}`}
                    checked={filterState.selectedStops.includes(value)}
                    onCheckedChange={() => toggleStop(value)}
                  />
                  <Label htmlFor={`stop-${value}`}>{label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='airlines'>
          <AccordionTrigger>
            <div className='flex items-center gap-2'>
              <Plane className='h-4 w-4' /> <span>Airlines ({uniqueAirlines.length})</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className='h-48'>
              <div className='space-y-2'>
                {uniqueAirlines.map((airline) => (
                  <div key={airline} className='flex items-center space-x-2'>
                    <Checkbox
                      id={`airline-${airline}`}
                      checked={filterState.selectedAirlines.includes(airline)}
                      onCheckedChange={() => toggleAirline(airline)}
                    />
                    <Label htmlFor={`airline-${airline}`} className='truncate'>
                      {airline}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='duration'>
          <AccordionTrigger>
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4' /> <span>Duration</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className='space-y-4'>
              <Slider
                value={filterState.durationRange}
                onValueChange={onDurationChange}
                max={maxDuration}
                min={0}
                step={15}
              />
              <div className='flex justify-between text-xs text-muted-foreground'>
                <span>{formatDuration(filterState.durationRange[0])}</span>
                <span>{formatDuration(filterState.durationRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='refundable'>
          <AccordionTrigger className='py-2'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='refundable'
                checked={filterState.refundableOnly}
                onCheckedChange={(checked) => setRefundableOnly(!!checked)}
              />
              <Label htmlFor='refundable' className='cursor-pointer'>
                Refundable only
              </Label>
            </div>
          </AccordionTrigger>
          <AccordionContent />
        </AccordionItem>
      </Accordion>
      {onClear && (
        <>
          <Separator />
          <Button variant='outline' className='w-full' onClick={onClear}>
            Clear All Filters
          </Button>
        </>
      )}
    </div>
  );
};

export default FlightFilters;
