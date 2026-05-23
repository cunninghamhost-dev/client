'use client';
import InputField from '@/components/defaults/InputField';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  ConstPaymentImageLink as links,
  ConstCarPaymentExtras as extras,
} from '@/lib/constants/website/carrentals/cars-main-content.constant';
import { rentalsPaymentFormSchema, TRentalsPaymentFormSchema } from '@/lib/schemas/website/carrental.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';

const ActualPayment = () => {
  const bookingPaymentForm = useForm<TRentalsPaymentFormSchema>({
    resolver: zodResolver(rentalsPaymentFormSchema),
    defaultValues: {
      name_on_card: '',
      card_number: '',
      expiration_date: '',
      security_code: '',
      billing_zip_code: '',
    },
  });
  const { control } = bookingPaymentForm;

  // const handleDriverProfileInit = (data: TRentalsPaymentFormSchema) => {
  //   //alert('Just Testing');
  //   console.log(data);
  //   // localStorage.setItem('serviceprofile', JSON.stringify(data));
  //   // router.push('/car-rentals/profile');
  // };
  return (
    <Card className='rounded-sm shadow-none  border-[#BDBDBD] w-full p-[1px] text-[#1A1A1A]'>
      <CardContent>
        <div className='mb-4 px-[18px] pt-6 pb-[15px] block space-y-3'>
          <h4 className='font-bold text-[1.438rem] text-[#1A1A1A] leading-[30px]'>Payment</h4>
          <div className='flex items-start gap-6'>
            {extras.map((extra) => (
              <div key={extra} className='flex items-start gap-2 text-[#2F7000]'>
                <Check color='#2F7000' strokeWidth={2.25} />
                <span className='text-xs leading-[18.2px]'>{extra}</span>
              </div>
            ))}
          </div>
          <div className='flex items-start gap-6'>
            {links.map((link) => (
              <Image key={link.alt} src={link.fileName} alt={link.alt} width={30} height={16.88} />
            ))}
          </div>
          <div className='mt-4 flex flex-col gap-4 items-start'>
            <InputField<TRentalsPaymentFormSchema>
              className='w-[70%]'
              label='Name On Card'
              control={control}
              name={'name_on_card'}
              important
            />
            <InputField<TRentalsPaymentFormSchema>
              className='w-[40%]'
              label='Debit/Credit Card Number'
              control={control}
              name={'card_number'}
              important
              placeholder='0000 0000 0000 0000'
            />
            <div className='flex items-start gap-10 w-full'>
              <InputField<TRentalsPaymentFormSchema>
                className='w-[20%]'
                label='Expiration Date'
                control={control}
                name={'expiration_date'}
                important
                placeholder='MM/YY'
              />
              <InputField<TRentalsPaymentFormSchema>
                className='w-[20%]'
                label='Security Code'
                control={control}
                name={'security_code'}
                important
              />
            </div>
            <InputField<TRentalsPaymentFormSchema>
              className='w-[30%]'
              label='Billing Zip Code'
              control={control}
              name={'billing_zip_code'}
              important
            />
          </div>
          <div className='flex items-center gap-3'>
            <Checkbox id='terms' />
            <Label className='text-xs leading-[18.2px] text-[#616161]' htmlFor='terms'>
              Remember this card for future use
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActualPayment;
