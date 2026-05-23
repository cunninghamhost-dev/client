'use client';

import { useMutation } from '@tanstack/react-query';

import { registerUser } from '@/app/service/authentication.service';

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    // onSuccess: () => {
    //   toast.success("Registration successful! Please check your email for the OTP.");
    // },
    // onError: (error) => {
    //   const errorMessage = getApiError(error);
    //   toast.error(errorMessage);
    // },
  });
};
