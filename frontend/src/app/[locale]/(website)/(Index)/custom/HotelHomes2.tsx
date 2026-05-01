import React from 'react';
import HeroSearch from '@/components/sample/HeroSearch';
import { SearchParams } from '@/components/sample/types';

const HotelHomes2 = () => {
  const handleSearch = (params: SearchParams) => {
    console.log('Search submitted:', params);
    // You could route to search results page or fetch results here
  };

  return (
    <div>
      <HeroSearch onSearch={handleSearch} />
    </div>
  );
};

export default HotelHomes2;
