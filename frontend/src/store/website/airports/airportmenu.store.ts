import { TAirportTransferMenuFormSchema } from '@/lib/schemas/website/airporttransfer.schema';
import { create } from 'zustand';

interface AirportMenuFormState {
  data: Partial<TAirportTransferMenuFormSchema>;
  setFormData: (values: Partial<TAirportTransferMenuFormSchema>) => void;
  resetForm: () => void;
}

export const useAirportMenuFormStore = create<AirportMenuFormState>((set) => ({
  data: {},
  setFormData: (values) => set((state) => ({ data: { ...state.data, ...values } })),
  resetForm: () => set({ data: {} }),
}));
