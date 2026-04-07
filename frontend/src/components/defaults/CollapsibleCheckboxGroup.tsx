import React, { useState } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Checkbox } from '../ui/checkbox';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IndeterminateCheckBoxField } from './IndeterminateCheckBoxField';
import { Label } from '../ui/label';
import type { PathValue } from 'react-hook-form';

interface CollapsibleCheckboxGroupProps<T extends FieldValues> {
  label: string;
  count: number;
  subs: string[];
  form: UseFormReturn<T>;
  initialExpanded?: boolean;
  namePrefix: string;
  //namePrefix: Path<T>;
}

export default function CollapsibleCheckboxGroup<T extends FieldValues>({
  label,
  count,
  subs,
  form,
  initialExpanded = false,
  namePrefix,
}: CollapsibleCheckboxGroupProps<T>) {
  const { register, watch, setValue } = form;
  const hasSubs = subs.length > 0;
  const [expanded, setExpanded] = useState(initialExpanded);

  const fieldPath = `${namePrefix}.${label}` as Path<T>;

  const watchedValues = watch(fieldPath);
  const allChecked = hasSubs ? subs.every((sub) => watchedValues?.[sub] === true) : watchedValues === true;
  const someChecked = hasSubs ? subs.some((sub) => watchedValues?.[sub] === true) : watchedValues === true;

  const handleParentChange = (checked: boolean) => {
    if (hasSubs) {
      subs.forEach((sub) => {
        //setValue(`${fieldPath}.${sub}` as Path<T>, checked, { shouldDirty: true });
        setValue(`${fieldPath}.${sub}` as Path<T>, checked as PathValue<T, Path<T>>, { shouldDirty: true });
      });
    } else {
      setValue(fieldPath, checked as PathValue<T, Path<T>>, { shouldDirty: true });
    }
  };

  //const toggleExpanded = () => setExpanded(!expanded);
  return (
    <div className='mt-2'>
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <IndeterminateCheckBoxField
              checked={allChecked}
              indeterminate={!allChecked && someChecked}
              onCheckedChange={(checked: boolean) => handleParentChange(checked)}
              className='cursor-pointer'
            />
            <div className='inline-flex space-x-0.5'>
              <Label className='text-sm leading-5 font-normal text-[#1A1A1A]' htmlFor={`${label}`}>
                {label}
              </Label>
              <span className='text-sm leading-5 font-normal text-[#595959]'>{`(${count})`}</span>
            </div>
          </div>
          <CollapsibleTrigger asChild>
            <button className='text-muted-foreground hover:text-foreground'>
              {expanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
          </CollapsibleTrigger>
        </div>
        {hasSubs && (
          <CollapsibleContent className='mt-2 pl-6 space-y-2'>
            {subs.map((sub) => {
              const subPath = `${fieldPath}.${sub}` as Path<T>;

              return (
                <div key={sub} className='flex items-center space-x-2'>
                  <Checkbox
                    {...register(subPath)}
                    onCheckedChange={(checked) =>
                      setValue(subPath, Boolean(checked) as PathValue<T, typeof subPath>, { shouldDirty: true })
                    }
                  />
                  <span>{sub}</span>
                </div>
              );
            })}
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
}
