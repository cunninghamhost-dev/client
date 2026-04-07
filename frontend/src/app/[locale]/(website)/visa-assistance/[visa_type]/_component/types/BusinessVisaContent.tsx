'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaCalendarCheck, FaCalendarDays, FaPlaneArrival } from 'react-icons/fa6';

const requirements: string[] = [
  'Valid passport',
  'Proof of funds to cover your stay',
  'Invitation letter from a business partner (if applicable)',
  'Medical exam (if applicable)',
  'Any other document as applicable',
] as const;

const business_purposes: string[] = [
  'Attending meetings',
  'Attending a conference',
  'Business investment',
  'Others',
] as const;
const business_duration: string[] = ['Less than 6 months', 'More than 6 months'];

// ✅ Define validation schema
const formSchema = z.object({
  businessPurpose: z.enum(business_purposes).refine(Boolean, 'Please select purpose for the business'),
  hasInvitationLetter: z.enum(['Yes', 'No']).refine(Boolean, 'Please select Yes or No'),
  duration: z.enum(business_duration).refine(Boolean, 'Please select duration'),
});

type TFormValues = z.infer<typeof formSchema>;

const BusinessVisaContent = ({ visa_type }: { visa_type: string }) => {
  const [submittedData, setSubmittedData] = useState<TFormValues | null>(null);

  const form = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessPurpose: undefined,
      hasInvitationLetter: undefined,
      duration: undefined,
    },
  });

  const onSubmit = (values: TFormValues) => {
    console.log('✅ Form Submitted:', values);
    setSubmittedData(values);
    alert(`You selected ${values.businessPurpose} (${values.hasInvitationLetter} intake).`);
  };
  return (
    <div className='flex flex-col gap-4 text-[#0B3947]'>
      <div className='w-full grid grid-cols-1 md:grid-cols-3 items-start gap-4'>
        <div className='col-span-2 w-full flex flex-col gap-4 items-start'>
          <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl leading-[140%]'>
            You need a visa to travel for business.
          </h1>
          <div className='flex flex-col gap-4 py-[17px] px-5 rounded-[8px] bg-[#E6F5F9] h-auto w-full'>
            <h4 className='font-bold text-xl leading-[150%] max-w-lg'>
              To apply for an international student visa for, you will need:
            </h4>
            <ul className='list-disc list-inside space-y-1 text-sm text-gray-700'>
              {requirements.map((item) => (
                <li key={item} className='text-base leading-[155%]'>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col gap-6 w-full'>
            <div className='space-y-1'>
              <h5 className='font-bold text-lg md:text-xl lg:text-2xl leading-[150%] text-[#1A1A1A] text-center'>
                Let’s check your readiness
              </h5>
              <p className='text-base leading-[155%] text-center'>
                Answer a few quick questions so we can guide you to the next step
              </p>
            </div>
            <div className='flex flex-col gap-3'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                  {/* Business purpose */}
                  <FormField
                    control={form.control}
                    name='businessPurpose'
                    render={({ field }) => (
                      <FormItem>
                        <div className='bg-[#FFF6EC] py-4 px-2 border border-[#EFEFEF] rounded-[8px]'>
                          <h6 className='text-base leading-[155%] text-[#1E1E1E]'>
                            What’s the purpose of your business trip?
                          </h6>
                        </div>
                        <FormControl>
                          <div className='bg-transparent py-4 px-2 border border-[#D9D9D9] rounded-[8px]'>
                            <ToggleGroup
                              type='single'
                              value={field.value ?? ''}
                              onValueChange={(val) => field.onChange(val || undefined)}
                              className='w-full flex flex-col gap-0 items-start'
                            >
                              {business_purposes.map((purpose) => (
                                <ToggleGroupItem
                                  key={purpose}
                                  value={purpose}
                                  className={`flex-1 py-3 text-center w-full font-medium text-base transition rounded-[8px] cursor-pointer ${
                                    field.value === purpose
                                      ? 'data-[state=on]:bg-[#E63A24] data-[state=on]:text-white'
                                      : 'bg-transparent text-[#1E1E1E] hover:bg-orange-600 hover:text-white'
                                  }`}
                                >
                                  {purpose}
                                </ToggleGroupItem>
                              ))}
                            </ToggleGroup>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {/* Conditional: Has Invitation Letter */}
                  <AnimatePresence>
                    {form.watch('businessPurpose') && (
                      <motion.div
                        key='business-purpose'
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className='space-y-6'
                      >
                        {/* Has Invitation from business */}
                        <FormField
                          control={form.control}
                          name='hasInvitationLetter'
                          render={({ field }) => (
                            <FormItem>
                              <div className='bg-transparent py-4 px-2 border border-[#EFEFEF] rounded-[8px]'>
                                <h6 className='text-base leading-[155%] text-[#1E1E1E]'>
                                  Do you have an invitation letter from a business or organization?
                                </h6>
                              </div>
                              <FormControl>
                                <div className='bg-transparent py-4 px-2 border border-[#D9D9D9] rounded-[8px]'>
                                  <ToggleGroup
                                    type='single'
                                    value={field.value}
                                    onValueChange={(val) => field.onChange(val || 'No')}
                                    className='w-full flex flex-col gap-2 items-start'
                                  >
                                    <ToggleGroupItem
                                      value='Yes'
                                      className={`flex-1 py-3 text-center w-full font-medium text-base transition rounded-[8px] cursor-pointer ${
                                        field.value === 'Yes'
                                          ? 'data-[state=on]:bg-[#E63A24] data-[state=on]:text-white'
                                          : 'bg-transparent text-[#1E1E1E] hover:bg-orange-600 hover:text-white'
                                      }`}
                                    >
                                      Yes
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                      value='No'
                                      className={`flex-1 py-3 text-center w-full font-medium transition rounded-[8px] cursor-pointer ${
                                        field.value === 'No'
                                          ? 'data-[state=on]:bg-[#E63A24] data-[state=on]:text-white'
                                          : 'bg-transparent text-[#1E1E1E] hover:bg-orange-600 hover:text-white'
                                      }`}
                                    >
                                      No
                                    </ToggleGroupItem>
                                  </ToggleGroup>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        {/* Semester Intake Picker */}
                        <AnimatePresence>
                          {form.watch('hasInvitationLetter') === 'Yes' && (
                            <motion.div
                              key='duration'
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Has Invitation from business */}
                              <FormField
                                control={form.control}
                                name='duration'
                                render={({ field }) => (
                                  <FormItem>
                                    <div className='bg-transparent py-4 px-2 border border-[#EFEFEF] rounded-[8px]'>
                                      <h6 className='text-base leading-[155%] text-[#1E1E1E]'>
                                        How long do you plan to stay?
                                      </h6>
                                    </div>
                                    <FormControl>
                                      <div className='bg-transparent py-4 px-2 border border-[#D9D9D9] rounded-[8px]'>
                                        <ToggleGroup
                                          type='single'
                                          value={field.value ?? ''}
                                          onValueChange={(val) => field.onChange(val || undefined)}
                                          className='w-full flex flex-col gap-2 items-start'
                                        >
                                          {business_duration.map((duration) => (
                                            <ToggleGroupItem
                                              key={duration}
                                              value={duration}
                                              className={`flex-1 py-3 text-center w-full font-medium text-base transition rounded-[8px] cursor-pointer ${
                                                field.value === duration
                                                  ? 'data-[state=on]:bg-[#E63A24] data-[state=on]:text-white'
                                                  : 'bg-transparent text-[#1E1E1E] hover:bg-orange-600 hover:text-white'
                                              }`}
                                            >
                                              {duration}
                                            </ToggleGroupItem>
                                          ))}
                                        </ToggleGroup>
                                      </div>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Submit Button */}
                  <Button
                    type='submit'
                    disabled={!form.formState.isValid}
                    className={`w-full rounded-full text-white transition ${
                      form.formState.isValid
                        ? 'bg-[#E63A24] hover:bg-orange-600'
                        : 'bg-gray-300 cursor-not-allowed opacity-70'
                    }`}
                  >
                    Submit
                  </Button>
                </form>
              </Form>
              {/* Summary Card */}
              <AnimatePresence>
                {submittedData && (
                  <motion.div
                    key='summary-card'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className='mt-6 border-orange-200 shadow-md'>
                      <CardHeader>
                        <CardTitle className='text-lg text-orange-600'>Submission Summary</CardTitle>
                      </CardHeader>
                      <CardContent className='space-y-2 text-gray-700'>
                        <p>
                          <strong>Business Purpose:</strong> {submittedData.businessPurpose}
                        </p>
                        <p>
                          <strong>Does Invitaion letter exist from Organization:</strong>{' '}
                          {submittedData.hasInvitationLetter}
                        </p>
                        <p>
                          <strong>Business Duration:</strong> {submittedData.duration}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div className='flex flex-col gap-3 w-full border border-[#E0E0E0] rounded-[24px] py-4 px-3'>
            <div className='border-b border-[#E0E0E0] rounded-none pb-2'>
              <h4 className='font-bold text-lg md:text-xl leading-[150%]'>
                {visa_type.replace('-', ' ').toUpperCase()}
              </h4>
            </div>
            <div className='space-y-3'>
              <div className='inline-flex space-x-1.5'>
                <div className='border bg-[#E6F5F9] p-2 rounded-[8px] flex item-center justify-center text-center'>
                  <FaCalendarDays className='mt-2.5' width={24} height={24} />
                </div>
                <div className='space-y-0'>
                  <span className='text-xs leading-[155%] text-[#426671]'>Valid for</span>
                  <p className='text-sm leading-[155%] text-[#1A1A1A]'>Up to 10 years (linked to passport validity)</p>
                </div>
              </div>
              <div className='inline-flex space-x-1.5'>
                <div className='border bg-[#E6F5F9] p-2 rounded-[8px] flex item-center justify-center text-center'>
                  <FaPlaneArrival className='mt-2.5' width={24} height={24} />
                </div>
                <div className='space-y-0'>
                  <span className='text-xs leading-[155%] text-[#426671]'>Number of entries</span>
                  <p className='text-sm leading-[155%] text-[#1A1A1A]'>Single or multiple (depending on approval)</p>
                </div>
              </div>
              <div className='inline-flex space-x-1.5'>
                <div className='border bg-[#E6F5F9] p-2 rounded-[8px] flex item-center justify-center text-center'>
                  <FaCalendarCheck className='mt-2.5' width={24} height={24} />
                </div>
                <div className='space-y-0'>
                  <span className='text-xs leading-[155%] text-[#426671]'>Max stay</span>
                  <p className='text-sm leading-[155%] text-[#1A1A1A]'>6 months per visit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessVisaContent;
