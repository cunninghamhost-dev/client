import React, { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

import { Button } from '@/components/ui/button';
import type { TCountrySelectProps } from '@/types/default.type';
import { ScrollArea } from '../ui/scroll-area';

// interface Country {
//   country: string;
//   continent: string;
// }

// interface CountryListProps {
//   countries: Country[];
// }

const SampleCountryList = ({ countries }: { countries: TCountrySelectProps[] }) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  // Group countries by continent
  const grouped = countries.reduce((acc: Record<string, string[]>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item.countryName);
    return acc;
  }, {});

  // Sort continents alphabetically
  const continents = Object.keys(grouped);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
          <div className='flex items-center box-border cursor-pointer text-sm h-12 leading-10 rounded px-2 py-0'>
            {countries ? (
              <span className='text-ellipsis overflow-hidden whitespace-nowrap font-normal text-[#051a37]'>
                {countries.find((country) => country.countryName === selectedCountry)?.countryName}
              </span>
            ) : (
              <span className='text-ellipsis overflow-hidden whitespace-nowrap font-bold text-gray-500'>
                Leaving From
              </span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandInput placeholder='Select Country...' className='h-9' />
          <CommandList>
            <ScrollArea className='h-72 w-48 rounded-md border'>
              {continents.map((continent) => (
                <CommandGroup key={continent} heading={continent}>
                  <div className=' box-border h-[479px] max-h-[80vh] w-[596px] pt-4 rounded-br-lg rounded-bl-lg'>
                    <div className='box-border h-full overflow-x-hidden overflow-y-auto pt-0 pb-6 px-4'>
                      <div className='grid grid-cols-[repeat(3,200px)] gap-[16px_12px]'>
                        {grouped[continent].sort().map((country) => (
                          <CommandItem
                            key={country}
                            value={country}
                            onSelect={(currentValue) => {
                              setSelectedCountry(currentValue === selectedCountry ? '' : currentValue);
                              setOpen(false);
                            }}
                          >
                            {country}
                          </CommandItem>
                        ))}
                      </div>
                    </div>
                  </div>
                </CommandGroup>
              ))}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SampleCountryList;
