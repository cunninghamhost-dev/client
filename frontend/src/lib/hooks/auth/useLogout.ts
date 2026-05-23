'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { logout } from '@/app/service/authentication.service';
import { getApiError } from '@/lib/utils/getApiError';

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success('Logged out successfully.');
    },
    onError: (error) => {
      const errorMessage = getApiError(error);
      toast.error(errorMessage);
    },
  });
};
