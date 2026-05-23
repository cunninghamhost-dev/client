'use client';
import React, { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisaTypeDDFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  options: string[];
  control: Control<T>;
  className?: string;
  placeholder?: string;
}

export default function VisaTypeDropDown<T extends FieldValues>({
  name,
  label,
  options,
  control,
  className,
  placeholder,
}: VisaTypeDDFieldProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
      <Controller
        name={name}
        control={control}
        defaultValue={control._defaultValues?.[name] ?? undefined}
        render={({ field }) => (
          <div className='relative w-full'>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className={cn('w-full justify-between bg-white py-6 px-4', className)}
                >
                  {field.value ? (
                    <span className='text-gray-700 text-base'>{options.find((opt) => opt === field.value)}</span>
                  ) : (
                    <span className='text-gray-400 text-sm'>{placeholder || 'Select option'}</span>
                  )}
                  <ChevronDown className='mx-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-full p-0'>
                <Command>
                  <CommandInput placeholder={`Search ${label || ''}...`} />
                  <CommandEmpty>No option found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {options.map((opt) => (
                        <CommandItem
                          key={opt}
                          value={opt}
                          onSelect={() => {
                            field.onChange(opt);
                            setOpen(false);
                          }}
                        >
                          <Check className={cn('mr-2 h-4 w-4', field.value === opt ? 'opacity-100' : 'opacity-0')} />
                          {opt}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}
      />
    </div>
  );
}
