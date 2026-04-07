import { TCountrySelectProps } from '@/types/default.type';
import React, { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { MapPin, X } from 'lucide-react';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';

interface ToggleGroup2FieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  locations: TCountrySelectProps[];
  control: Control<T>;
  className?: string;
}

export default function LocationDropDownField<T extends FieldValues>({
  name,
  label,
  locations,
  control,
  className,
}: ToggleGroup2FieldProps<T>) {
  const [open, setOpen] = useState<boolean>(false);

  const grouped = locations.reduce((acc: Record<string, string[]>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item.countryName);
    return acc;
  }, {});

  const continents = Object.keys(grouped);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                role='combobox'
                variant='ghost'
                className={`flex-initial flex w-full lg:w-[220px] justify-start border-0 border-b-2 rounded-none lg:border-b-0  text-left p-0 h-auto shadow-none hover:bg-gray-50 cursor-pointer ${className}`}
              >
                <div className='flex-1 flex flex-col'>
                  <div className='flex items-center gap-2 box-border cursor-pointer text-sm h-12 leading-10 rounded px-4 py-0'>
                    <MapPin className='hidden lg:flex lg:mr-2 size-5' />
                    {locations && field.value ? (
                      <div className='flex items-start justify-between gap-4 text-ellipsis bg-gray-100 px-4 w-full overflow-hidden whitespace-nowrap font-normal text-[#051a37]'>
                        {locations.find((country) => country.countryName === field.value)?.countryName}
                        <div
                          onClick={() => field.onChange('')}
                          className='mt-2 rounded-full p-1 bg-gray-300 cursor-pointer hover:bg-gray-400'
                        >
                          <X />
                        </div>
                      </div>
                    ) : (
                      <span className='font-medium text-gray-400 text-sm lg:text-xs'>{label}</span>
                    )}
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0 overflow-hidden'>
              <Command>
                <CommandInput placeholder='Select Location...' className='h-9' />
                <CommandList>
                  {continents.map((continent, index) => (
                    <CommandGroup className='px-4 py-2' key={index} heading={continent}>
                      <div className=' box-border w-full rounded-br-lg rounded-bl-lg'>
                        <div className='box-border h-full overflow-x-hidden overflow-y-auto pt-0 pb-2 px-4'>
                          <div className='grid grid-cols-[repeat(1,120px)] lg:grid-cols-[repeat(3,150px)]'>
                            {grouped[continent].map((country, index) => (
                              <CommandItem
                                key={index}
                                value={country}
                                onSelect={() => {
                                  field.onChange(country);
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
                </CommandList>
              </Command>
            </PopoverContent>
            {/* {fieldState.error && <p className='text-sm text-red-500 mt-1'>{fieldState.error.message}</p>} */}
          </Popover>
        );
      }}
    />
  );
}
