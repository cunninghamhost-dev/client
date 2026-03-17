'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CarRentals from '../../(Index)/custom/CarRentals';

const CarSubMenu = () => {
  return (
    <Card className='destination-card  bg-white rounded-md backdrop-blur-md border-white/20 text-gray-700 pointer-events-auto transition-all'>
      <CardContent className='px-4'>
        <CarRentals />
      </CardContent>
    </Card>
  );
};

export default CarSubMenu;
