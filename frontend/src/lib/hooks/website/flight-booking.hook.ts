import { TBookingProviderRequestForm } from '@/lib/schemas/website/flight-booking.schema';
import { apiClient } from '@/lib/api/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type FlightBookingResponse = {
  reference?: string;
  booking_reference?: string;
  bookingReference?: string;
  id?: string;
  data?: {
    reference?: string;
    booking_reference?: string;
    bookingReference?: string;
    id?: string;
  };
};

type CheckoutSessionResponse = {
  url?: string;
};

type FlightBookingMutationResult = {
  booking: FlightBookingResponse;
  checkoutUrl: string;
};

const getBookingReference = (booking: FlightBookingResponse) =>
  booking.reference ??
  booking.booking_reference ??
  booking.bookingReference ??
  booking.id ??
  booking.data?.reference ??
  booking.data?.booking_reference ??
  booking.data?.bookingReference ??
  booking.data?.id;

const getCheckoutUrls = () => {
  if (typeof window === 'undefined') return {};

  const origin = window.location.origin;
  const locale = window.location.pathname.split('/').filter(Boolean)[0];
  const localePrefix = locale ? `/${locale}` : '';

  return {
    successUrl: `${origin}${localePrefix}/payment-success`,
    cancelUrl: `${origin}${localePrefix}/payment-cancel`,
  };
};

/* ----------------------------------------------
   🟠 Post Flight Booking profile
   on the Model set
---------------------------------------------- */
export const useInitiateFlightBooking = () => {
  const queryClient = useQueryClient();
  let flightbooking_id: string = '';

  return useMutation<FlightBookingMutationResult, Error, TBookingProviderRequestForm>({
    mutationFn: async (payload: TBookingProviderRequestForm) => {
      flightbooking_id = payload.flightId;

      const booking = await apiClient.post<FlightBookingResponse, TBookingProviderRequestForm>(
        `/flights/book/${encodeURIComponent(payload.flightId)}`,
        payload,
      );

      const checkoutSession = await apiClient.post<
        CheckoutSessionResponse,
        {
          price: number;
          flightId: string;
          bookingReference?: string;
          successUrl?: string;
          cancelUrl?: string;
        }
      >('/payments/checkout', {
        price: payload.totalAmount,
        flightId: payload.flightId,
        bookingReference: getBookingReference(booking),
        ...getCheckoutUrls(),
      });

      if (!checkoutSession.url) {
        throw new Error('Stripe checkout session was not created');
      }

      return {
        booking,
        checkoutUrl: checkoutSession.url,
      };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['flight_booking_id'],
      });
      toast.success(`Booking "${flightbooking_id}" created. Redirecting to payment...`);
    },
  });
};
