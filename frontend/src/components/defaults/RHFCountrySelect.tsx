// components/form/location-picker-field.tsx
'use client';

import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CountrySelectField } from './server-controls/CountrySelectField';

interface IRHFCountrySelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
}

export function RHFCountrySelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: IRHFCountrySelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <CountrySelectField
            value={field.value}
            onChange={(country) => {
              field.onChange(country); // ✅ string
            }}
            placeholder={placeholder}
            label={label}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
