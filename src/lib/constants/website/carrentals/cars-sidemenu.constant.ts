import { IContextType } from '@/types/default.type';

export const ConstExclusiveOffersFilters: IContextType[] = [
  {
    id: 1,
    key: 'great_deal',
    title: 'Great Deal',
    description: 'Great Deal shows you the lowest priced car on our website for each category',
  },
] as const;
export const ConstCarTypeFilters: string[] = [
  'Mini',
  'Economy',
  'Compact',
  'Midsize',
  'Standard',
  'Full-size',
  'Premium',
  'Luxury',
  'SUV',
  'Van',
  'Others',
] as const;
export const ConstCapacityFilters: string[] = ['2-5 passengers', '6 or more passengers'] as const;
export const ConstElectricCarsFilters: string[] = ['Electric', 'Hybrid'] as const;
export const ConstPickupSaveTimeFilters: string[] = ['Online check-in'] as const;
export const ConstTravellerRatingsFilters: string[] = ['70% positive & up', '40% positive & up'] as const;
export const ConstPaymentOptionFilters: string[] = ['Pay now', 'Pay later'] as const;
export const ConstTotalPriceFilters: string[] = [
  'Less than $75',
  '$75 to $100',
  '$100 to $200',
  '$200 to $300',
  '$300 to $400',
  '$400 to $500',
] as const;
export const ConstRentalCarCompanyFilters: string[] = [
  'Alamo Rent A Car',
  'Avis',
  'Budget',
  'Carwiz',
  'Europcar',
  'Fox',
] as const;
export const ConstAirportPickupFilters: string[] = ['At terminal', 'Free shuttle'] as const;
export const ConstSpecificationsFilters: string[] = [
  'Automatic',
  'Manual',
  'Unlimited Mileage',
  'Limited Mileage',
  'All-wheel drive/4X4',
] as const;
