'use client';
import CheckboxGroupField2 from '@/components/defaults/CheckboxGroupField2';
import CollapsibleCheckboxGroup from '@/components/defaults/CollapsibleCheckboxGroup';
import { Label } from '@/components/ui/label';
import {
  ConstCategoryFilter2 as groups,
  ConstShowResultFilters as results,
  ConstLocationFilters as locations,
} from '@/lib/constants/website/attractionstour/attraction-filters.constant';
import { useAttractionFilter } from '@/lib/hooks/website/attractiontour.hook';
import { TAttractionFilterSchema } from '@/lib/schemas/website/attractions.schema';
import React from 'react';

const AttractionMenuChecker = () => {
  const { attractionFilterHook, onSubmit } = useAttractionFilter();
  const { control, handleSubmit } = attractionFilterHook;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-3 items-start mb-12'>
        <CheckboxGroupField2<TAttractionFilterSchema>
          name={'location_filter'}
          control={control}
          options={locations}
          label='Location'
        />
        <div className='my-2.5 max-w-[90%]'>
          <Label className='font-semibold text-sm mb-2'>Categories</Label>
          {groups.map((group, index) => (
            <CollapsibleCheckboxGroup
              key={index}
              label={group.label}
              count={group.count}
              subs={group.subs}
              form={attractionFilterHook}
              initialExpanded={index === 0}
              namePrefix='categories'
            />
          ))}
        </div>
        <CheckboxGroupField2<TAttractionFilterSchema>
          name={'showresult_filter'}
          control={control}
          options={results}
          label='Show result with'
        />
      </div>
    </form>
  );
};

export default AttractionMenuChecker;
