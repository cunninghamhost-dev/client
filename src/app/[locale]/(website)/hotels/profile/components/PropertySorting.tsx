'use client';
import React from 'react';
import SelectField from '@/components/defaults/SelectField';
import { useSortByForm } from '@/lib/hooks/default.hook';
import { TSortByFormSchema } from '@/lib/schemas/default.schema';
import { SortOrderBy as sortings } from '@/lib/constants/default-layout.constant';

const PropertySorting = ({ propertyNumbers }: { propertyNumbers: number }) => {
  const { sortByFormHook, onSubmit } = useSortByForm();
  const { control, handleSubmit } = sortByFormHook;

  return (
    <div className='w-full flex items-start justify-between'>
      <div className='flex-[1_1_auto] inline space-x-1 text-sm md:text-base leading-4'>
        <span>London:</span>
        {propertyNumbers > 1 ? (
          <span>{`${propertyNumbers} properties`}</span>
        ) : propertyNumbers === 1 ? (
          <span>{`${propertyNumbers} properties`}</span>
        ) : (
          <span>{`No property found`}</span>
        )}
      </div>
      <div className='flex gap-2 items-end justify-end'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SelectField<TSortByFormSchema>
            name={'sortOrderBy'}
            control={control}
            label='Sort by'
            placeholder='Select a preference'
            options={sortings}
          />
        </form>
      </div>
    </div>
  );
};

export default PropertySorting;
