import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Edit3Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ContactDetailsSchema, TContactDetailsForm } from '@/lib/schemas/website/flight-booking.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import PhoneInput from 'react-phone-number-input';
import InputField from '@/components/defaults/InputField';

const TravellerContactDetails = () => {
  const contactForm = useForm<TContactDetailsForm>({
    resolver: zodResolver(ContactDetailsSchema),
    defaultValues: {
      email: '',
      phone_number: '',
    }, //hydrate from zustand
  });

  const { handleSubmit, control, clearErrors } = contactForm;

  const handleContactSubmit = () => {};
  return (
    <motion.div layout>
      <Card>
        <Accordion type='single' defaultValue='contact_details' collapsible>
          <AccordionItem value='contact_details'>
            <AccordionTrigger className='px-6 py-4'>
              <div className='flex items-start justify-baseline gap-3'>
                <Edit3Icon className='mt-1' size={20} color='#E17100' />
                <div className='block space-y-2'>
                  <p className='mt-0.5 font-bold text-xl leading-6 text-gray-800 bg'>
                    Traveller Information & Contact Details
                  </p>
                  <span className='font-light text-gray-500 text-sm leading-3.5'>
                    We will send you your booking confirmation to these contact details
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className='mt-2 flex items-start justify-center'>
                <Form {...contactForm}>
                  <form onSubmit={handleSubmit(handleContactSubmit)} className='flex flex-col gap-6 w-full'>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-3'>
                      <FormField
                        control={control}
                        name='phone_number'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-sm leading-[150%]'>Phone Number</FormLabel>
                            <FormControl>
                              <PhoneInput
                                defaultCountry='NG'
                                value={field.value!}
                                onChange={async (val) => {
                                  field.onChange(val);
                                  if (val) {
                                    clearErrors('phone_number');
                                  }
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className='inline mt-2'>
                        <InputField<TContactDetailsForm> name={'email'} control={control} type='email' label='Email' />
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </motion.div>
  );
};

export default TravellerContactDetails;
