'use client';
import React from 'react';
import SelectField from '@/components/defaults/SelectField';
import { useSortByForm } from '@/lib/hooks/default.hook';
import { TSortByFormSchema } from '@/lib/schemas/default.schema';
import { SortOrderBy as sortings } from '@/lib/constants/default-layout.constant';

const PaginationReport = () => {
  const { sortByFormHook, onSubmit } = useSortByForm();
  const { control, handleSubmit } = sortByFormHook;
  return (
    <div className='w-full flex items-start justify-between'>
      <div className='mt-6 flex-[1_1_auto] flex items-start space-x-1'>
        <span className='text-sm leading-[18px]'>302 Cars • Total includes taxes and fees</span>
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

export default PaginationReport;
