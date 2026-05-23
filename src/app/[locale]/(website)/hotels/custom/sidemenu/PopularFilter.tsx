import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const popularFilters = [
  {
    id: 'london',
    label: 'London City Center',
  },
  {
    id: 'hotel',
    label: 'Hotel',
  },
  {
    id: 'breakfast_included',
    label: 'Breakfast Included',
  },
  {
    id: 'reserve',
    label: 'Reserve now, pay later',
  },
  {
    id: 'air_conditioned',
    label: 'Air conditioned',
  },
] as const;

const formSchema = z.object({
  popularFilters: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});
const PopularFilter = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      popularFilters: ['london'],
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    toast('You submitted the following values', {
      description: (
        <pre className='mt-2 w-[320px] rounded-md bg-neutral-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className='mt-0 flex flex-col gap-1 items-start'>
      <Label className='font-normal text-sm text-[#191E3B]'>Popular filters</Label>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 ml-1'>
          <FormField
            control={form.control}
            name='popularFilters'
            render={() => (
              <FormItem>
                {popularFilters.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name='popularFilters'
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id} className='flex flex-row items-center'>
                          <FormControl>
                            <Checkbox
                              className='border-gray-400 data-[state=checked]:bg-green-600 data-[state=checked]:text-white'
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(field.value?.filter((value) => value !== item.id));
                              }}
                            />
                          </FormControl>
                          <FormLabel className='text-[13.78px] leading-[18px] font-normal'>{item.label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          ></FormField>
        </form>
      </Form>
    </div>
  );
};

export default PopularFilter;
