import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MapPin, CalendarIcon, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

const HO2Schema = z.object({
  destination: z.string().min(2),
  checkInDate: z.date(),
  checkoutDate: z.date(),
  clientNumber: z.string().min(2),
});
type HO2FormValues = z.infer<typeof HO2Schema>;

const HotelHomes = () => {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  const form = useForm<HO2FormValues>({
    resolver: zodResolver(HO2Schema),
    defaultValues: {
      destination: '',
      checkInDate: undefined,
      checkoutDate: undefined,
      clientNumber: '',
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: HO2FormValues) => {
    localStorage.setItem('serviceprofile', JSON.stringify(data));
    router.push('/hotel&home/profile');
  };
  return (
    <div className='ho2-content'>
      <div className=' my-4 box-border'>
        <Card className='p-0 border-white border-0 rounded-none'>
          <CardContent className='p-0 border shadow-none flex items-start'>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=' relative flex gap-0 w-full'>
                  <FormField
                    control={control}
                    name='destination'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='relative w-full max-w-sm'>
                            <MapPin className='absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground' />
                            <Input
                              {...field}
                              type='text'
                              placeholder='Where are you going?'
                              className={`pl-10 w-full rounded-none focus-visible:ring-0 focus-visible:ring-white focus-visible:bg-white focus-visible:border-none`}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={control}
                    name='checkInDate'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <div className='relative'>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-[240px] justify-start text-left font-normal rounded-none',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  <CalendarIcon className='mr-2 h-4 w-4' />
                                  {field.value ? format(field.value, 'PPP') : 'Check In'}
                                  <ChevronDown className='absolute top-1 right-0 h-4 w-full' />
                                </Button>
                              </div>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto overflow-hidden p-0' align='end'>
                            {/* <Calendar
                              mode='single'
                              selected={field.value}
                              captionLayout='dropdown'
                              month={month}
                              onMonthChange={setMonth}
                              onSelect={(date) => {
                                setDate(date);
                                setValue(formatDate(date));
                                setOpen(false);
                              }}
                            /> */}
                            <Calendar mode='single' selected={field.value} onSelect={field.onChange} />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  ></FormField>
                </div>
              </form>
            </Form>

            {/* <div className='relative w-full max-w-sm'>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Calendar className='h-6 w-6 text-muted-foreground' />
                        <Button
                          variant='outline'
                          id='date'
                          className={cn(
                            'w-[240px] justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {date ? date.toLocaleDateString() : 'Select date'}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
                        <Calendar
                          mode='single'
                          {...register('checkInDate')}
                          captionLayout='dropdown'
                          onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HotelHomes;
