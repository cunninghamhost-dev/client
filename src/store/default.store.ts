import { create } from 'zustand';
import { TSortByFormSchema } from '@/lib/schemas/default.schema';

interface SortByFormState {
  data: Partial<TSortByFormSchema>;
  setFormData: (values: Partial<TSortByFormSchema>) => void;
  resetForm: () => void;

  // generic setter for any field
  setField: <K extends keyof TSortByFormSchema>(field: K, value: TSortByFormSchema[K]) => void;
}

export const useSortByFormStore = create<SortByFormState>((set) => ({
  data: {},
  setFormData: (values) => set((state) => ({ data: { ...state.data, ...values } })),
  resetForm: () => set({ data: {} }),
  setField: (field, value) =>
    set((state) => ({
      data: { ...state.data, [field]: value },
    })),
}));
