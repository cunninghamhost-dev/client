'use client';

import { useEffect, useMemo, useState } from 'react';
import { Command, CommandInput, CommandItem, CommandGroup } from '@/components/ui/command';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getRecentSearches } from '@/lib/utils/recent-searches.util';
import { useGetAirports_tiqwa } from '@/lib/hooks/tiqwa/utilities/airport-utilities.hook';
import { useDebounce } from '@/lib/hooks/context/default/usedebounce.hook';
import { tiqwaCreateSearchIndex, tiqwaNormalizeAirports } from '@/lib/utils/server/tiqwa/normalizeAirports.utils';
import { tiqwaDetectCountry } from '@/lib/utils/server/detectCountry.util';
import { TTiqwaAirportLocationValue } from '@/lib/schemas/tiqwa/flight/flight-utilities.schema';
import { tiqwaAddRecentSearch, tiqwaGetRecentSearches } from '@/lib/utils/server/tiqwa/recent-searches.utils';

interface LocationPickerProps {
  value?: TTiqwaAirportLocationValue;
  onChange: (value: TTiqwaAirportLocationValue) => void;
}

export function LocationPickerField2({ value, onChange }: LocationPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  //const [results, setResults] = useState<Airport[]>([]);
  const [recent, setRecent] = useState<TTiqwaAirportLocationValue[]>([]);

  const detectedCountry = tiqwaDetectCountry();
  const debouncedQuery = useDebounce(query, 400);
  const { data = [], isFetching } = useGetAirports_tiqwa(debouncedQuery);
  // const { debounced } = useDebounceControlFn(async (q: string) => {
  //   if (!q) return;
  //   try {
  //     //const data = await apiClient<Airport[]>('/flights/airports', { query: { keyword: q } });
  //     const data = useGetAirports_tiqwa(q)
  //     setResults(data);
  //   } catch (err: unknown) {
  //     console.error('Airport search failed', err);
  //     setResults([]);
  //   }
  // }, 400);

  useEffect(() => {
    setRecent(getRecentSearches());
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
    return items.reduce<Record<string, TTiqwaAirportLocationValue[]>>((acc, airport) => {
      if (!acc[airport.country]) acc[airport.country] = [];
      acc[airport.country].push({
        city: airport.city,
        city_code: airport.city_code,
        country: airport.country,
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
          variant='ghost'
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
          {/* <CommandInput placeholder='Search city or country...' value={query} onValueChange={(v) => { setQuery(v); debounced(v); }} /> */}
          <ScrollArea className='h-72'>
            {recent.length > 0 && !query && query.length === 0 && (
              <CommandGroup heading='Recent'>
                {recent.map((item, idx) => (
                  <CommandItem key={`${item.city_code}_${idx}`} onSelect={() => handleSelect(item)}>
                    {item.city}, {item.country} ({item.city_code})
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandGroup heading='Select a location'>
              {isFetching && <CommandItem disabled>Searching…</CommandItem>}
              {orderedCountries.map((country, idx) => (
                <CommandGroup key={`${country}_${idx}`} heading={country} className='py-2'>
                  <div className='grid grid-cols-[repeat(1,80px)] lg:grid-cols-[repeat(2,220px)]'>
                    {grouped[country]
                      .sort((a, b) => a.city.localeCompare(b.city))
                      .map((item, idx1) => (
                        <CommandItem
                          key={`${item.city_code}_${idx1}`}
                          value={`${item.city} ${item.city_code}`}
                          onSelect={() => handleSelect(item)}
                        >
                          <div className='space-y-0'>
                            <div className='w-full flex flex-row gap-1'>
                              <h6 className='text-sm leading-[150%] text-neutral-800'>{item.city}</h6>
                              <span className='text-muted-foreground text-xs'>({item.city_code})</span>
                            </div>
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
