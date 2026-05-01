'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { attractionTabSchema, TAttractionTabSchema } from '@/lib/schemas/website/landing-page.schema';
import InputField from '@/components/defaults/InputField';
import MultiDatePickerField from '@/components/defaults/MultiDatePickerField';

const AttractionTabContent = () => {
  const router = useRouter();
  const attractionTabForm = useForm<TAttractionTabSchema>({
    resolver: zodResolver(attractionTabSchema),
    defaultValues: {
      destination: '',
      travelDate: [],
    },
  });
  const { handleSubmit, control } = attractionTabForm;
  const handleAttractionInit = (data: TAttractionTabSchema) => {
    localStorage.setItem('attractionprofile', JSON.stringify(data));
    router.push('/attraction-tours/profile');
  };
  return (
    <div className='booking-content'>
      <Card className='w-full p-0 border-none rounded-none shadow-none lg:border lg:rounded-[8px] lg:shadow-lg'>
        <Form {...attractionTabForm}>
          <form onSubmit={handleSubmit(handleAttractionInit)}>
            <div className='flex flex-col items-start lg:flex-row lg:items-center gap-6 lg:h-24 lg:divide-x lg:divide-gray-300 w-full'>
              <div className='w-full relative flex items-start'>
                <Search className='absolute left-3 top-2 w-[18px] h-[18px] text-[#1E1E1E]' />
                <InputField<TAttractionTabSchema>
                  control={control}
                  name='destination'
                  placeholder='Choose your destination'
                  className='pl-10 border-none rounded-none selection:bg-transparent shadow-none focus-visible:border-none focus-visible:ring-transparent'
                />
              </div>

              <MultiDatePickerField<TAttractionTabSchema>
                label='Dates'
                control={control}
                name='travelDate'
                placeholder='Choose traveling date'
              />
              <Button
                size='sm'
                className='mx-4 bg-[#E63A24] h-[2.3rem] hover:bg-red-700 text-gray-100 rounded-[4px] shadow-lg transform transition-all hover:scale-105 w-[80%] lg:w-fit'
                type='submit'
              >
                <Search className='w-5 h-5' />
                <span className='block lg:hidden'>Search</span>
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AttractionTabContent;
