import { zodResolver } from '@hookform/resolvers/zod';
import { sortByFormSchema, TSortByFormSchema } from '../schemas/default.schema';
import { useForm } from 'react-hook-form';
import { useSortByFormStore } from '@/store/default.store';

export const useSortByForm = () => {
  const { data, setFormData } = useSortByFormStore();

  const sortByFormHook = useForm<TSortByFormSchema>({
    resolver: zodResolver(sortByFormSchema),
    defaultValues: data,
    mode: 'onChange',
  });

  const onSubmit = (values: TSortByFormSchema) => {
    setFormData(values);
    console.log('Final Submit', values);
  };

  return { sortByFormHook, onSubmit };
};
