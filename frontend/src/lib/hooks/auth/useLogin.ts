"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { loginUser } from "@/app/service/authentication.service";
import { getApiError } from "@/lib/utils/getApiError";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("Login successful!");
    },
    onError: (error) => {
      const errorMessage = getApiError(error);
      toast.error(errorMessage);
    },
  });
}