import { TBookingProviderRequestForm } from '@/lib/schemas/website/flight-booking.schema';
import { fetchJSON } from '@/lib/utils/server/response.util';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

/* ----------------------------------------------
   🟠 Post Flight Booking profile
   on the Model set
---------------------------------------------- */
export const useInitiateFlightBooking = () => {
  const queryClient = useQueryClient();
  let flightbooking_id: string = '';

  return useMutation({
    mutationFn: async (payload: TBookingProviderRequestForm) => {
      flightbooking_id = payload.flightId;

      const res = await fetchJSON('/api/bookings/create', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['flight_booking_id'],
      });
      toast.success(`Contact information for "${flightbooking_id}" created successfully`);
    },
  });
};
