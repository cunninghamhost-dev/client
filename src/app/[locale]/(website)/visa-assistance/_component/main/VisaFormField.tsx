import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { TVisaMainFormSchema, visaMainFormSchema } from '@/lib/schemas/website/visa.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import VisaTypeDropDown from '../defaults/VisaTypeDropDown';
import { ConstVisaTypes as types } from '@/lib/constants/website/visa-assistance/visa.constant';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';
import { RHFCountrySelect } from '@/components/defaults/RHFCountrySelect';

const VisaFormField = () => {
  const router = useRouter();
  const visaMainForm = useForm<TVisaMainFormSchema>({
    resolver: zodResolver(visaMainFormSchema),
    defaultValues: {
      visa_type: '',
      citizen: '',
      destination: '',
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = visaMainForm;
  const handleVisaMainInit = async (data: TVisaMainFormSchema) => {
    try {
      // Optional: simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const { visa_type, citizen, destination } = data;
      const encodedVisaType = encodeURIComponent(visa_type.toLowerCase().replace(/\s+/g, '-'));
      const params = new URLSearchParams({
        citizen: citizen,
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
        <Form {...visaMainForm}>
          <form onSubmit={handleSubmit(handleVisaMainInit)}>
            <div className='w-full flex items-center h-auto divide-x divide-gray-300'>
              <VisaTypeDropDown<TVisaMainFormSchema>
                name={'visa_type'}
                control={control}
                options={types}
                placeholder='Choose your application visa type'
                className='border-none shadow-none focus-visible:border-none focus-visible:ring-ring/10 w-72.5'
              />
              <RHFCountrySelect<TVisaMainFormSchema> control={control} name={'citizen'} label='Citizen of' />
              <RHFCountrySelect<TVisaMainFormSchema> control={control} name={'destination'} label='Travelling to' />
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

export default VisaFormField;
