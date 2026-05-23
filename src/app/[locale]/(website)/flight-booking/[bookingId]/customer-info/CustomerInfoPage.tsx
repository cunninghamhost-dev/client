'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import FlightDetailsCard from './_component/FlightDetailsCard';
import FareSummaryCard from './_component/FareSummaryCard';
import ImportantNotice from './_component/ImportantNotice';
import CustomerBookingForm from './_component/CustomerBookingForm';
import { FlightSearchQuery } from '@/lib/types/flight-search/flight-search-url';
import { useConfirmPriceHook } from '@/lib/hooks/tiqwa/confirm-price.hook';

const CustomerInfoPage = ({
  search_param,
  flight_id,
}: {
  search_param: FlightSearchQuery;
  flight_id: string;
}) => {
  const { mutate, data, isPending } = useConfirmPriceHook();

  useEffect(() => {
    if (flight_id) mutate(flight_id);
  }, [flight_id, mutate]);

  if (isPending || !data) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className='w-full grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6'
    >
      <div className='order-2 md:order-1 w-full flex flex-col items-start gap-4'>
        <FlightDetailsCard data={data} />
        <ImportantNotice />
        <CustomerBookingForm
          flightId={flight_id}
          totalAmount={data.pricing.payable}
          searchParams={search_param}
          departureDate={new Date(data.outbound[0].departure_time)}
          departureCity={data.outbound[0].airport_from_details.city}
          arrivalCity={
            data.outbound[data.outbound.length - 1].airport_to_details.city
          }
        />
      </div>

      <div className='order-1 md:order-2 w-full'>
        <FareSummaryCard data={data} params={search_param} />
      </div>
    </motion.div>
  );
};

export default CustomerInfoPage;
