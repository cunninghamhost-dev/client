'use client';

import { LoginPayload, loginSchema } from '@/lib/schemas/authentication.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SVGIcon from '@/components/defaults/SVGIcons';
import { useLogin } from '@/lib/hooks/auth/useLogin';
import { ApiError } from '@/lib/utils/errors/api-error.util';
import AlertDisplayField, { IAlertProps } from '@/components/custom/AlertDisplayField';

const LoginForm = () => {
  const [alert, setAlert] = useState<IAlertProps>({ type: null });

  const router = useRouter();
  const cardRef = useRef(null);

  const { mutate: loginUser, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      loginUser(data, {
        onSuccess: () => {
          // After successful email verification, redirect to the OTP page
          // window.location.href = '/dashboard';
          router.push(`/auth/passcode-verification?email=${data.email}`);
        },
      });
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('Login error:', error.message);
        setAlert({
          type: 'error',
          title: error.message || 'Something went wrong.',
          description: 'Please try again later.',
        });
      } else {
        console.error('Unexpected error:', error);
        setAlert({
          type: 'error',
          title: 'Server connection failed',
          description: 'Please try again later.',
        });
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  useEffect(() => {
    gsap.fromTo(cardRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
  }, []);
  return (
    <div className='max-w-md py-4'>
      <form ref={cardRef} onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        {alert.type && (
          <AlertDisplayField
            type={alert.type}
            title={alert.title || ''}
            description={alert.description}
            onClose={() => setAlert({ type: null, description: '', title: '' })}
          />
        )}
        {/* Email Input */}
        <div>
          <Label htmlFor='email' className='block text-sm font-medium text-[#667085] mb-2'>
            Email
          </Label>
          <Input
            id='email'
            type='email'
            placeholder='Email'
            {...register('email')}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200 placeholder:text-gray-400 transition duration-200 focus-visible:border-ring focus-visible:ring-ring/10 focus-visible:ring-[1px] ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <span className='text-red-500 text-sm mt-2'>{errors.email.message}</span>}
        </div>
        {/* Submit Button */}
        {/* Submit Button */}
        <Button
          type='submit'
          variant={'outline'}
          disabled={isPending}
          className='w-full py-3 text-[#B02D1C] border-[#B02D1C] rounded-md hover:bg-red-50 focus:ring-4 focus:ring-red-900 cursor-pointer'
        >
          {isPending ? 'Logging In...' : 'Login'}
        </Button>
      </form>
      <div className='static-options'>
        <div className='static-display'>or Login With</div>
      </div>
      <div className='login-options'>
        <div className='login-option-wrapper'>
          <Button variant={'outline'} className='w-full items-start justify-baseline cursor-pointer' asChild>
            <div className='flex items-start'>
              <SVGIcon fileName='google-socials.svg' width={20} height={16} alt='Mail' />
              <div className='w-1/2 mx-auto'>
                <span className='font-sans font-medium text-base leading-6'>Login with Google</span>
              </div>
            </div>
          </Button>
          <Button variant={'outline'} className='w-full items-start justify-baseline cursor-pointer' asChild>
            <div className='flex items-start'>
              <SVGIcon fileName='icon-apple.svg' width={20} height={16} alt='Mail' />
              <div className='w-1/2 mx-auto'>
                <span className='font-sans font-medium text-base leading-6'>Login with Apple</span>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
