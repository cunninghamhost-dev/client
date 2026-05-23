'use client';
import CheckboxGroupField from '@/components/defaults/CheckboxGroupField';
import {
  ConstRecommendationFilters,
  ConstTransportationTypeFilters,
} from '@/lib/constants/website/airporttransfer/airport-sidemenu.constant';
import { useAirportMenuForm } from '@/lib/hooks/website/airporttransfer.hook';
import { TAirportTransferMenuFormSchema } from '@/lib/schemas/website/airporttransfer.schema';
import React from 'react';

const AirportFilterMenu = () => {
  const { airportMenuFormHook, onSubmit } = useAirportMenuForm();
  const { control, handleSubmit } = airportMenuFormHook;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-2 flex flex-col gap-2 items-start'>
        <CheckboxGroupField<TAirportTransferMenuFormSchema>
          name='recommendation'
          control={control}
          options={ConstRecommendationFilters}
          label='Recommendation'
        />
        <CheckboxGroupField<TAirportTransferMenuFormSchema>
          name='transportation_type'
          control={control}
          options={ConstTransportationTypeFilters}
          label='Transportation Type'
        />
      </div>
    </form>
  );
};

export default AirportFilterMenu;
