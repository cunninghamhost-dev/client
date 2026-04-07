import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  airportTransferMenuFormSchema,
  TAirportTransferMenuFormSchema,
} from '@/lib/schemas/website/airporttransfer.schema';
import { useAirportMenuFormStore } from '@/store/website/airports/airportmenu.store';

export const useAirportMenuForm = () => {
  const { data, setFormData } = useAirportMenuFormStore();

  const airportMenuFormHook = useForm<TAirportTransferMenuFormSchema>({
    resolver: zodResolver(airportTransferMenuFormSchema),
    defaultValues: data,
    mode: 'onChange',
  });

  const onSubmit = (values: TAirportTransferMenuFormSchema) => {
    setFormData(values);
    console.log('Final Submit', values);
  };

  return { airportMenuFormHook, onSubmit };
};
