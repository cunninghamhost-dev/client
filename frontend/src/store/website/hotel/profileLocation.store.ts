import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IHotalLocationState {
  name: string;
  imgSrcUrl?: string;
  relatedImgUrl?: string[];
  numberOfReviews?: number;
  totalCost: number;
  unitCost: number;
  amenities?: string[];
  description?: string[];
  isFeaturedExist?: boolean;
  setHotelLocationDetails: (details: Partial<IHotalLocationState>) => void;
  reset: () => void;
}

const useHotelLocationStore = create(
  persist<IHotalLocationState>(
    (set) => ({
      name: '',
      imgSrcUrl: undefined,
      numberOfReviews: undefined,
      relatedImgUrl: undefined,
      totalCost: 1,
      unitCost: 1,
      amenities: [],
      description: [],
      isFeaturedExist: undefined,
      setHotelLocationDetails: (details) => set(details),
      reset: () =>
        set({
          name: '',
          imgSrcUrl: undefined,
          relatedImgUrl: undefined,
          numberOfReviews: undefined,
          totalCost: 1,
          unitCost: 1,
          amenities: [],
          description: [],
          isFeaturedExist: undefined,
        }),
    }),
    { name: 'hotel-location' } // Stores in localStorage
  )
);

export default useHotelLocationStore;
