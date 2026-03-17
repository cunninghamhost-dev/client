import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FlightSession from '../../(Index)/custom/FlightSession';
import { ServerIndicator } from '@/components/defaults/server-controls/ServerIndicator';

const FlightSubMenu = () => {
  return (
    <Card className='relative py-2 destination-card  bg-white rounded-md backdrop-blur-md border-white/20 text-gray-700 pointer-events-auto transition-all'>
      <CardContent className='px-4 flex items-center justify-center'>
        <FlightSession />
      </CardContent>
      <ServerIndicator />
    </Card>
  );
};

export default FlightSubMenu;
