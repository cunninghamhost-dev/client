import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const MapDisplay = () => {
  return (
    <div className='my-4 w-full'>
      <Card className='destination-card  bg-white rounded-md backdrop-blur-md border-white/20 text-gray-700 pointer-events-auto transition-all'>
        <CardContent className='px-4'>
          <div className='flex items-center justify-center text-center'>
            <h3>View in a Map</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapDisplay;
