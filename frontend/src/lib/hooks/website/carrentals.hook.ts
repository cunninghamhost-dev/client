import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  carRentalMenuFormSchema,
  driverProfileFormSchema,
  TCarRentalMenuFormSchema,
  TDriverProfileFormSchema,
} from '@/lib/schemas/website/carrental.schema';
import { useCarRentalMenuFormStore } from '@/store/website/carrentals.store';
import { useDriverProfileFormStore } from '@/store/website/carrentals/driverprofile.store';

export const useCarRentalForm = () => {
  const { data, setFormData } = useCarRentalMenuFormStore();

  const carRentalFormHook = useForm<TCarRentalMenuFormSchema>({
    resolver: zodResolver(carRentalMenuFormSchema),
    defaultValues: data,
    mode: 'onChange',
  });

  const onSubmit = (values: TCarRentalMenuFormSchema) => {
    setFormData(values);
    console.log('Final Submit', values);
  };

  return { carRentalFormHook, onSubmit };
};

export const useDriverProfileForm = () => {
  const { data, setFormData } = useDriverProfileFormStore();

  const driverProfileFormHook = useForm<TDriverProfileFormSchema>({
    resolver: zodResolver(driverProfileFormSchema),
    defaultValues: data,
    mode: 'onChange',
  });

  const onSubmit = (values: TDriverProfileFormSchema) => {
    setFormData(values);
    console.log('Final Submit', values);
  };

  return { driverProfileFormHook, onSubmit };
};
