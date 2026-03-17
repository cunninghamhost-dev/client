import { IconType } from 'react-icons';

export interface IAmenityItem {
  value?: string;
  label: string;
  icon?: IconType;
  includeInfo: boolean;
}
export interface ICarRentalLocation {
  title: string;
  description?: string[];
  icon?: IconType;
}
export interface ICarDescriptionProps {
  brand: string;
  model: string;
  img_src?: string;
  engine_type?: string;
  numberForSale: number;
  mileage_form?: string;
  evaluation?: string;
  main_amenitels?: IAmenityItem[];
}

export interface ICarRatings {
  amenities?: string[];
  classImg?: string;
  percentage_rating: number;
  review: string;
  numbers_rated: number;
  percentage_status?: number;
  number_verified?: number;
}

export interface ICarCost {
  rental_per_day: number;
  total_amount: number;
}

export interface ICarProfile {
  id: number;
  description: ICarDescriptionProps;
  ratings: ICarRatings;
  cost: ICarCost;
  location?: ICarRentalLocation[];
}
