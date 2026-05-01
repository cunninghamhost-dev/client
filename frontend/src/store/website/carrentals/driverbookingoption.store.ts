//import { bookingOptionFormSchema, TBookingOptionFormSchema } from '@/lib/schemas/website/carrental.shema';
import { create } from 'zustand';

interface BookingOptionState {
  bookingOption: string | null;
  showProtection: boolean;
  showBookingPayment: boolean;
  pendingSelection: string | null;
  setPendingSelection: (value: string) => void;
  setBookingOption: () => void;
  cancelBookingOption: () => void;
}

export const useBookingOptionFormStore = create<BookingOptionState>((set, get) => ({
  bookingOption: null,
  showBookingPayment: false,
  showProtection: false,
  pendingSelection: null,
  setPendingSelection: (value) => set({ pendingSelection: value }),
  setBookingOption: () => {
    const { pendingSelection } = get();
    if (pendingSelection) {
      set({
        bookingOption: pendingSelection,
        showBookingPayment: true,
        showProtection: pendingSelection === 'Damage Protection',
        pendingSelection: null,
      });
    }
  },
  cancelBookingOption: () => {
    set({
      pendingSelection: null,
      showBookingPayment: false,
      showProtection: false,
      bookingOption: null,
    });
  },
}));
