import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { TVisaMainFormSchema, visaMainFormSchema } from '@/lib/schemas/website/visa.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import VisaTypeDropDown from '../../_component/defaults/VisaTypeDropDown';
import { ConstVisaTypes as types } from '@/lib/constants/website/visa-assistance/visa.constant';
import LocationDropDownField from '@/components/defaults/LocationDropDownField';
import { ConstantCountries as countries } from '@/lib/constants/continental.constant';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';

const VisaTypeFormField = ({
  type,
  source,
  destination,
}: {
  type: string;
  source: string | undefined;
  destination: string | undefined;
}) => {
  const router = useRouter();
  const visaTypeMainForm = useForm<TVisaMainFormSchema>({
    resolver: zodResolver(visaMainFormSchema),
    defaultValues: {
      visa_type: type,
      citizen: source ? source : '',
      destination: destination ? destination : '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = visaTypeMainForm;
  const handleVisaMainInit = async (data: TVisaMainFormSchema) => {
    try {
      // Optional: simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const { visa_type, citizen, destination } = data;
      const encodedVisaType = encodeURIComponent(visa_type.toLowerCase().replace(/\s+/g, '-'));
      const params = new URLSearchParams({
        citizen,
        destination,
      }).toString();

      router.push(`/visa-assistance/${encodedVisaType}?${params}`);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };
  return (
    <div className='booking-content'>
      <Card className='w-full p-0 shadow-lg'>
        <Form {...visaTypeMainForm}>
          <form onSubmit={handleSubmit(handleVisaMainInit)}>
            <div className='w-full flex items-center h-auto divide-x divide-gray-300'>
              <div className='space-y-1'>
                <VisaTypeDropDown<TVisaMainFormSchema>
                  name={'visa_type'}
                  control={control}
                  options={types}
                  placeholder='Choose your application visa type'
                  className='border-none shadow-none focus-visible:border-none focus-visible:ring-ring/10 w-[290px]'
                />
                {visaTypeMainForm.formState.errors.visa_type && (
                  <p className='text-red-500 text-sm mt-1 px-2'>
                    {visaTypeMainForm.formState.errors.visa_type.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <LocationDropDownField<TVisaMainFormSchema>
                  label='Citizen of'
                  control={control}
                  name='citizen'
                  locations={countries}
                />
                {visaTypeMainForm.formState.errors.citizen && (
                  <p className='text-red-500 text-sm mt-1 px-2'>{visaTypeMainForm.formState.errors.citizen.message}</p>
                )}
              </div>

              <div className='flex items-center justify-center gap-8'>
                <div className='space-y-2'>
                  <LocationDropDownField<TVisaMainFormSchema>
                    label='Travelling to'
                    control={control}
                    name='destination'
                    locations={countries}
                  />
                  {visaTypeMainForm.formState.errors.destination && (
                    <p className='text-red-500 text-sm mt-1 px-2'>
                      {visaTypeMainForm.formState.errors.destination.message}
                    </p>
                  )}
                </div>

                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className={`bg-[#E63A24] hover:bg-orange-700 py-5 px-4 rounded-[8px] text-sm leading-5 cursor-pointer inline-flex items-center space-x-2 ${
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

export default VisaTypeFormField;
