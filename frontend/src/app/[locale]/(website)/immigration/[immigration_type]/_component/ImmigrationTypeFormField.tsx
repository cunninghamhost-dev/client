// src/app/[locale]/(website)/immigration/[immigration_type]/_component/ImmigrationTypeFormField.tsx

import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
//import VisaTypeDropDown from '../../_component/defaults/VisaTypeDropDown';
import { ConstImmigrationTypes as types } from '@/lib/constants/website/visa-assistance/visa.constant';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';
import { immigrationMainFormSchema, TImmigrationMainForm } from '@/lib/schemas/website/immigration.schema';
import { TCountryResponse } from '@/lib/hooks/defaults/countries.hook';
import TravelTypeDropDown from '@/components/defaults/TravelTypeDropDown';
import { RHFCountrySelect } from '@/components/defaults/RHFCountrySelect';
import { buildImigrationSearchUrl } from '@/lib/types/country-search/immigration-search-url';

const ImmigrationTypeFormField = ({
  type,
  source,
  destination,
}: {
  type: string;
  source: TCountryResponse | undefined;
  destination: TCountryResponse | undefined;
}) => {
  const router = useRouter();
  const mainForm = useForm<TImmigrationMainForm>({
    resolver: zodResolver(immigrationMainFormSchema),
    defaultValues: {
      immigration_type: '',
      citizen: '',
      destination: '',
    },
  });

  useEffect(() => {
    mainForm.reset({
      immigration_type: type,
      citizen: source?.id,
      destination: destination?.id,
    });
  }, [type, source, destination, mainForm]);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = mainForm;
  const handleMainInit = async (data: TImmigrationMainForm) => {
    try {
      // Optional: simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const immigration_search_url = buildImigrationSearchUrl(data.immigration_type, data);
      router.push(immigration_search_url);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };
  return (
    <div className='booking-content'>
      <Card className='w-full p-0 shadow-lg'>
        <Form {...mainForm}>
          <form onSubmit={handleSubmit(handleMainInit)}>
            <div className='w-full flex items-center h-auto divide-x divide-gray-300'>
              <TravelTypeDropDown<TImmigrationMainForm>
                name={'immigration_type'}
                control={control}
                options={types}
                placeholder='Choose your application travel type'
                className='border-none shadow-none focus-visible:border-none focus-visible:ring-ring/10 w-72.5'
              />
              <RHFCountrySelect<TImmigrationMainForm> control={control} name={'citizen'} label='Citizen of' />
              <RHFCountrySelect<TImmigrationMainForm> control={control} name={'destination'} label='Travelling to' />
              <div className='w-full flex items-end justify-end gap-8 mx-2'>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className={`bg-[#E63A24] hover:bg-orange-700 py-5 px-4 rounded-xl text-sm leading-5 cursor-pointer inline-flex items-center space-x-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className='w-5 h-5 animate-spin' />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Search className='w-6 h-6' />
                      <span>Check Requirement</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ImmigrationTypeFormField;
