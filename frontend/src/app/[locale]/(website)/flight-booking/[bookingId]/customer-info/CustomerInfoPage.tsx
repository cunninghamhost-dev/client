'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TTiqwaConfirmPriceResponse } from '@/lib/schemas/server/tiqwa/response/confirm-price-response.schema';
import FlightDetailsCard from './_component/FlightDetailsCard';
import FareSummaryCard from './_component/FareSummaryCard';
import { FlightSearchQuery } from '@/lib/types/flight-search/flight-search-url';
import ImportantNotice from './_component/ImportantNotice';
import CustomerBookingForm from './_component/CustomerBookingForm';

const CustomerInfoPage = ({
  data_profile,
  search_param,
  flight_id,
}: {
  data_profile: TTiqwaConfirmPriceResponse;
  search_param: FlightSearchQuery;
  flight_id: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className='w-full grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6'
    >
      <div className='order-2 md:order-1 w-full flex flex-col item-start gap-4'>
        <FlightDetailsCard data={data_profile} />
        <ImportantNotice />
        <CustomerBookingForm
          flightId={flight_id}
          totalAmount={data_profile.amount}
          searchParams={search_param}
          departureDate={data_profile.outbound[0].departure_time}
          departureCity={data_profile.outbound[0].airport_from_details.city}
          arrivalCity={data_profile.outbound[data_profile.outbound.length - 1].airport_to_details.city}
        />
      </div>
      <div className='order-1 md:order-2 w-full4'>
        <FareSummaryCard data={data_profile} params={search_param} />
      </div>
    </motion.div>
  );
};

export default CustomerInfoPage;
