'use client';
import React from 'react';
import { useTrendingFlight } from '@/lib/hooks/server/home/useTrendingFlight.hook';
import TrendingFlightGrid from '@/components/website/home/TrendingFlightGrid';

export default function TrendingFlight2() {
  const { data, isLoading, isError } = useTrendingFlight();
  if (isLoading) {
    return <p className='text-center mt-10'>Loading trending flights...</p>;
  }
  if (isError || !data) {
    return <p className='text-center mt-10 text-red-500'>Failed to load flights</p>;
  }

  return <TrendingFlightGrid amadeusResponse={data!} />;
}
