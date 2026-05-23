import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

type TimePickerFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  interval?: number; // minute step (default: 30)
  className?: string;
};

export function TimePickerField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Pick a time',
  interval = 30,
  className,
}: TimePickerFieldProps<T>) {
  // Generate time options (HH:mm)
  const times: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += interval) {
      times.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }

  return (
    <div className='w-full lg:w-fit'>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                role='combobox'
                variant='ghost'
                className={`w-full lg:px-6 cursor-pointer border-0 border-b-2 rounded-none lg:border-b-0 justify-start text-left font-normal shadow-none bg-transparent hover:bg-transparent ${className}`}
              >
                <div className='flex flex-col gap-0'>
                  {label && <span className='text-sm lg:text-xs font-medium text-gray-500'>{label}</span>}
                  <div className='text-sm lg:px-2 py-2 h-auto'>
                    {field.value ? (
                      <span className='text-sm text-gray-700 font-semibold'>
                        {format(new Date(`1970-01-01T${field.value}:00`), 'hh:mm a')}
                      </span>
                    ) : (
                      <span className='text-xs text-gray-400 leading-normal'>{placeholder}</span>
                    )}
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[120px] max-h-[250px] overflow-y-auto p-2'>
              <div className='flex flex-col gap-1'>
                {times.map((time) => (
                  <button
                    key={time}
                    type='button'
                    className={`rounded px-2 py-1 text-left text-sm text-gray-700 hover:bg-gray-100 ${
                      field.value === time ? 'bg-blue-100 font-medium' : ''
                    }`}
                    onClick={() => field.onChange(time)}
                  >
                    {format(new Date(`1970-01-01T${time}:00`), 'hh:mm a')}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
}
