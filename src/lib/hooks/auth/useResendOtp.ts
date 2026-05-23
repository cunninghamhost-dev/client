"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { resendOtp } from "@/app/service/authentication.service";
import { getApiError } from "@/lib/utils/getApiError";

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtp,
    onSuccess: () => {
      toast.success("OTP resent successfully! Please check your email.");
    },
    onError: (error) => {
      const errorMessage = getApiError(error);
      toast.error(errorMessage);
    },
  });
}