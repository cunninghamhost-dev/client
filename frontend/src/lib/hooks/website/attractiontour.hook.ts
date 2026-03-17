import { attractionFilterSchema, TAttractionFilterSchema } from '@/lib/schemas/website/attractions.schema';
import { useAttractionFilterStore } from '@/store/website/attraction/attractionprofile.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useAttractionFilter = () => {
  const { data, setFormData } = useAttractionFilterStore();

  const attractionFilterHook = useForm<TAttractionFilterSchema>({
    resolver: zodResolver(attractionFilterSchema),
    defaultValues: data,
    mode: 'onChange',
  });

  const onSubmit = (values: TAttractionFilterSchema) => {
    setFormData(values);
    console.log('Final Submit', values);
  };

  return { attractionFilterHook, onSubmit };
};
