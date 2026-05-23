// store/flight-booking.store.ts
import { ConfirmPriceResponseData } from '@/lib/types/flight-booking/confirm-price.types';
import { TBookingRegistrationForm } from '@/lib/schemas/website/flight-booking.schema';
import { FlightSearchQuery } from '@/lib/types/flight-search/flight-search-url';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IFlightBookingState {
  flightId: string | null;
  confirmPriceState: ConfirmPriceResponseData | null;
  bookingRegistration: TBookingRegistrationForm | null;
  flightSearchUrl: string | null;
  flightSearchParamState: FlightSearchQuery | null;
  setConfirmPriceState: (payload: ConfirmPriceResponseData, flightId: string) => void;
  setFlightSearchParamState: (payload: FlightSearchQuery) => void;
  setFlightSearchUrl: (searchUrl: string) => void;
  setBookingRegistration: (payload: TBookingRegistrationForm) => void;
  resetFlightBooking: () => void;
}

export const useFlightBookingStore = create<IFlightBookingState>()(
  persist(
    (set) => ({
      flightId: null,
      confirmPriceState: null,
      bookingRegistration: null,
      flightSearchParamState: null,
      flightSearchUrl: null,
      setConfirmPriceState: (payload, flightId) => set({ confirmPriceState: payload, flightId }),
      setFlightSearchParamState: (payload) => set({ flightSearchParamState: payload }),
      setFlightSearchUrl: (searchUrl) => set({ flightSearchUrl: searchUrl }),
      setBookingRegistration: (payload) => set({ bookingRegistration: payload }),
      resetFlightBooking: () =>
        set({ flightId: null, confirmPriceState: null, bookingRegistration: null, flightSearchParamState: null }),
    }),
    {
      name: 'flight-booking-storage',
      version: 1,
    },
  ),
);
