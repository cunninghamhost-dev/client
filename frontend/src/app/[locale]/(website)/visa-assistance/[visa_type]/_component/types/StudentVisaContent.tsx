'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarCheck, FaCalendarDays, FaPlaneArrival } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// ✅ Define validation schema
const formSchema = z.object({
  hasAdmissionLetter: z.enum(['Yes', 'No']).refine(Boolean, 'Please select Yes or No'),
  school: z.string().min(1, 'Please select a school'),
  intake: z.string().min(1, 'Please select a semester intake'),
});

const requirements: string[] = [
  'Valid passport',
  'Proof of admission to a Canadian institution',
  'Proof of funds',
  'Medical exam (if applicable)',
  'Any other document as applicable',
] as const;

const schools: string[] = [
  'Abc University',
  'Greenfield Institute of Technology',
  'Summit Valley College',
  'Northbridge University',
  'Riverside Polytechnic',
  'Starlight International University',
  'Crestview College of Arts',
  'Highland State University',
  'Evergreen Technical Institute',
  'Oceanview Business School',
] as const;

type TFormValues = z.infer<typeof formSchema>;

const StudentVisaContent = ({ visa_type }: { visa_type: string }) => {
  const [schoolSheetOpen, setSchoolSheetOpen] = useState(false);
  const [intakeSheetOpen, setIntakeSheetOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<TFormValues | null>(null);

  console.log('Student Visa Content Component: ', visa_type);

  const form = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasAdmissionLetter: undefined,
      school: '',
      intake: '',
    },
  });

  const semesterIntakes = ['January-April', 'May-August', 'September-October', 'November-December'];

  const onSubmit = (values: TFormValues) => {
    console.log('✅ Form Submitted:', values);
    setSubmittedData(values);
    alert(`You selected ${values.school} (${values.intake} intake).`);
  };

  return (
    <div className='flex flex-col gap-4 text-[#0B3947]'>
      <div className='w-full grid grid-cols-1 md:grid-cols-3 items-start gap-4'>
        <div className='col-span-2 w-full flex flex-col gap-4 items-start'>
          <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl leading-[140%]'>
            You need a visa to travel as an international student.
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
                  {/* Admission letter question */}
                  <FormField
                    control={form.control}
                    name='hasAdmissionLetter'
                    render={({ field }) => (
                      <FormItem>
                        <div className='bg-[#FFF6EC] py-4 px-2 border border-[#EFEFEF] rounded-[8px]'>
                          <h6 className='text-base leading-[155%] text-[#1E1E1E]'>
                            Do you have your admission letter?
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
                  {/* Conditional: School & Intake */}
                  <AnimatePresence>
                    {form.watch('hasAdmissionLetter') === 'Yes' && (
                      <motion.div
                        key='school-select'
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className='space-y-6'
                      >
                        {/* School Picker */}
                        <FormField
                          control={form.control}
                          name='school'
                          render={({ field }) => (
                            <FormItem>
                              <div className='bg-transparent py-4 px-2 border border-[#EFEFEF] rounded-[8px]'>
                                <h6 className='text-base leading-[155%] text-[#1E1E1E]'>
                                  Which school have you been admitted to?
                                </h6>
                              </div>
                              <FormControl>
                                <Sheet open={schoolSheetOpen} onOpenChange={setSchoolSheetOpen}>
                                  <SheetTrigger asChild>
                                    <Button
                                      variant='outline'
                                      className='w-full rounded-[8px] border-gray-300 justify-between text-gray-700'
                                    >
                                      {field.value || 'Select your school'}
                                    </Button>
                                  </SheetTrigger>
                                  <SheetContent side='bottom' className='rounded-t-xl'>
                                    <SheetHeader>
                                      <SheetTitle>Select your school</SheetTitle>
                                    </SheetHeader>
                                    <div className='mt-2 flex flex-col gap-2'>
                                      {schools.map((school) => (
                                        <Button
                                          key={school}
                                          variant='ghost'
                                          className={`justify-start text-left py-3 px-4 rounded-lg text-base cursor-pointer ${
                                            field.value === school
                                              ? 'bg-orange-200 text-[#E63A24] font-medium'
                                              : 'hover:bg-gray-200'
                                          }`}
                                          onClick={() => {
                                            field.onChange(school);
                                            setSchoolSheetOpen(false);
                                          }}
                                        >
                                          {school}
                                        </Button>
                                      ))}
                                    </div>
                                  </SheetContent>
                                </Sheet>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        {/* Semester Intake Picker */}
                        <AnimatePresence>
                          {form.watch('school') && (
                            <motion.div
                              key='intake-select'
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                            >
                              <FormField
                                control={form.control}
                                name='intake'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      <div className='bg-transparent py-4 px-2 border border-[#EFEFEF] rounded-[8px]'>
                                        <h6 className='text-base leading-[155%] text-[#1E1E1E]'>
                                          Select your semester intake
                                        </h6>
                                      </div>
                                    </FormLabel>
                                    <FormControl>
                                      <Sheet open={intakeSheetOpen} onOpenChange={setIntakeSheetOpen}>
                                        <SheetTrigger asChild>
                                          <Button
                                            variant='outline'
                                            className='w-full rounded-[8px] border-gray-300 justify-between text-gray-700'
                                          >
                                            {field.value || 'Select semester intake'}
                                          </Button>
                                        </SheetTrigger>
                                        <SheetContent side='bottom' className='rounded-t-xl pt-6'>
                                          <SheetHeader>
                                            <SheetTitle>Select semester intake</SheetTitle>
                                          </SheetHeader>
                                          <div className='mt-2 flex flex-col gap-2'>
                                            {semesterIntakes.map((intake) => (
                                              <Button
                                                key={intake}
                                                variant='ghost'
                                                className={`justify-start text-left py-3 px-4 rounded-lg text-base ${
                                                  field.value === intake
                                                    ? 'bg-orange-100 text-[#E63A24] font-medium'
                                                    : 'hover:bg-gray-100'
                                                }`}
                                                onClick={() => {
                                                  field.onChange(intake);
                                                  setIntakeSheetOpen(false);
                                                }}
                                              >
                                                {intake}
                                              </Button>
                                            ))}
                                          </div>
                                        </SheetContent>
                                      </Sheet>
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
                          <strong>Admission Letter:</strong> {submittedData.hasAdmissionLetter}
                        </p>
                        <p>
                          <strong>School:</strong> {submittedData.school}
                        </p>
                        <p>
                          <strong>Semester Intake:</strong> {submittedData.intake}
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
              <h4 className='font-bold text-lg md:text-xl leading-[150%]'>International Student Visa</h4>
            </div>
            <div className='space-y-3'>
              <div className='inline-flex space-x-1.5'>
                <div className='border bg-[#E6F5F9] p-2 rounded-[8px] flex item-center justify-center text-center'>
                  <FaCalendarDays className='mt-1.5' width={24} height={24} />
                </div>
                <div className='space-y-0'>
                  <span className='text-xs leading-[155%] text-[#426671]'>Valid for</span>
                  <p className='text-sm leading-[155%] text-[#1A1A1A]'>Length of study program + 90 days</p>
                </div>
              </div>
              <div className='inline-flex space-x-1.5'>
                <div className='border bg-[#E6F5F9] p-2 rounded-[8px] flex item-center justify-center text-center'>
                  <FaPlaneArrival className='mt-1.5' width={24} height={24} />
                </div>
                <div className='space-y-0'>
                  <span className='text-xs leading-[155%] text-[#426671]'>Number of entries</span>
                  <p className='text-sm leading-[155%] text-[#1A1A1A]'>Multiple</p>
                </div>
              </div>
              <div className='inline-flex space-x-1.5'>
                <div className='border bg-[#E6F5F9] p-2 rounded-[8px] flex item-center justify-center text-center'>
                  <FaCalendarCheck className='mt-1.5' width={24} height={24} />
                </div>
                <div className='space-y-0'>
                  <span className='text-xs leading-[155%] text-[#426671]'>Max stay</span>
                  <p className='text-sm leading-[155%] text-[#1A1A1A]'>Same as validity period</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentVisaContent;
