import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { IControlItem } from '@/types/default.type';

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  components: IControlItem[];
}

export default function ToggleGroupField<T extends FieldValues>({
  name,
  label,
  control,
  components,
}: InputFieldProps<T>) {
  return (
    <div className='mb-4'>
      {label ? <label className='block mb-1 font-normal text-sm text-[#191E3B]'>{label}</label> : null}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          //const value: number = field.value || 0;

          return (
            <div className='w-[90%]'>
              <ToggleGroup className='gap-1 flex-wrap' type='single'>
                {components.map((item) => (
                  <ToggleGroupItem
                    key={item.value}
                    size='lg'
                    variant={'outline'}
                    className='rounded-md first:rounded-l-md last:rounded-r-md data-[state=on]:bg-[#c42c18] data-[state=on]:text-white flex-wrap'
                    {...field}
                    value={item.value.toString()}
                    aria-label={item.name}
                  >
                    {item.component}
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
