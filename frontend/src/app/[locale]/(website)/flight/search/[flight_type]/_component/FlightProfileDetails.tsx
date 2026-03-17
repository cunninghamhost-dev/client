'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Clock } from 'lucide-react';
import { AirlineDetails, FlightDetailsProps } from '@/lib/types/flight-search/response-flight-search.type';
import { formatDuration, formatNGN, parseTime } from '@/lib/helper/string-manipulator.helper';

interface IFlightCardProps {
  flight: FlightDetailsProps;
  onSelect: (flightId: string) => void;
}

const FlightProfileDetails: React.FC<IFlightCardProps> = ({ flight, onSelect }) => {
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
      <Card className='overflow-hidden hover:shadow-lg transition-shadow max-w-sm lg:max-w-full'>
        <CardHeader>
          <div className='p-2 lg:p-5'>
            <div className='flight-detail-wrap grid-template justify-between lg:justify-baseline'>
              {uniqueAirlines.map((airline) => (
                <div key={`${airline.name}_${airline.code}`} className='flex items-center gap-4'>
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
                  <h6 className='text-base font-semibold leading-[155%] text-gray-700'>{airline.name}</h6>
                </div>
              ))}
              <div className='relative flex justify-end gap-8 items-end'>
                <div className='block space-y-1 items-end'>
                  <span className='text-sm text-muted-foreground text-center'>Full Pay</span>
                  <h5 className='text-base lg:text-xl leading-5 font-semibold lg:font-medium mb-0'>
                    {formatNGN(flight.amount)}
                  </h5>
                </div>
                <Button
                  variant={'outline'}
                  onClick={() => onSelect(flight.id)}
                  className='hidden lg:inline py-2.5 px-4 text-[#E63A24] hover:text-white hover:bg-[#E63A24] border-[#E63A24] hover:border-[#B02D1C] cursor-pointer'
                >
                  Book Now
                </Button>
              </div>
            </div>
            <Separator orientation='horizontal' />
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
            <div className='block space-y-3.5 mt-4 md:mt-1'>
              <div className='flex items-baseline flight-travel-heading'>
                <h6 className='text-gray-500 font-medium m-0 leading-[155%] text-base'>Departure</h6>
                <ul className='m-0 text-[#747678] list-none'>
                  <li className='relative inline-block pt-0 px-1.25 text-sm'>
                    {parseTime(flight.outbound[0].departure_time)}
                  </li>
                  <li className='relative inline-block pt-0 px-1.25 text-sm'>
                    {flight.outbound[0].airline_details.name}
                  </li>
                </ul>
              </div>
              <div className=' block space-y-2'>
                {flight.outbound.map((segment, _idx) => (
                  <div key={_idx} className='flex justify-between gap-6 py-3.75 px-5 bg-[#f8f8f8]'>
                    <div className='space-y-0'>
                      {/* Departure time */}
                      <div className='font-semibold text-base lg:text-lg'>{parseTime(segment.departure_time)}</div>
                      <div className='hidden lg:inline text-xs capitalize'>{`${segment.airport_from_details.city}(${segment.airport_from_details.iata_code})`}</div>
                      <div className='inline lg:hidden text-xs capitalize'>{`${segment.airport_from_details.city}`}</div>
                    </div>
                    <div className='flex items-center gap-2 flex-1'>
                      <div className='hidden lg:inline shrink-0 w-8 h-8 rounded-md overflow-hidden border bg-white shadow-sm'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={'/images/main/double-airplane-fly.png'}
                          alt='Airplane'
                          className='w-full h-full object-contain'
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = segment.airline_details.code;
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
                      <div className='relative w-full'>
                        <h6 className='absolute right-0 lg:right-8 bottom-0 text-[#8592A6] text-[11.44px] leading-4.5 w-full lg:w-fit'>
                          {formatDuration(segment.duration)}
                        </h6>
                        <div className='h-px flex-1 bg-linear-to-r from-transparent via:gray-600 lg:via-gray-300 to-transparent' />
                      </div>
                    </div>
                    <div className='space-y-0'>
                      {/* To airport */}
                      <div className='w-10 lg:w-14 font-semibold text-base lg:text-lg'>
                        {parseTime(segment.arrival_time)}
                      </div>
                      <div className='hidden lg:inline text-xs capitalize'>{`${segment.airport_to_details.city}(${segment.airport_to_details.iata_code})`}</div>
                      <div className='inline lg:hidden text-xs capitalize'>{`${segment.airport_to_details.city}`}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className='pt-0'>
          <Separator />
        </CardContent>
        <CardFooter className='flex items-baseline pt-0 pb-4 px-6'>
          <div className='flex flex-col gap-4 w-full'>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <div className='hidden lg:flex items-center gap-1'>
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
              <div className=''>
                {allRefundable && <Badge variant='secondary'>Refundable</Badge>} <span>{baggageInfo}</span>
              </div>
            </div>
            <div className='w-full'>
              <Button
                variant={'outline'}
                onClick={() => onSelect(flight.id)}
                className='w-full inline lg:hidden py-2.5 px-4 text-white bg-[#E63A24] cursor-pointer'
              >
                Book Now
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FlightProfileDetails;
