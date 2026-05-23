"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { verifyOtp } from "@/app/service/authentication.service";
import { getApiError } from "@/lib/utils/getApiError";

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast.success("OTP verification successful! You are now logged in.");
    },
    onError: (error) => {
      const errorMessage = getApiError(error);
      toast.error(errorMessage);
    },
  });
}