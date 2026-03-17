// src/lib/hooks/tiqwa/confirm-price.hook.ts

import { TTiqwaConfirmPriceResponse } from '@/lib/schemas/server/tiqwa/response/confirm-price-response.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError, fetchJSON } from '@/lib/utils/server/response.util';
import { getErrorMessage } from '@/utils/errors';

export interface ConfirmPriceUxError {
  title: string;
  description: string;
  actionLabel?: string;
}

export interface TiqwaErrorPayload {
  code?: number;
  message?: string;
  description?: string;
}

export interface BackendErrorResponse<T = unknown> {
  message?: string;
  error?: T;
}

export function mapConfirmPriceError(status?: number, payload?: TiqwaErrorPayload | null): ConfirmPriceUxError {
  const providerMessage =
    payload?.description || payload?.message || 'An unexpected error occurred while confirming this flight.';
  switch (status) {
    case 404:
      return {
        title: 'Flight no longer available',
        description:
          'This flight may have expired or is no longer available. Please go back and select another option.',
        actionLabel: 'Choose another flight',
      };

    case 500:
    case 502:
    case 503:
      return {
        title: 'We hit a snag',
        description: providerMessage,
        actionLabel: 'Try again',
      };

    default:
      return {
        title: 'Something went wrong',
        description: 'We couldn’t confirm the flight price. Please try again or contact support if the issue persists.',
        actionLabel: 'Retry',
      };
  }
}

export const useConfirmPriceHook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (flightId: string) =>
      fetchJSON<TTiqwaConfirmPriceResponse>(`/api/tiqwa/flights/${flightId}/confirm-price`, {
        method: 'GET',
      }),
    onSuccess: (response) => {
      queryClient.setQueryData(['confirm-price', response.id], response);
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        console.error('Confirm Price failed:', {
          message: error.message,
          status: error.status,
          payload: error.payload,
        });
      } else {
        console.error('Unexpected error:', error);
      }
      console.error('Confirm Price failed:', getErrorMessage(error));
    },
  });
};
