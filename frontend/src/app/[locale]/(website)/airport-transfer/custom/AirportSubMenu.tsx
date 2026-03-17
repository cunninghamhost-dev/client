import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import AirportTransferTabMenu from './AirportTransferTabMenu';

const AirportSubMenu = () => {
  return (
    <Card className='destination-card  bg-white rounded-md backdrop-blur-md border-white/20 text-gray-700 pointer-events-auto transition-all'>
      <CardContent className='px-4'>
        <AirportTransferTabMenu />
      </CardContent>
    </Card>
  );
};

export default AirportSubMenu;
