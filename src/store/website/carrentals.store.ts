import { TCarRentalMenuFormSchema } from '@/lib/schemas/website/carrental.schema';
import { create } from 'zustand';

interface CarRentalFormState {
  data: Partial<TCarRentalMenuFormSchema>;
  setFormData: (values: Partial<TCarRentalMenuFormSchema>) => void;
  resetForm: () => void;
}

export const useCarRentalMenuFormStore = create<CarRentalFormState>((set) => ({
  data: {},
  setFormData: (values) => set((state) => ({ data: { ...state.data, ...values } })),
  resetForm: () => set({ data: {} }),
}));
