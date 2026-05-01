// src/lib/hooks/tiqwa/confirm-price.hook.ts
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/apiClient';
import { ConfirmPriceResponseData } from '@/lib/types/flight-booking/confirm-price.types';

/**
 * Hook to confirm the latest price and availability
 */
// src/lib/hooks/tiqwa/confirm-price.hook.ts
export const useConfirmPriceHook = () => {
  return useMutation<ConfirmPriceResponseData, Error, string>({
    mutationFn: async (flightId: string) => {
      const response = await apiClient.get<ConfirmPriceResponseData>(
        `/flights/confirm/${flightId}`
      );

      return {
        amount: response.pricing.payable,
        outbound: response.outbound,
        pricing: response.pricing,
        outbound_stops: response.outbound_stops,
        total_duration: response.total_duration,
      };
    },
  });
};

/**
 * Maps HTTP error codes to readable content for the ConfirmPriceErrorDialog
 */
// 1. FIXED: Changed 'error: any' to '_error: unknown'
export const mapConfirmPriceError = (statusCode?: number) => {
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
