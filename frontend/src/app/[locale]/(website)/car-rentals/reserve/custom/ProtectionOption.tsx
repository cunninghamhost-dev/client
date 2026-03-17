'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  ConstCarNoProtection as noProtections,
  ConstCarProtectionExtras as extras,
  ConstDriverBookingOption as options,
} from '@/lib/constants/website/carrentals/cars-main-content.constant';
import { Badge } from '@/components/ui/badge';
import { CircleCheck, CircleDollarSign, Copy, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useBookingOptionFormStore } from '@/store/website/carrentals/driverbookingoption.store';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const ProtectionOption = () => {
  const { bookingOption, pendingSelection, setBookingOption, setPendingSelection, cancelBookingOption } =
    useBookingOptionFormStore();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSelection = (value: string) => {
    if (value === 'Damage Protection' || value === 'No Protection') {
      setPendingSelection(value);
      setDialogOpen(true);
    }
  };

  return (
    <div className='booking-content'>
      <RadioGroup
        onValueChange={handleSelection}
        value={bookingOption ?? ''}
        className='grid grid-cols-2 gap-3 w-full text-[#1A1A1A]'
      >
        <Card className='w-full rounded-sm bg-[#EFF3F7]'>
          <CardContent>
            <div className='flex flex-col gap-3 items-start w-full'>
              <Badge className='rounded-xs bg-[#148148] px-2 py-1 text-[13px] leading-[18.2px]'>Recommended</Badge>
              <div className='flex flex-col gap-3 items-start w-full'>
                <div className='flex items-center space-x-4 cursor-pointer'>
                  <Label className='font-bold text-base leading-6' htmlFor={`booking-${options[0]}`}>
                    Rental Car Damage Protection
                  </Label>
                  <RadioGroupItem
                    id={`booking-${options[0]}`}
                    value={options[0]}
                    className='border-gray-400 hover:bg-gray-100 data-[state=checked]:bg-[#c42c18] data-[state=checked]:text-white'
                  />
                </div>
                <div className='space-y-0'>
                  <h3 className='font-bold text-xl leading-7'>$13.00</h3>
                  <div className='inline-flex space-x-8'>
                    <span className='mt-1 text-xs leading-4'>per calendar day</span>
                    <Info />
                  </div>
                </div>
                <Separator orientation='horizontal' />
                <div className='space-y-4'>
                  <h5 className='text-[13px] leading-[18.2px]'>Get extra peace of mind with</h5>
                  {extras.map((extra) => (
                    <div key={extra} className='inline-flex items-center space-x-2'>
                      <div className='flex items-center justify-center w-5 h-5 rounded-full bg-green-600 border border-white'>
                        <CircleCheck size={16} className='text-white' strokeWidth={3} />
                      </div>
                      <Label className='text-xs leading-normal'>{extra}</Label>
                    </div>
                  ))}
                </div>
                <div className='mt-4 inline-flex space-x-2 text-[#009DC4] text-xs leading-[18.2px]'>
                  <h6>View plan details and disclosures </h6>
                  <Copy className='mt-0.5' size={16} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='w-full rounded-sm py-16'>
          <CardContent>
            <div className='flex flex-col gap-3 items-start w-full'>
              <div className='flex flex-col gap-3 items-start w-full'>
                <div className='block gap-1'>
                  <div className='flex items-center justify-between cursor-pointer'>
                    <Label className='font-bold text-base leading-6' htmlFor={`booking-${options[0]}`}>
                      No Protection
                    </Label>
                    <RadioGroupItem
                      id={`booking-${options[1]}`}
                      value={options[1]}
                      className='border-gray-400 hover:bg-gray-100 data-[state=checked]:bg-[#c42c18] data-[state=checked]:text-white'
                    />
                  </div>
                  <p className='max-w-[95%] mt-1 text-xs leading-4'>
                    You may be charged more for similar protection at pick-up.
                  </p>
                </div>
                <Separator className='mt-8' orientation='horizontal' />
                <div className='space-y-4'>
                  <h5 className='text-[13px] leading-[18.2px]'>You could be responsible for</h5>
                  {noProtections.map((protection) => (
                    <div key={protection} className='inline-flex items-center space-x-2'>
                      <div className='flex items-center justify-center w-5 h-5 rounded-full bg-black border border-white'>
                        <CircleDollarSign color='#e2dada' strokeWidth={1.25} />
                      </div>
                      <Label className='text-xs leading-normal'>{protection}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </RadioGroup>
      {/* Alert Dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Car Damage Protection Converage</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you{' '}
              {pendingSelection === 'Damage Protection'
                ? 'want to include Damage Protection Coverage?'
                : 'do not need a Protection Coverage?'}
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                cancelBookingOption();
                setDialogOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setBookingOption();
                setDialogOpen(false);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    // <div className='booking-content'>
    //   <Form {...bookingOptionForm}>
    //     <form onSubmit={handleSubmit(handleBookingOptionInit)}>
    //       <FormField
    //         control={control}
    //         name='booking_option'
    //         render={({ field }) => (
    //           <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='grid grid-cols-2 gap-3'>
    //             <Card>
    //               <CardContent>
    //               </CardContent>
    //             </Card>
    //           </RadioGroup>
    //         )}
    //       />
    //     </form>
    //   </Form>
    // </div>
  );
};

export default ProtectionOption;
