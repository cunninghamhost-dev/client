import { TRentalsPaymentFormSchema } from '@/lib/schemas/website/carrental.schema';
import { create } from 'zustand';

interface RentalPaymentFormState {
  data: Partial<TRentalsPaymentFormSchema>;
  setFormData: (values: Partial<TRentalsPaymentFormSchema>) => void;
}

export const useRentalPaymentMenuFormStore = create<RentalPaymentFormState>((set) => ({
  data: {},
  setFormData: (values) => set((state) => ({ data: { ...state.data, ...values } })),
}));
