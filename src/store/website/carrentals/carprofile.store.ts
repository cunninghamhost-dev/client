import { IAmenityItem, ICarRentalLocation } from '@/types/website/carrentals.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ICarRentalProfileState {
  brand: string;
  model: string;
  img_src?: string;
  engine_type?: string;
  numberForSale: number;
  mileage_form?: string;
  evaluation?: string;
  main_amenitels?: IAmenityItem[];
  amenities?: string[];
  classImg?: string;
  percentage_rating: number;
  review: string;
  numbers_rated: number;
  rental_per_day: number;
  total_amount: number;
  car_location?: ICarRentalLocation[];
  setCarRentalProfileDetails: (details: Partial<ICarRentalProfileState>) => void;
  reset: () => void;
}

const useCarRentalProfileStore = create(
  persist<ICarRentalProfileState>(
    (set) => ({
      brand: '',
      model: '',
      img_src: undefined,
      engine_type: undefined,
      numberForSale: 0,
      mileage_form: undefined,
      evaluation: undefined,
      main_amenitels: undefined,
      amenities: undefined,
      classImg: undefined,
      percentage_rating: 0,
      review: '',
      numbers_rated: 0,
      rental_per_day: 0,
      total_amount: 0,
      car_location: undefined,
      setCarRentalProfileDetails: (details) => set(details),
      reset: () =>
        set({
          brand: '',
          model: '',
          img_src: undefined,
          engine_type: undefined,
          numberForSale: 0,
          mileage_form: undefined,
          evaluation: undefined,
          main_amenitels: undefined,
          amenities: undefined,
          classImg: undefined,
          percentage_rating: 0,
          review: '',
          numbers_rated: 0,
          rental_per_day: 0,
          total_amount: 0,
          car_location: undefined,
        }),
    }),
    {
      name: 'carrental-profile', // LocalStorage key where data will be stored
    } // Stores in localStorage
  )
);

export default useCarRentalProfileStore;
