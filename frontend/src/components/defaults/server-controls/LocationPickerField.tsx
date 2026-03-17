'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Command, CommandInput, CommandItem, CommandGroup, CommandList, CommandEmpty } from '@/components/ui/command';
//import { tiqwaDetectCountry } from '@/lib/utils/server/detectCountry.util';
import { tiqwaAddRecentSearch, tiqwaGetRecentSearches } from '@/lib/utils/server/tiqwa/recent-searches.util';
import {
  TTiqwaAirportListResponse,
  TTiqwaAirportUtility,
} from '@/lib/schemas/server/tiqwa/utilities/airport-utility.schema';
import { useDebounceControlFn } from '@/lib/hooks/context/useDebounceControl.hook';
import { searchAirportService } from '@/app/service/domain/utilities/airport.service';
import { Button } from '@/components/ui/button';

interface ILocationPickerProps {
  //airports: TTiqwaAirportListResponse;
  value?: string;
  onSelect: (cityCode: string, airport: TTiqwaAirportUtility) => void;
}

export function LocationPickerField({ value, onSelect }: ILocationPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TTiqwaAirportListResponse>([]);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<TTiqwaAirportListResponse>([]);

  //const detectedCountry = tiqwaDetectCountry();

  const { debounced } = useDebounceControlFn(async (q: string) => {
    try {
      setLoading(true);
      const data = await searchAirportService(q);

      //const filtered = detectedCountry ? data.sort((a, b) => (a.country === detectedCountry ? -1 : 1)) : data;
      console.log('UI Fetch Caller:', data);

      setResults(data);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    setRecent(tiqwaGetRecentSearches());
  }, []);

  // const items = useMemo(() => {
  //   const countries = tiqwaNormalizeAirports(airports);
  //   const index = tiqwaCreateSearchIndex(countries);

  //   if (!detectedCountry) return index;

  //   return [
  //     ...index.filter((i) => i.country === detectedCountry),
  //     ...index.filter((i) => i.country !== detectedCountry),
  //   ];
  // }, [airports, detectedCountry]);

  function handleSelect(airport: TTiqwaAirportUtility) {
    tiqwaAddRecentSearch(airport);
    setRecent(tiqwaGetRecentSearches());
    if (airport.city_code) {
      onSelect(airport.city_code, airport);
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>{value ?? 'Select city'}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a destination</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput
            placeholder='Search city or country...'
            value={query}
            onValueChange={(v) => {
              setQuery(v);
              debounced(v);
            }}
          />
          <CommandList>
            {recent.length > 0 && (
              <CommandGroup heading='Recent'>
                {recent.map((airport) => (
                  <CommandItem key={airport.iata_code} onSelect={() => handleSelect(airport)}>
                    {airport.city}, {airport.country} ({airport.city_code})
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandGroup heading='Results'>
              {loading && <CommandItem disabled>Searching…</CommandItem>}

              {!loading && results.length === 0 && <CommandEmpty>No results found</CommandEmpty>}
              {results.map((airport) => (
                <CommandItem key={airport.iata_code} onSelect={() => handleSelect(airport)}>
                  {airport.city}, {airport.country} ({airport.city_code})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
    // <Command>
    //   <CommandInput placeholder='Search city or country...' value={query} onValueChange={setQuery} />
    //   {recent.length > 0 && query.length === 0 && (
    //     <CommandGroup heading='Recent'>
    //       {recent.map((item) => (
    //         <CommandItem key={item.city_code} onSelect={() => handleSelect(item)}>
    //           {item.city}, {item.country} ({item.city_code})
    //         </CommandItem>
    //       ))}
    //     </CommandGroup>
    //   )}
    //   <CommandGroup heading='Locations'>
    //     {loading && <CommandItem disabled>Searching…</CommandItem>}

    //     {!loading &&
    //       items.map((item) => (
    //         <CommandItem
    //           key={item.city_code}
    //           value={`${item.city} ${item.country}`}
    //           onSelect={() =>
    //             handleSelect({
    //               city: item.city,
    //               city_code: item.city_code,
    //               country: item.country,
    //             })
    //           }
    //         >
    //           {item.label}
    //         </CommandItem>
    //       ))}
    //   </CommandGroup>
    // </Command>
  );
}
