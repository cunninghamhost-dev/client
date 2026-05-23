'use client';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Clock, Plane, ChevronRight } from 'lucide-react';
import { AirlineDetails, FlightDetailsProps } from '@/lib/types/flight-search/response-flight-search.type';
import { formatDuration, formatNGN, parseTime } from '@/lib/helper/string-manipulator.helper';

// FlightCard Component - Core display for each flight option
interface IFlightCardProps {
  flight: FlightDetailsProps;
  onSelect: (flightId: string) => void;
}

const FlightCard: React.FC<IFlightCardProps> = ({ flight, onSelect }) => {
  const uniqueAirlines = useMemo(() => {
    const map = new Map<string, AirlineDetails>();
    flight.outbound.forEach((s) => {
      if (!map.has(s.airline_details.code)) {
        map.set(s.airline_details.code, s.airline_details);
      }
    });
    return Array.from(map.values());
  }, [flight.outbound]);
  const allRefundable = flight.outbound.every((s) => s.refundable);
  const baggageInfo = flight.outbound[0]?.baggage ?? 'Not specified';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className='overflow-hidden hover:shadow-lg transition-shadow'>
        <CardHeader className='pb-2'>
          <div className='flex justify-between items-start gap-4'>
            <div className='space-y-2 flex-1 min-w-0'>
              {/* Airlines logos */}
              <div className='flex gap-1 mb-3'>
                {uniqueAirlines.map((airline) => (
                  <div
                    key={airline.code}
                    className='shrink-0 w-8 h-8 rounded-md overflow-hidden border bg-white shadow-sm'
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={airline.logo}
                      alt={airline.name}
                      className='w-full h-full object-contain'
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = airline.code;
                        (e.target as HTMLImageElement).parentElement!.classList.add(
                          'flex',
                          'items-center',
                          'justify-center',
                          'text-xs',
                          'font-bold',
                          'text-muted-foreground',
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
              {/* Itinerary segments */}
              <div className='space-y-3'>
                {flight.outbound.map((segment, idx) => (
                  <div key={idx} className='flex items-center gap-4 text-sm'>
                    {/* Departure time */}
                    <div className='w-14 font-semibold text-lg'>{parseTime(segment.departure_time)}</div>
                    {/* Duration */}
                    <div className='w-16 text-xs text-muted-foreground text-center'>
                      {formatDuration(segment.duration)}
                    </div>
                    {/* From airport */}
                    <div className='text-center min-w-17.5'>
                      <div className='font-semibold'>{segment.airport_from_details.iata_code}</div>
                      <div className='text-xs capitalize'>{segment.airport_from_details.city}</div>
                    </div>
                    {/* Arrow line */}
                    <div className='flex items-center gap-2 flex-1'>
                      <Plane className='h-3 w-3 text-muted-foreground' />
                      <div className='h-px flex-1 bg-linear-to-r from-transparent via-gray-300 to-transparent' />
                    </div>
                    {/* To airport */}
                    <div className='text-center min-w-17.5'>
                      <div className='font-semibold'>{segment.airport_to_details.iata_code}</div>
                      <div className='text-xs capitalize'>{segment.airport_to_details.city}</div>
                    </div>
                    {/* Arrival time */}
                    <div className='w-14 font-semibold text-lg'>{parseTime(segment.arrival_time)}</div>
                  </div>
                ))}
                {/* Layovers between segments */}
                {flight.outbound.slice(0, -1).map((segment, idx) => {
                  if (segment.layover) {
                    return (
                      <div
                        key={`layover-${idx}`}
                        className='text-xs text-muted-foreground text-center py-1 mx-16 border-t border-dashed border-gray-200'
                      >
                        Layover {formatDuration(segment.layover)} in {flight.outbound[idx].airport_to_details.city}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
            {/* Price */}
            <div className='text-right ml-4 shrink-0'>
              <div className='text-3xl lg:text-4xl font-bold bg-linear-to-r from-red-600 to-red-600/60 text-white drop-shadow-sm px-2'>
                {formatNGN(flight.amount)}
              </div>
              <div className='text-xs text-gray-600 mt-1'>Total for 1 adult</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className='pt-0 pb-6'>
          <Separator />
        </CardContent>
        <CardFooter className='flex justify-between items-center pt-0 pb-4 px-6'>
          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Clock className='h-4 w-4' /> <span>{formatDuration(flight.total_duration)}</span>
            </div>
            <Badge variant='outline' className='gap-1'>
              {flight.outbound_stops === 0 ? (
                <span>Non-stop</span>
              ) : (
                <>
                  {flight.outbound_stops} Stop{flight.outbound_stops > 1 ? 's' : ''}
                </>
              )}
            </Badge>
            {allRefundable && <Badge variant='secondary'>Refundable</Badge>} <span>{baggageInfo}</span>
          </div>
          <Button onClick={() => onSelect(flight.id)} className='w-32'>
            Select <ChevronRight className='ml-2 h-4 w-4' />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FlightCard;
