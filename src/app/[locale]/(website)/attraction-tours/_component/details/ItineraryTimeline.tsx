'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ILocationPoint, ItineraryStop } from '@/types/website/attractions.type';
import { FaCheck } from 'react-icons/fa6';

// const MapComponent = dynamic(() => import('@/components/defaults/MapComponent'), {
//   ssr: false,
//   loading: () => (
//     <div className='h-64 bg-gray-100 rounded-lg flex items-center justify-center'>
//       <div className='text-gray-500'>Loading map...</div>
//     </div>
//   ),
// });

interface ItineraryTimelineProps {
  title?: string;
  stops: ItineraryStop[];
  departurePoint: ILocationPoint;
  endPoint: ILocationPoint;
  className?: string;
}

const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({
  title = 'Itinerary information',
  stops,
  departurePoint,
  endPoint,
  className = '',
}) => {
  const [showAllStops, setShowAllStops] = useState(false);
  const [hoveredStop, setHoveredStop] = useState<string | null>(null);

  const visibleStops = showAllStops ? stops : stops.slice(0, 2);
  //const hiddenStopsCount = stops.length - visibleStops.length;

  // const allCoordinates = [departurePoint.coordinates, ...stops.map((stop) => stop.coordinates), endPoint.coordinates];
  console.log('Itinerary Timeline:', hoveredStop);
  return (
    <div className={`my-4 px-12 flex flex-col gap-4 max-w-3xl text-[#1A1A1A] ${className}`}>
      {/* Header */}
      <div>
        <h2 className='text-xl leading-7 font-bold mb-6'>{title}</h2>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='relative'>
          {/* Timeline Line */}
          <div className='absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200' />
          {/* Timeline Items */}
          <div className='space-y-8'>
            {visibleStops.map((stop, index) => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className='relative flex items-start space-x-4'
                onMouseEnter={() => setHoveredStop(stop.id)}
                onMouseLeave={() => setHoveredStop(null)}
              >
                {/* Timeline Marker */}
                <motion.div
                  className='relative z-10 flex-shrink-0'
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className='w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shadow-lg'>
                    <MapPin className='w-3.5 h-5 text-[#1A1A1A]' />
                  </div>
                </motion.div>
                {/* Content */}
                <div className='flex-1 min-w-0'>
                  <motion.div
                    className='p-2'
                    whileHover={{
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      y: -2,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {/* Duration Badge */}
                    <div className='flex items-center space-x-2 mb-3'>
                      <Clock className='mt-1 w-4 h-4' />
                      <span className='text-sm font-bold'>{stop.duration}</span>
                    </div>
                    {/* Stop Title */}
                    <div className='mt-2 flex flex-col gap-1 mb-2'>
                      <h3 className='inline-flex space-x-1 text-base leading-6'>
                        <span>Stop at: </span>
                        <span className='font-bold'>{stop.title}</span>
                      </h3>
                      {stop.freeAdmission && (
                        <Badge variant='secondary' className='text-[#148148] text-xs'>
                          <FaCheck className='w-3 h-3 mr-1' />
                          Free admission
                        </Badge>
                      )}
                    </div>
                    {/* Description */}
                    <p className='text-gray-600 text-base mb-1 leading-6'>{stop.description}</p>
                    {/* Time at location */}
                    <div className='flex items-center space-x-2'>
                      <Clock className='w-4 h-4 text-gray-400' />
                      <span className='text-xs text-gray-500'>{stop.timeAtLocation}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
            {/* Hidden stops with animation */}
            <AnimatePresence>
              {showAllStops &&
                stops.slice(2).map((stop, index) => (
                  <motion.div
                    key={stop.id}
                    initial={{ opacity: 0, height: 0, x: -20 }}
                    animate={{ opacity: 1, height: 'auto', x: 0 }}
                    exit={{ opacity: 0, height: 0, x: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className='relative flex items-start space-x-4'
                    onMouseEnter={() => setHoveredStop(stop.id)}
                    onMouseLeave={() => setHoveredStop(null)}
                  >
                    {/* Timeline Marker */}
                    <motion.div className='relative z-10 flex-shrink-0' whileHover={{ scale: 1.1 }}>
                      <div className='w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shadow-lg'>
                        <MapPin className='w-3.5 h-5 text-[#1A1A1A]' />
                      </div>
                    </motion.div>
                    {/* Content */}
                    <div className='flex-1 min-w-0'>
                      <motion.div
                        className='p-2'
                        whileHover={{
                          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                          y: -2,
                        }}
                      >
                        {/* Duration Badge */}
                        <div className='flex items-center space-x-2 mb-3'>
                          <Clock className='mt-1 w-4 h-4' />
                          <span className='text-sm font-bold'>{stop.duration}</span>
                        </div>
                        {/* Stop Title */}
                        <div className='mt-2 flex flex-col gap-1 mb-2'>
                          <h3 className='inline-flex space-x-1 text-base leading-6'>
                            <span>Stop at: </span>
                            <span className='font-bold'>{stop.title}</span>
                          </h3>
                          {stop.freeAdmission && (
                            <Badge variant='secondary' className='text-[#148148] text-xs'>
                              <FaCheck className='w-3 h-3 mr-1' />
                              Free admission
                            </Badge>
                          )}
                        </div>
                        {/* Description */}
                        <p className='text-gray-600 text-base mb-1 leading-6'>{stop.description}</p>
                        {/* Time at location */}
                        <div className='flex items-center space-x-2'>
                          <Clock className='w-4 h-4 text-gray-400' />
                          <span className='text-xs text-gray-500'>{stop.timeAtLocation}</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
            {/* Show More/Less Button */}
            {stops.length > 2 && (
              <motion.div
                className='relative flex items-start'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  variant='link'
                  onClick={() => setShowAllStops(!showAllStops)}
                  className='text-[#009DC4] hover:text-[#087894] flex items-center space-x-1 cursor-pointer '
                >
                  {showAllStops ? (
                    <>
                      <span>Show less</span>
                      <ChevronUp className='mt-0.5 w-4 h-4' />
                    </>
                  ) : (
                    <>
                      <span>Show all {stops.length} stops</span>
                      <ChevronDown className='w-4 h-4' />
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* Location/Map Section */}
      <div className='flex flex-col gap-6'>
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className='flex flex-col gap-4'>
            <h3 className='font-semibold text-gray-900 text-xl leading-7'>Location</h3>
            {/* <MapComponent
              coordinates={allCoordinates}
              stops={stops}
              departurePoint={departurePoint}
              endPoint={endPoint}
              hoveredStop={hoveredStop}
            /> */}
          </div>
        </motion.div>
        {/* Departure and End Points */}
        <motion.div
          className='space-y-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* Departure Point */}
          <div className='flex items-start space-x-3'>
            <div className='flex-shrink-0 mt-1'>
              <MapPin className='w-4 h-4' />
            </div>
            <div className='text-base leading-7 flex flex-col gap-0.5'>
              <h4 className='font-bold'>Departure point</h4>
              <p className='text-sm'>{departurePoint.address}</p>
              <p className='text-sm'>{departurePoint.instructions}</p>
            </div>
          </div>
          {/* End Point */}
          <div className='flex items-start space-x-3'>
            <div className='flex-shrink-0 mt-1'>
              <MapPin className='w-4 h-4' />
            </div>
            <div className='text-base leading-7 flex flex-col gap-0.5'>
              <h4 className='font-bold'>End point</h4>
              <p className='text-sm'>{endPoint.address}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ItineraryTimeline;
