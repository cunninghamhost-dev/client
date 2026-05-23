'use client';
import SVGIcon from '@/components/defaults/SVGIcons';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const recommendations = [
  {
    id: 'baggage',
    label: 'Checked baggage included',
    srcImg: 'icon-bagage-normal.svg',
  },
  {
    id: 'carry_on',
    label: 'Carry-on baggage included',
    srcImg: 'icon-bagage-small.svg',
  },
  {
    id: 'baggage_colored',
    label: 'Checked baggage included',
    srcImg: 'icon-bagage-colored.svg',
  },
] as const;

const formSchema = z.object({
  recommendations: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

const RecommendedInstruction = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recommendations: ['baggage'],
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
      <Card className='w-full bg-[#edeff1] rounded-none border-0 border-t-[1px] border-t-gray-500 shadow-none px-2'>
        <CardTitle>
          <h5 className='font-bold text-[#0F294D] text-[13.89px] leading-[18px]'>Recommended</h5>
        </CardTitle>
        <CardContent className='px-2 w-full'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              <FormField
                control={form.control}
                name='recommendations'
                render={() => (
                  <FormItem>
                    {recommendations.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='recommendations'
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
                              <FormLabel className='text-[13.78px] leading-[18px] font-normal'>
                                <SVGIcon fileName={item.srcImg} alt={item.label} />
                                {item.label}
                              </FormLabel>
                            </FormItem>
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

export default RecommendedInstruction;
