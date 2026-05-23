import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ISelectOption2 } from '@/types/default.type';

interface CheckboxGroupFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  options: ISelectOption2[];
  description?: string[];
  showMoreStatus?: boolean;
}

export default function CheckboxGroupField2<T extends FieldValues>({
  name,
  label,
  control,
  options,
  showMoreStatus = false,
}: CheckboxGroupFieldProps<T>) {
  return (
    <div className='mb-6'>
      {label ? <Label className='font-semibold text-sm mb-2'>{label}</Label> : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const currentValues: string[] = field.value || [];

          const handleToggle = (optionValue: string) => {
            if (currentValues.includes(optionValue)) {
              field.onChange(currentValues.filter((v) => v !== optionValue));
            } else {
              field.onChange([...currentValues, optionValue]);
            }
          };

          return (
            <div className='flex flex-col gap-4'>
              {options.map((opt) => (
                <div key={opt.value} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`${name}-${opt}`}
                    checked={currentValues.includes(opt.value)}
                    onCheckedChange={() => handleToggle(opt.value)}
                    className='border-gray-400 hover:bg-gray-100 data-[state=checked]:bg-[#c42c18] data-[state=checked]:text-white'
                  />
                  {opt.embed ? (
                    <div className='inline-flex space-x-0.5'>
                      <Label className='text-sm leading-5 font-normal text-[#1A1A1A]' htmlFor={`${name}-${opt.value}`}>
                        {opt.label}
                      </Label>
                      <span className='text-sm leading-5 font-normal text-[#595959]'>{`(${opt.embed})`}</span>
                    </div>
                  ) : (
                    <Label className='text-sm leading-5 font-normal text-[#1A1A1A]' htmlFor={`${name}-${opt.value}`}>
                      {opt.label}
                    </Label>
                  )}
                </div>
              ))}
            </div>
          );
        }}
      />
      {showMoreStatus && <div className='mt-4 text-[#0D5AB9] font-normal text-sm'>Show more</div>}
    </div>
  );
}
