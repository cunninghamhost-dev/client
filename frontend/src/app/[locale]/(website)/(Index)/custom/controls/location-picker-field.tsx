// components/form/location-picker-field.tsx
'use client';

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { TiqwaLocationValue } from '@/types/server/tiqwa-airports.types';
import { LocationPickerField2 } from '@/components/defaults/server-controls/LocationPickerField2';

interface IRHFLocationPickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export function RHFLocationPicker<T extends FieldValues>({
  control,
  name,
  label = 'Location',
}: IRHFLocationPickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormLabel>{label}</FormLabel>

          <LocationPickerField2
            value={field.value}
            onChange={(location) => {
              console.log('RHF Location Picker', location);
              field.onChange(location);
            }}
          />

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
