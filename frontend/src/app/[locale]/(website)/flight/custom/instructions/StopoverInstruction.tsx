'use client';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

type TStopoversProfile = {
  id: number;
  airportName: string;
  stateName: string;
  initials: string;
};

const stopover: TStopoversProfile[] = [
  {
    id: 1,
    stateName: 'Lagos',
    initials: 'LOS',
    airportName: 'Murtala Muhammed Intl Airport',
  },
  {
    id: 2,
    stateName: 'Abuja',
    initials: 'ABJ',
    airportName: 'Nnamdi Azikiwe Intl Airport',
  },
  {
    id: 3,
    stateName: 'Kanu',
    initials: 'KAN',
    airportName: 'Mallam Aminu Kano Intl Airport',
  },
  {
    id: 4,
    stateName: 'Port Harcourt',
    initials: 'PHC',
    airportName: 'Port Harcourt Intl Airport',
  },
] as const;

const formSchema = z.object({
  stopover: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

const StopoverInstruction = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stopover: [1],
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
          <h5 className='font-bold text-[#0F294D] text-[13.89px] leading-[18px]'>Stopover Airports</h5>
        </CardTitle>
        <CardContent className='px-2 w-full'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='stopover'
                render={() => (
                  <FormItem>
                    {stopover.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='stopover'
                        render={({ field }) => {
                          return (
                            <div className='flex flex-col gap-0 items-start'>
                              <h6 className='font-semibold text-[#192024] text-sm leading-5 tracking-[0.42px]'>
                                {item.stateName}
                              </h6>
                              <div className='w-full flex items-start pl-2'>
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
                                    {item.airportName}
                                  </FormLabel>
                                </FormItem>
                              </div>
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

export default StopoverInstruction;
