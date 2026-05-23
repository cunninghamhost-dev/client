import { airportTabSchema, TAirportTabSchema } from '@/lib/schemas/website/landing-page.schema';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AirportTabStore = {
  data: TAirportTabSchema;
  errors: Record<string, string> | null;
  isValid: boolean;
  setField: <K extends keyof TAirportTabSchema>(key: K, value: TAirportTabSchema[K]) => void;
  validate: () => void;
  reset: () => void;
};

// Default values — make sure they pass the schema
const defaultAirportTabData: TAirportTabSchema = {
  locations: {
    airport: '',
    hotel: '',
  },
  travellers: {
    adult: 1,
    children: 0,
    infant: 0,
    totalTravelers: 1,
  },
  flightDepartureDate: [],
  flightDepartureTime: '',
};

export const useAirportTabStore = create<AirportTabStore>()(
  persist(
    (set, get) => ({
      data: defaultAirportTabData,
      errors: null,
      isValid: true,

      setField: (key, value) => {
        set((state) => ({
          data: {
            ...state.data,
            [key]: value,
          },
        }));
        get().validate();
      },

      validate: () => {
        const result = airportTabSchema.safeParse(get().data);

        if (result.success) {
          set({ isValid: true, errors: null });
        } else {
          const formatted = result.error.flatten() as {
            fieldErrors: Record<string, string[]>;
            formErrors: string[];
          };
          const fieldErrors: Record<string, string> = {};

          for (const key in formatted.fieldErrors) {
            const err = formatted.fieldErrors[key];
            if (err && err.length > 0) {
              fieldErrors[key] = err[0];
            }
          }

          set({
            isValid: false,
            errors: fieldErrors,
          });
        }
      },

      reset: () => {
        set({
          data: defaultAirportTabData,
          errors: null,
          isValid: true,
        });
      },
    }),
    {
      name: 'airport-tab-storage', // Key in localStorage
      partialize: (state) => ({ data: state.data }), // Only persist `data`
    }
  )
);
