'use client';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const cabins = [
  {
    id: 1,
    label: 'Basic Economy',
    amount: 'US$8,992',
  },
  {
    id: 2,
    label: 'Economy',
    amount: 'US$8,992',
  },
  {
    id: 3,
    label: 'Premium Economy',
    amount: 'US$10,419',
  },
  {
    id: 4,
    label: 'Business',
    amount: 'US$18,419',
  },
  {
    id: 5,
    label: 'Mixed',
    amount: 'US$19,419',
  },
] as const;

const formSchema = z.object({
  cabins: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

const CabinInstruction = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cabins: [1],
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
    <div className='mt-0'>
      <Card className='w-full bg-[#edeff1]  rounded-none border-0 border-t-[1px] border-t-gray-500 shadow-none px-2'>
        <CardTitle>
          <h5 className='font-bold text-[#0F294D] text-[13.89px] leading-[18px]'>Cabins</h5>
        </CardTitle>
        <CardContent className='px-2 w-full'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='cabins'
                render={() => (
                  <FormItem>
                    {cabins.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='cabins'
                        render={({ field }) => {
                          return (
                            <div className='w-full flex items-start justify-between'>
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
                                <FormLabel className='text-[13.78px] leading-[18px] font-normal'>
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                              <h6 className='font-sans font-normal text-[#8592A6] text-sm leading-[18px]'>
                                {item.amount}
                              </h6>
                            </div>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CabinInstruction;
