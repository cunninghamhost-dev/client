'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const airlines = [
  {
    id: 'air_canada',
    label: 'Air Canada',
    amount: 'US$8,992',
    srcImg: '/images/main/airlines/air_canada.png',
  },
  {
    id: 'united_airlines',
    label: 'United Airlines',
    amount: 'US$8,992',
    srcImg: '/images/main/airlines/united_airline.png',
  },
  {
    id: 'british_airways',
    label: 'British Airways',
    amount: 'US$10,419',
    srcImg: '/images/main/airlines/british_airways.png',
  },
  {
    id: 'lufthansa',
    label: 'Lufthansa',
    amount: 'US$10,419',
    srcImg: '/images/main/airlines/lufthansa.png',
  },
] as const;

const formSchema = z.object({
  airlines: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

const AirlineInstruction = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      airlines: [],
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
          <h5 className='font-bold text-[#0F294D] text-[13.89px] leading-[18px]'>Airlines</h5>
          <div className='flex space-x-4 font-sans font-semibold text-sm leading-5'>
            <Button variant={'link'} className='text-[#5A6872] p-0'>
              Select all
            </Button>
            <Separator orientation='vertical' />
            <Button variant={'link'} className='text-[#007799] '>
              Clear all
            </Button>
          </div>
        </CardTitle>
        <CardContent className='px-2 w-full'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='airlines'
                render={() => (
                  <FormItem>
                    {airlines.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='airlines'
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
                                  <Image
                                    src={item.srcImg}
                                    alt={item.label}
                                    width={18}
                                    height={18}
                                    quality={85}
                                    priority
                                  />
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
        <CardFooter className='items-start px-0 [.border-t]:pt-2'>
          <Button variant={'link'} className='font-sans font-semibold text-[#007799] text-sm leading-5'>
            Show 22 more airlines
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AirlineInstruction;
