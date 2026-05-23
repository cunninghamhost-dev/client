'use client';
import React, { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ISelectOption } from '@/types/default.type';

interface ITravelTypeDDFieldProps<T extends FieldValues> {
  name: Path<T>;
  options: ISelectOption[];
  control: Control<T>;
  className?: string;
  placeholder?: string;
}

export default function TravelTypeDropDown<T extends FieldValues>({
  name,
  options,
  control,
  className,
  placeholder,
}: ITravelTypeDDFieldProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = options.find((o) => o.value === field.value);
        console.log('Travel Type DropDown: ', selected);

        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant='outline' role='combobox' className={cn('w-full justify-between', className)}>
                {selected ? selected.label : placeholder}
                <ChevronDown className='ml-2 h-4 w-4 opacity-50' />
              </Button>
            </PopoverTrigger>

            <PopoverContent className='p-0'>
              <Command>
                <CommandInput placeholder='Search...' />
                <CommandEmpty>No option found.</CommandEmpty>

                <CommandGroup>
                  {options.map((opt) => (
                    <CommandItem
                      key={opt.value}
                      value={opt.value}
                      onSelect={() => {
                        field.onChange(opt.value);
                        setOpen(false);
                      }}
                    >
                      <Check className={cn('mr-2 h-4 w-4', field.value === opt.value ? 'opacity-100' : 'opacity-0')} />
                      {opt.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
}
