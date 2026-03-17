import InputField from '@/components/defaults/InputField';
import { Form } from '@/components/ui/form';
import { driverProfileFormSchema, TDriverProfileFormSchema } from '@/lib/schemas/website/carrental.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

const DriversProfileForm = () => {
  const driverProfileForm = useForm<TDriverProfileFormSchema>({
    resolver: zodResolver(driverProfileFormSchema),
    defaultValues: {
      full_name: '',
      country_code: '',
      phone_number: '',
    },
  });

  const { handleSubmit, control } = driverProfileForm;

  const handleDriverProfileInit = (data: TDriverProfileFormSchema) => {
    //alert('Just Testing');
    console.log(data);
    // localStorage.setItem('serviceprofile', JSON.stringify(data));
    // router.push('/car-rentals/profile');
  };
  return (
    <div className='booking-content'>
      <Form {...driverProfileForm}>
        <form onSubmit={handleSubmit(handleDriverProfileInit)}>
          <div className='mt-2 flex flex-col gap-3 items-start'>
            <InputField<TDriverProfileFormSchema>
              control={control}
              name={'full_name'}
              label={'Name'}
              important
              className='w-2/3 border-gray-700'
            />
            <InputField<TDriverProfileFormSchema>
              control={control}
              name={'country_code'}
              label={'Country/Territory Code'}
              important
              className='w-1/2 bg-gray-100 border-gray-700'
            />
            <InputField<TDriverProfileFormSchema>
              control={control}
              name={'phone_number'}
              label={'Phone Number'}
              important
              className=' w-2/3 border-gray-700'
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DriversProfileForm;
