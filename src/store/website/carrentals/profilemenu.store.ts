import { create } from 'zustand';

interface ICarRentalProfileMenuState {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const useCarRentalProfileMenuStore = create<ICarRentalProfileMenuState>((set) => ({
  activeSection: 'Overview',
  setActiveSection: (section) => set({ activeSection: section }),
}));

export default useCarRentalProfileMenuStore;
