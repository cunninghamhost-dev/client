'use client';

import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { TCountryResponse, useGetSelectCountries } from '@/lib/hooks/defaults/countries.hook';
import { CONTINENT_LABELS } from '@/lib/schemas/enums/labels/select-labels.enum';
import { useDebounce } from '@/lib/hooks/context/default/usedebounce.hook';
import { ClientContinent } from '@/lib/schemas/enums/select-types.enum';
import { DialogTitle } from '@radix-ui/react-dialog';
import { truncateText } from '@/lib/helper/string-manipulator.helper';

interface ICountrySelectProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

export function CountrySelectField({
  value,
  onChange,
  label,
  placeholder = 'Select country',
  disabled,
}: ICountrySelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const debouncedQuery = useDebounce(search, 400);
  // ✅ Fetch ONLY when dialog is open
  const { data, isLoading } = useGetSelectCountries(debouncedQuery, undefined, 200, {
    enabled: open,
  });
  const countries = React.useMemo<TCountryResponse[]>(() => data ?? [], [data]);

  // Group by continent
  const grouped = React.useMemo(() => {
    return countries.reduce<Record<string, typeof countries>>((acc, country) => {
      acc[country.continent] ||= [];
      acc[country.continent].push(country);
      return acc;
    }, {});
  }, [countries]);

  const selectedCountry = value ? countries.find((c) => c.iso2 === value) : undefined;
  function handleSelect(country: TCountryResponse) {
    console.log('Select Country Profile: ', country);
    onChange(country.iso2);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          disabled={disabled}
          className='w-full lg:w-60 text-sm leading-[150%] text-gray-600 justify-between border-0 border-b-2 rounded-none lg:border-b-0 text-left p-0 shadow-none hover:bg-gray-50 cursor-pointer'
        >
          {selectedCountry ? truncateText(selectedCountry.name, 27) : placeholder}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </DialogTrigger>
      <DialogContent className='p-0'>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput placeholder={`${label}`} value={search} onValueChange={setSearch} />
          <CommandList>
            {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
            {!isLoading && countries.length === 0 && <CommandEmpty>No country found.</CommandEmpty>}

            {Object.entries(grouped).map(([continent, items]) => (
              <CommandGroup key={continent} heading={CONTINENT_LABELS[continent as ClientContinent]}>
                <div className='grid grid-cols-[repeat(1,80px)] lg:grid-cols-[repeat(3,120px)] items-start justify-between mr-4'>
                  {items.map((country) => (
                    <CommandItem
                      key={country.id}
                      value={country.name}
                      onSelect={() => handleSelect(country)}
                      className='w-full'
                    >
                      <Check className={cn('mr-2 h-4 w-4', value === country.iso2 ? 'opacity-100' : 'opacity-0')} />
                      {country.name}
                    </CommandItem>
                  ))}
                </div>
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
