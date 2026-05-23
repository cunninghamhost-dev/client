import { create } from 'zustand';
import { HotelMenuFormSchema } from '@/lib/schemas/website/hotel-page.schema';

interface HotelFormState {
  data: Partial<HotelMenuFormSchema>;
  setFormData: (values: Partial<HotelMenuFormSchema>) => void;
  resetForm: () => void;
}

export const useHotelMenuFormStore = create<HotelFormState>((set) => ({
  data: {},
  setFormData: (values) => set((state) => ({ data: { ...state.data, ...values } })),
  resetForm: () => set({ data: {} }),
}));
