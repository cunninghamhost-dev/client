import React, { useState } from 'react';
import type { TCountrySelectProps } from '@/types/default.type';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command';

const CountrySelection = ({ countries }: { countries: TCountrySelectProps[] }) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry] = useState('');
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
          <div className='flex items-center box-border cursor-pointer text-sm h-12 leading-10 rounded px-2 py-0'>
            {selectedCountry ? (
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
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput placeholder='Select Language...' className='h-9' />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountrySelection;
