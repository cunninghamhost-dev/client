import { TBookingProviderRequestForm } from '@/lib/schemas/website/flight-booking.schema';
import { apiClient } from '@/lib/api/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export type PaymentProvider = 'stripe' | 'paystack';

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
  checkoutUrl?: string;
  authorization_url?: string;
  data?: {
    url?: string;
    checkoutUrl?: string;
    authorization_url?: string;
  };
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

const toApiDate = (date?: Date) => (date ? date.toISOString().slice(0, 10) : undefined);

const buildTiqwaBookingPayload = (payload: TBookingProviderRequestForm) => {
  const registration = payload.userRegistrying;

  return {
    flightId: payload.flightId,
    flight_id: payload.flightId,
    totalAmount: payload.totalAmount,
    amount: payload.totalAmount,
    origin: payload.origin,
    destination: payload.destination,
    travelDate: toApiDate(payload.travelDate),
    travel_date: toApiDate(payload.travelDate),
    travellerCount: payload.travellerCount,
    passenger_count: payload.travellerCount,
    contact: registration.contact,
    passengers: registration.passengers.map((passenger) => ({
      ...passenger,
      first_name: passenger.firstName,
      last_name: passenger.lastName,
      type: passenger.passengerType,
      passenger_type: passenger.passengerType,
      date_of_birth: toApiDate(passenger.dateOfBirth),
      issuing_date: toApiDate(passenger.issuingDate),
      passport_expiry: toApiDate(passenger.passportExpiry),
      passport_number: passenger.passportNumber,
      nationality_country: passenger.nationalityCountry,
      issuing_country: passenger.issuingCountry,
    })),
    userRegistrying: registration,
  };
};

const getCheckoutUrl = (response: CheckoutSessionResponse) =>
  response.url ??
  response.checkoutUrl ??
  response.authorization_url ??
  response.data?.url ??
  response.data?.checkoutUrl ??
  response.data?.authorization_url;

const createCheckoutSession = async (
  payload: TBookingProviderRequestForm,
  booking: FlightBookingResponse,
  provider: PaymentProvider,
) => {
  const checkoutPayload = {
    provider,
    price: payload.totalAmount,
    amount: payload.totalAmount,
    flightId: payload.flightId,
    flight_id: payload.flightId,
    bookingReference: getBookingReference(booking),
    booking_reference: getBookingReference(booking),
    ...getCheckoutUrls(),
  };

  const endpoint = provider === 'paystack' ? '/payments/paystack/initialize' : '/payments/checkout';

  try {
    return await apiClient.post<CheckoutSessionResponse, typeof checkoutPayload>(endpoint, checkoutPayload);
  } catch (error) {
    if (provider !== 'paystack') throw error;
    return apiClient.post<CheckoutSessionResponse, typeof checkoutPayload>('/payments/checkout', checkoutPayload);
  }
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

      const paymentProvider = payload.paymentProvider ?? 'stripe';
      const bookingPayload = buildTiqwaBookingPayload(payload);

      const booking = await apiClient.post<FlightBookingResponse, ReturnType<typeof buildTiqwaBookingPayload>>(
        `/flights/book/${encodeURIComponent(payload.flightId)}`,
        bookingPayload,
      );

      const checkoutSession = await createCheckoutSession(payload, booking, paymentProvider);
      const checkoutUrl = getCheckoutUrl(checkoutSession);

      if (!checkoutUrl) {
        throw new Error(`${paymentProvider === 'paystack' ? 'Paystack' : 'Stripe'} checkout session was not created`);
      }

      return {
        booking,
        checkoutUrl,
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
