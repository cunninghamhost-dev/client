import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  options: RadioOption[];
  orientation?: 'vertical' | 'horizontal';
}

export default function RadioGroupField<T extends FieldValues>({
  name,
  label,
  control,
  options,
  orientation = 'vertical',
}: RadioGroupFieldProps<T>) {
  return (
    <div>
      {label ? <Label className='font-normal text-sm mb-2'>{label}</Label> : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className={`flex ${orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row flex-wrap gap-4'}`}
            >
              {options.map(({ value, label }) => (
                <div key={value} className='flex items-center space-x-2'>
                  <RadioGroupItem
                    id={`${name}-${value}`}
                    value={value}
                    className='border-gray-400 hover:bg-gray-100 data-[state=checked]:bg-[#c42c18] data-[state=checked]:text-white'
                  />
                  <Label htmlFor={`${name}-${value}`}>{label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      />
    </div>
  );
}
