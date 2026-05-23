'use client';

import React, { useEffect, useState } from 'react';
import AlertDisplayField, { IAlertProps } from '@/components/custom/AlertDisplayField';
import { useRouter, useSearchParams } from 'next/navigation';
import { isInvalidParam } from '@/lib/helper/string-manipulator.helper';
import { signupOTPSchema, VerifyOtpPayload } from '@/lib/schemas/authentication.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useVerifyOtp } from '@/lib/hooks/auth/useVerifyOtp';
import { useResendOtp } from '@/lib/hooks/auth/useResendOtp';
import { motion } from 'framer-motion';
import OTPInputField from '@/components/custom/OTPInputField';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';

const PasscodeForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const decodedEmail = decodeURIComponent(email || '');

  const [alert, setAlert] = useState<IAlertProps>({ type: null });
  const [shake, setShake] = useState(false);
  const router = useRouter();
  const { mutate: verifyOtp, isPending } = useVerifyOtp();
  const { mutate: resendOtp } = useResendOtp();
  const [countdown, setCountdown] = useState(22);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (isInvalidParam(email) || isInvalidParam(decodedEmail)) {
      router.replace('/auth/login');
    }
  }, [email, decodedEmail, router]);

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const verifyOtpForm = useForm<VerifyOtpPayload>({
    resolver: zodResolver(signupOTPSchema),
    defaultValues: { otp: '', email: decodedEmail },
  });

  const { handleSubmit, setValue, watch, reset } = verifyOtpForm;

  const handleResendOtp = () => {
    if (!decodedEmail || !canResend) return;

    resendOtp(
      { email: decodedEmail },
      {
        onSuccess: () => {
          toast.success('OTP code resent successfully');

          setCountdown(60);
          setCanResend(false);
        },
        onError: () => {
          toast.error('Failed to resend OTP');
        },
      },
    );
  };

  const handleSubmitOtp = async (values: VerifyOtpPayload) => {
    setShake(false);
    try {
      verifyOtp(
        { email: decodedEmail, otp: values.otp },
        {
          onSuccess: () => {
            setAlert({
              type: 'success',
              title: 'OTP verification successful!',
              description: 'You are now logged in.',
            });
            setTimeout(() => {
              router.push('/dashboard');
            }, 2000);
          },
          onError: () => {
            setAlert({
              type: 'error',
              title: 'OTP verification failed!',
              description: 'Please try again.',
            });
          },
        },
      );
    } catch (error) {
      console.error('Error occurred while verifying OTP:', error);
    } finally {
      setShake(true);
      setTimeout(() => setShake(false), 2000);
      reset({ otp: '' });
      setShake(false);
    }
  };

  return (
    <motion.div className='max-w-md mx-auto mt-10' initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      <Form {...verifyOtpForm}>
        <h1 className='text-xl font-semibold mb-2 text-center'>Enter One-Time Passwordcode</h1>
        <p className='text-center text-gray-600 mb-6'>We emailed you the six digit code to {decodedEmail}</p>
        {alert.type && (
          <AlertDisplayField
            type={alert.type}
            title={alert.title || ''}
            description={alert.description}
            onClose={() => setAlert({ type: null, description: '', title: '' })}
          />
        )}
        <form
          onSubmit={handleSubmit(handleSubmitOtp)}
          className={`mt-4 w-full mx-auto space-y-4 ${shake ? 'animate-shake' : ''}`}
        >
          <OTPInputField value={watch('otp')} onChange={(val) => setValue('otp', val)} shake={shake} autoFocus />
          {verifyOtpForm.formState.errors.otp && (
            <p className='text-red-500 text-sm text-center'>{verifyOtpForm.formState.errors.otp.message}</p>
          )}
          <div className='mt-4 flex items-center justify-center text-sm'>
            <Button
              type='submit'
              disabled={isPending}
              className={`w-1/2 bg-primary-base hover:bg-primary-700 py-5 px-4 rounded-xl text-sm leading-5 cursor-pointer inline-flex items-center space-x-2 ${
                isPending ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isPending ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  <span>Verifying OTP ...</span>
                </>
              ) : (
                <span>Verify OTP</span>
              )}
            </Button>
          </div>
        </form>
        <div className='w-full flex flex-col items-center justify-center'>
          <p className='text-center text-sm text-gray-600 mt-4'>Didn&apos;t receive the code?</p>

          <Button
            variant='ghost'
            disabled={!canResend}
            className='mt-8 cursor-pointer bg-gray-800 hover:bg-gray-700 text-sm font-normal leading-5 text-white hover:text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={handleResendOtp}
          >
            {canResend ? `Resend Code` : `Resend in ${countdown}s`}
          </Button>
        </div>
      </Form>
    </motion.div>
  );
};

export default PasscodeForm;
