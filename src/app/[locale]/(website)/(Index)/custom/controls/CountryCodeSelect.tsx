import React from 'react';
import { useForm } from 'react-hook-form';
import { RHFLocationPicker } from './location-picker-field';
import { Form } from '@/components/ui/form';

const CountryCodeSelect = () => {
  const form = useForm({
    defaultValues: {
      origin: null,
      destination: null,
    },
  });
  return (
    <div className='w-full mx-auto p-6 space-y-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(console.log)} className='w-full'>
          <div className='flex flex-row items-center gap-4'>
            <RHFLocationPicker control={form.control} name='origin' label='From' />

            <RHFLocationPicker control={form.control} name='destination' label='To' />
          </div>
        </form>
      </Form>

      {/* <LocationPickerField
        value={selected.airport ? `${selected.airport.city}, ${selected.airport.country}` : undefined}
        onSelect={(cityCode, airport) => {
          setSelected({
            cityCode,
            airport,
          });
        }}
      /> */}
      {/* {selected.airport && (
        <div className='rounded-md border p-4 text-sm'>
          <p>
            <strong>City:</strong> {selected.airport.city}
          </p>
          <p>
            <strong>Country:</strong> {selected.airport.country}
          </p>
          <p>
            <strong>IATA Code:</strong> {selected.cityCode}
          </p>
          <p>
            <strong>Airport Name:</strong> {selected.airport.name}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default CountryCodeSelect;
