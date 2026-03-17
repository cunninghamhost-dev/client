import * as React from 'react';
import { Calendar1 } from 'lucide-react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface DatePickerFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  placeholder?: string;
  disablePrevious?: boolean;
}

export default function DatePickerField<T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  disablePrevious = false,
}: DatePickerFieldProps<T>) {
  return (
    <div className='mb-2 w-full'>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const value: Date = (field.value as Date) || undefined;

          const handleChange = (date: Date | undefined) => {
            field.onChange(date);
          };

          return (
            <div className='w-full lg:mt-2'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='ghost'
                    className={`w-full px-6 pb-6 cursor-pointer border-0 border-b-2 rounded-none lg:border-b-0  border-gray-200 justify-start text-left font-normal shadow-none bg-transparent hover:bg-transparent ${
                      !value ? 'text-muted-foreground' : ''
                    }`}
                  >
                    <Calendar1 className='hidden lg:flex lg:mr-2 h-2 w-2' />
                    <div className='flex flex-col'>
                      <span className='text-sm lg:text-xs font-medium text-gray-500'>{label}</span>
                      <div className='text-sm lg:px-2 py-2 h-auto text-gray-600'>
                        {value ? (
                          value.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: '2-digit',
                          })
                        ) : (
                          <span className='text-xs text-gray-400 leading-normal'>{placeholder}</span>
                        )}
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={value}
                    onSelect={handleChange}
                    disabled={disablePrevious ? { before: new Date() } : false}
                  />
                </PopoverContent>
              </Popover>
            </div>
          );
        }}
      />
    </div>
  );
}
