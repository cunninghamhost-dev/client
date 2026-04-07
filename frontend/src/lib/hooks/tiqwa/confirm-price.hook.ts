// src/lib/hooks/tiqwa/confirm-price.hook.ts
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/apiClient';

/**
 * Hook to confirm the latest price and availability
 */
export const useConfirmPriceHook = () => {
  return useMutation({
    mutationFn: async (flightId: string) => {
      const { data } = await apiClient.get(`/flights/confirm/${flightId}`);
      return data;
    },
  });
};

/**
 * Maps HTTP error codes to readable content for the ConfirmPriceErrorDialog
 */
export const mapConfirmPriceError = (statusCode?: number, error?: any) => {
  const defaultError = {
    title: 'Price Verification Failed',
    description: 'The airline was unable to verify this fare. It may have just sold out.',
    actionLabel: 'Search Again',
  };

  if (statusCode === 410 || statusCode === 404) {
    return {
      title: 'Fare Expired',
      description: 'Sorry, this flight price is no longer available. Prices change frequently.',
      actionLabel: 'Refresh Search',
    };
  }

  if (statusCode === 429) {
    return {
      title: 'Too Many Requests',
      description: 'Please wait a moment before trying to confirm another flight.',
      actionLabel: 'Try Again',
    };
  }

  return defaultError;
};
