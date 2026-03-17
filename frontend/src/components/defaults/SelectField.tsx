import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
// import { HotelSortByFormSchema } from '@/lib/schemas/website/hotel-page.schema';
// import { useSortByFormStore } from '@/store/website/hotel/sortingControl.store';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ISelectOption } from '@/types/default.type';

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: ISelectOption[];
  placeholder?: string;
}

export default function SelectField<T extends FieldValues>({
  name,
  label,
  control,
  options,
  placeholder,
}: SelectFieldProps<T>) {
  return (
    <div className='relative'>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <div className='relative w-full'>
              {/* Floating label */}
              <Label
                htmlFor={name as string}
                className={`absolute left-3 top-1 text-[10px] text-gray-600 font-medium transition-all duration-200 opacity-100`}
              >
                {label}
              </Label>
              <Select>
                <SelectTrigger
                  {...field}
                  value={field.value ?? ''}
                  id={name as string}
                  className='text-left focus-visible:border-none focus-visible:ring-ring/10 bg-white pb-4 pt-6 w-50 hover:bg-gray-50'
                >
                  <SelectValue placeholder={placeholder || label} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.error && <p className='text-sm text-red-500 mt-1'>{fieldState.error.message}</p>}
            </div>
          );
        }}
      />
    </div>
  );
}
