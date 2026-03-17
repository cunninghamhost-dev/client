'use client';

import { useEffect, useMemo, useState } from 'react';
import { Command, CommandInput, CommandItem, CommandGroup } from '@/components/ui/command';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { tiqwaAddRecentSearch, tiqwaGetRecentSearches } from '@/lib/utils/server/tiqwa/recent-searches.util';
import { useDebounce } from '@/lib/hooks/context/default/usedebounce.hook';
import { tiqwaNormalizeAirports } from '@/lib/utils/server/tiqwa/normalizeAirports.utils';
import { tiqwaDetectCountry } from '@/lib/utils/server/detectCountry.util';
import { tiqwaCreateSearchIndex } from '@/lib/utils/server/tiqwa/createSearchIndex.utils';
import { useGetAirports_tiqwa } from '@/lib/hooks/tiqwa/searchAirports.hook';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TTiqwaAirportLocationValue } from '@/lib/schemas/server/tiqwa/utilities/airport-utility.schema';

interface LocationPickerProps {
  value?: TTiqwaAirportLocationValue;
  onChange: (value: TTiqwaAirportLocationValue) => void;
}

export function LocationPickerField2({ value, onChange }: LocationPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<TTiqwaAirportLocationValue[]>([]);

  const detectedCountry = tiqwaDetectCountry();
  const debouncedQuery = useDebounce(query, 400);

  const { data = [], isFetching } = useGetAirports_tiqwa(debouncedQuery);

  useEffect(() => {
    setRecent(tiqwaGetRecentSearches());
  }, []);

  const items = useMemo(() => {
    const countries = tiqwaNormalizeAirports(data);
    const index = tiqwaCreateSearchIndex(countries);

    if (!detectedCountry) return index;

    return [
      ...index.filter((i) => i.country === detectedCountry),
      ...index.filter((i) => i.country !== detectedCountry),
    ];
  }, [data, detectedCountry]);

  const grouped = useMemo(() => {
    return items.reduce<Record<string, TTiqwaAirportLocationValue[]>>((acc, item) => {
      if (!acc[item.country]) {
        acc[item.country] = [];
      }

      acc[item.country].push({
        city: item.city,
        city_code: item.city_code,
        country: item.country,
      });

      return acc;
    }, {});
  }, [items]);

  const orderedCountries = useMemo(() => {
    const keys = Object.keys(grouped);

    if (!detectedCountry || !keys.includes(detectedCountry)) {
      return keys.sort();
    }

    return [detectedCountry, ...keys.filter((k) => k !== detectedCountry).sort()];
  }, [grouped, detectedCountry]);

  //const airport_select = Object.keys(grouped);

  function handleSelect(item: TTiqwaAirportLocationValue) {
    tiqwaAddRecentSearch(item);
    setRecent(tiqwaGetRecentSearches());
    onChange(item);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          role='combobox'
          className='w-full lg:w-50 text-sm leading-[150%] text-gray-600 justify-start border-0 border-b-2 rounded-none lg:border-b-0 text-left p-0 shadow-none hover:bg-gray-50 cursor-pointer'
        >
          {value ? `${value.city} (${value.country})` : 'Select city'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a destination</DialogTitle>
        </DialogHeader>
        <Command shouldFilter={false}>
          <CommandInput placeholder='Search city or country...' value={query} onValueChange={setQuery} />
          <ScrollArea className='h-72'>
            {recent.length > 0 && !query && query!.length === 0 && (
              <CommandGroup heading='Recent'>
                {recent.map((item, _idx) => (
                  <CommandItem key={`${item.city_code}_${_idx}`} onSelect={() => handleSelect(item)}>
                    {item.city}, {item.country} ({item.city_code})
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            <CommandGroup heading='Select a location'>
              {isFetching && <CommandItem disabled>Searching…</CommandItem>}

              {!isFetching &&
                orderedCountries.map((country, _idx) => (
                  <CommandGroup key={`${country}_${_idx}`} heading={country} className='py-2'>
                    <div className='grid grid-cols-[repeat(1,80px)] lg:grid-cols-[repeat(2,220px)]'>
                      {grouped[country]
                        .sort((a, b) => a.city.localeCompare(b.city))
                        .map((item, _idx1) => (
                          <CommandItem
                            key={`${item.city_code}_${_idx1}`}
                            value={`${item.city} ${item.city_code}`}
                            onSelect={() => handleSelect(item)} // ✅ FIXED
                          >
                            <div className='space-y-0'>
                              <div className='w-full flex flex-row gap-1'>
                                <h6 className='text-sm leading-[150%] text-neutral-800'>{item.city}</h6>
                                <span className='text-muted-foreground text-xs'>({item.city_code})</span>
                              </div>
                              {/* <span className='text-neutral-400 text-[10px]'>{item.name}</span> */}
                            </div>
                          </CommandItem>
                        ))}
                    </div>
                  </CommandGroup>
                ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
