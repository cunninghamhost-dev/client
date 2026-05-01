import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const flightSchema = z.object({
  comingFrom: z.string().min(2),
  goingTo: z.string().min(2),
  destination: z.string().min(2),
  return: z.string().min(2),
});
type FlightFormValues = z.infer<typeof flightSchema>;

const InputGroup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FlightFormValues>({
    resolver: zodResolver(flightSchema),
  });

  const onSubmit = (data: FlightFormValues) => {
    console.log(`Destination Profile recorded: ${data}`);
    // Handle the login logic here (e.g., API call to authenticate)
  };
  return (
    <div className=' box-border'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className='p-0 border-white border-0 rounded-none'>
          <CardContent className='p-0 border shadow-none flex items-start'>
            <div className=' relative flex gap-0 w-full'>
              <div className='flex flex-col gap-0'>
                <Input
                  type='text'
                  {...register('comingFrom')}
                  className={`px-4 w-full rounded-none focus-visible:ring-0 focus-visible:ring-white focus-visible:bg-white focus-visible:border-none ${
                    errors.comingFrom ? 'border-red-500' : 'border-white'
                  }`}
                  placeholder='Coming from?'
                />
              </div>
              <div className='flex flex-col gap-1'>
                <Input
                  type='text'
                  {...register('goingTo')}
                  className={`px-4 w-full rounded-none focus-visible:ring-0 focus-visible:ring-white focus-visible:bg-white focus-visible:border-none ${
                    errors.goingTo ? 'border-red-500' : 'border-white'
                  }`}
                  placeholder='Going to?'
                />
              </div>

              <div className='absolute top-3 left-[11.5rem]'>
                <FaArrowRightArrowLeft className='text-[#3D3D3D]' size={13} />
              </div>
              <div className=' absolute border-gray-300 border-1 h-4 right-0 top-2 -ml-[3px]'></div>
            </div>
            <div className='relative flex gap-0 w-full'>
              <Input
                type='text'
                {...register('destination')}
                className={`px-4 w-full rounded-none focus-visible:ring-0 focus-visible:ring-white focus-visible:bg-white focus-visible:border-none ${
                  errors.destination ? 'border-red-500' : 'border-white'
                }`}
                placeholder='Departure'
              />
              <Input
                type='text'
                {...register('return')}
                className={`px-4 w-full rounded-none focus-visible:ring-0 focus-visible:ring-white focus-visible:bg-white focus-visible:border-none ${
                  errors.return ? 'border-red-500' : 'border-white'
                }`}
                placeholder='Return'
              />
              <div className=' absolute border-gray-300 border-1 h-4 left-[12.1rem] top-2 -ml-[3px]'></div>
            </div>
            <Button
              size='sm'
              className='bg-[#E63A24] h-[2.3rem] hover:bg-red-700 text-gray-100 rounded-[4px] shadow-lg transform transition-all hover:scale-105'
              type='submit'
            >
              <Search className='w-5 h-5' />
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default InputGroup;
