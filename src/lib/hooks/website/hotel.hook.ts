import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hotelMenuFormSchema, HotelMenuFormSchema } from '@/lib/schemas/website/hotel-page.schema';
import { useHotelMenuFormStore } from '@/store/website/hotel.store';

export const useHotelForm = () => {
  const { data, setFormData } = useHotelMenuFormStore();

  const hotelFormHook = useForm<HotelMenuFormSchema>({
    resolver: zodResolver(hotelMenuFormSchema),
    defaultValues: data,
    mode: 'onChange',
  });

  const onSubmit = (values: HotelMenuFormSchema) => {
    setFormData(values);
    console.log('Final Submit', values);
  };

  return { hotelFormHook, onSubmit };
};
