import { TDefaultData } from '@/types/default.type';
import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import AmenityContent from '../website/hotels/AmenityContent';

interface ToggleGroup2FieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  options: TDefaultData[];
  type?: 'single' | 'multiple';
  classname?: string;
}

export default function ToggleGroup2Field<T extends FieldValues>({
  name,
  label,
  control,
  options,
  type = 'multiple',
}: ToggleGroup2FieldProps<T>) {
  return (
    <div className='mb-4'>
      {label ? <label className='font-normal text-sm'>{label}</label> : null}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          //const value = field.value ?? (type === 'multiple' ? [] : '');

          return (
            <div className='w-[95%]'>
              <ToggleGroup className='gap-1 flex-wrap w-full' type={type} onValueChange={field.onChange}>
                {options.map((item) => (
                  <ToggleGroupItem
                    key={item.id}
                    variant={'outline'}
                    size={'lg'}
                    className='px-[56px] py-4 h-24 w-full rounded-md first:rounded-l-md last:rounded-r-md data-[state=on]:bg-[#c42c18] data-[state=on]:text-white flex-wrap'
                    value={item.label}
                    aria-label={item.label}
                  >
                    <AmenityContent id={item.id} label={item.label} icon={item.icon} />
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              {fieldState.error && <p className='text-sm text-red-500 mt-1'>{fieldState.error.message}</p>}
            </div>
          );
        }}
      />
    </div>
  );
}
