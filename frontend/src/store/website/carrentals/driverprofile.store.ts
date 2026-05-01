import { TDriverProfileFormSchema } from '@/lib/schemas/website/carrental.schema';
import { create } from 'zustand';

interface DriverProfileFormState {
  data: Partial<TDriverProfileFormSchema>;
  setFormData: (values: Partial<TDriverProfileFormSchema>) => void;
  resetForm: () => void;
}

export const useDriverProfileFormStore = create<DriverProfileFormState>((set) => ({
  data: {},
  setFormData: (values) => set((state) => ({ data: { ...state.data, ...values } })),
  resetForm: () => set({ data: {} }),
}));
