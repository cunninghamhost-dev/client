import { TAttractionFilterSchema } from '@/lib/schemas/website/attractions.schema';
import { create } from 'zustand';

interface IAttractionFilterState {
  data: Partial<TAttractionFilterSchema>;
  setFormData: (values: Partial<TAttractionFilterSchema>) => void;
  resetForm: () => void;
}

export const useAttractionFilterStore = create<IAttractionFilterState>((set) => ({
  data: {},
  setFormData: (values) => set((state) => ({ data: { ...state.data, ...values } })),
  resetForm: () => set({ data: {} }),
}));
