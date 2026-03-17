'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TTiqwaConfirmPriceResponse } from '@/lib/schemas/server/tiqwa/response/confirm-price-response.schema';
import FlightDetailsCard from './_component/FlightDetailsCard';
import FareSummaryCard from './_component/FareSummaryCard';
import { FlightSearchQuery } from '@/lib/types/flight-search/flight-search-url';
import ImportantNotice from './_component/ImportantNotice';
import CustomerBookingForm from './_component/CustomerBookingForm';

// const mockData = {
//   amount: 561259.0,
//   bookable_seats: 8,
//   currency: 'NGN',
//   document_required: true,
//   expires_at: '2026-02-08',
//   fare_basis: 'UL0DSI05',
//   id: 'ama_0aa0a602-d6fa-4cd1-995d-46e6b9394cea',
//   inbound: [],
//   inbound_stops: 0,
//   is_multicity: false,
//   office_id: 'NCEPF3224',
//   outbound: [
//     {
//       airline_details: {
//         code: 'TP',
//         logo: 'https://image.tiqwa.com/airlines/TP.png',
//         name: 'TAP Portugal',
//       },
//       airport_from: 'LHR',
//       airport_from_details: {
//         city: 'London',
//         city_code: 'LON',
//         country: 'United Kingdom',
//         country_code: 'GB',
//         iata_code: 'LHR',
//         name: 'Heathrow',
//       },
//       airport_to: 'LIS',
//       airport_to_details: {
//         city: 'Lisbon',
//         city_code: 'LIS',
//         country: 'Portugal',
//         country_code: 'PT',
//         iata_code: 'LIS',
//         name: 'Lisbon Portela',
//       },
//       arrival_time: new Date('2026-02-10 11:00:00'),
//       baggage: '0 checkin allowance',
//       booking_class: 'U',
//       cabin_type: 'economy',
//       departure_time: new Date('2026-02-10 08:15:00'),
//       duration: 165,
//       equipment_type: '32Q',
//       flight_number: '1351',
//       layover: 340,
//       marketing_airline: 'TP',
//       marriage_group: null,
//       operating_airline: 'TP',
//       overnight: false,
//     },
//     {
//       airline_details: {
//         code: 'TP',
//         logo: 'https://image.tiqwa.com/airlines/TP.png',
//         name: 'TAP Portugal',
//       },
//       airport_from: 'LIS',
//       airport_from_details: {
//         city: 'Lisbon',
//         city_code: 'LIS',
//         country: 'Portugal',
//         country_code: 'PT',
//         iata_code: 'LIS',
//         name: 'Lisbon Portela',
//       },
//       airport_to: 'JFK',
//       airport_to_details: {
//         city: 'New York',
//         city_code: 'NYC',
//         country: 'United States',
//         country_code: 'US',
//         iata_code: 'JFK',
//         name: 'John F. Kennedy International',
//       },
//       arrival_time: '2026-02-10 20:05:00',
//       baggage: '0 checkin allowance',
//       booking_class: 'U',
//       cabin_type: 'economy',
//       departure_time: '2026-02-10 16:40:00',
//       duration: 205,
//       equipment_type: '32Q',
//       flight_number: '209',
//       layover: null,
//       marketing_airline: 'TP',
//       marriage_group: null,
//       operating_airline: 'TP',
//       overnight: false,
//     },
//   ],
//   outbound_stops: 1,
//   price_change: false,
//   price_summary: [
//     {
//       passenger_type: 'adult',
//       quantity: 1,
//       total_price: 561259.0,
//     },
//   ],
//   pricing: {
//     base_fare: 115384.0,
//     markup: null,
//     payable: 561259.0,
//     tax: 445875.0,
//   },
//   total_duration: 710,
//   total_inbound_duration: 0,
//   total_outbound_duration: 710,
//   travelers_price: [
//     {
//       adult: 561259.0,
//     },
//   ],
// } as TTiqwaConfirmPriceResponse; // replace with query result

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
