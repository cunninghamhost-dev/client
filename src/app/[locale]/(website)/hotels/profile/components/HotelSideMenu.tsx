'use client';
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import MapDisplay from '../../custom/sidemenu/MapDisplay';
import HotelFiltersSelect from '../../custom/sidemenu/HotelFiltersSelect';

const HotelSideMenu = () => {
  const [searchFilters, setSearchFilter] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };
  return (
    <aside className='w-full'>
      <div className='flex flex-col items-start'>
        <MapDisplay />
        {/* Search Filters */}
        <Card className='w-full mb-12'>
          <CardContent>
            <div className='space-y-4 py-2 px-1'>
              <div className='flex flex-col gap-6 mb-4'>
                <Separator />
                <div className='block space-y-4'>
                  <Label className='font-light text-lg leading-6' htmlFor='searchPropertyName'>
                    Search by property name
                  </Label>
                  <Input type='text' value={searchFilters} onChange={handleSearchChange} />
                </div>
                <Separator />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='font-normal text-lg leading-6'>Filter by</h3>
                <ScrollArea className='w-full h-screen overflow-y-hidden'>
                  <div className='flex flex-col gap-0'>
                    <HotelFiltersSelect />
                  </div>
                </ScrollArea>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};

export default HotelSideMenu;
