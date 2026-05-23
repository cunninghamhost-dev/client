import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';

interface PriceRangeFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

export default function PriceRangeField<T extends FieldValues>({
  name,
  label,
  control,
  min = 0,
  max = 1000,
  step = 1,
}: PriceRangeFieldProps<T>) {
  return (
    <div className='price-range w-full mx-auto mt-0'>
      {label && <Label className='font-normal text-sm'>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const value: number[] = field.value || [min, max];

          return (
            <div className='w-full'>
              <Slider
                min={min}
                max={max}
                step={step}
                value={value}
                onValueChange={(val) => field.onChange(val)}
                className='mt-2 w-full'
              />

              <div className='w-full flex justify-between text-sm mt-2'>
                <span>Min: ${value[0]}</span>
                <span>Max: ${value[1]}</span>
              </div>

              {fieldState.error && <p className='text-sm text-red-500 mt-1'>{fieldState.error.message}</p>}
            </div>
          );
        }}
      />
    </div>
  );
}

// const formatCurrency = (value: number) => {
//   return `$${value.toLocaleString()}`;
// };

//export default PriceRangeField;
