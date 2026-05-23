import { TDefaultData } from '@/types/default.type';
import AirConditionedIcon from '@/assets/icons/icon-airconditioned.svg';
import WifiIcon from '@/assets/icons/icon-wifi.svg';
import PoolIcon from '@/assets/icons/icon-pool.svg';
import GymIcon from '@/assets/icons/icon-gym.svg';
import KitchenIcon from '@/assets/icons/icon-kitchen.svg';
import SpaIcon from '@/assets/icons/icon-spa.svg';
import ShuttleIcon from '@/assets/icons/icon-shuttle.svg';
import WasherIcon from '@/assets/icons/icon-washer.svg';
import HotTubIcon from '@/assets/icons/icon-hottub.svg';
import OutDoorSpaceIcon from '@/assets/icons/icon-outdoorspace.svg';
import RestaurantIcon from '@/assets/icons/icon-restaurant.svg';
import PetFriendlyIcon from '@/assets/icons/icon-petfriendly.svg';
import BarIcon from '@/assets/icons/icon-bar.svg';
import GulfCourseIcon from '@/assets/icons/icon-gulfcourse.svg';
import CarChargerIcon from '@/assets/icons/icon-carcharger.svg';
import CotsIcon from '@/assets/icons/icon-cots.svg';
import OceanViewIcon from '@/assets/icons/icon-oceanview.svg';
import CasinoIcon from '@/assets/icons/icon-casino.svg';
import WaterParkIcon from '@/assets/icons/icon-waterpark.svg';
import ParkingIcon from '@/assets/icons/icon-parking.svg';

export const PopularConstantFilters: string[] = [
  'London City Centre',
  'Hotel',
  'Breakfast Included',
  'Reserve now, pay later',
  'Air conditioned',
] as const;

//export const StayOptionConstant: string[] = ['Any', 'Hotels', 'Homes'] as const;
export const StayOptionConstant = [
  {
    value: 'any',
    label: 'Any',
  },
  {
    value: 'hotels',
    label: 'Hotels',
  },
  {
    value: 'homes',
    label: 'Homes',
  },
];

// export const Neighbourhood: string[] = [
//   'London (and vicinity)',
//   'The City of London',
//   'Kensington',
//   'Soho',
//   'Covent Garden',
//   'Paddington',
//   'Kings Cross St. Pancras',
//   'Mayfair',
//   'Shoreditch',
//   'Victoria',
//   'Canary Wharf',
//   'Stratford',
//   'London (LHR-Heathrow)',
//   'Wembley',
//   'Camden Town',
//   'Greenwich',
//   'London Victoria Station',
//   'Knightsbridge',
//   'London',
// ];
export const Neighbourhood = [
  {
    value: 'london',
    label: 'London (and vicinity)',
  },
  {
    value: 'london_city',
    label: 'The City of London',
  },
  {
    value: 'kensington',
    label: 'Kensington',
  },
  {
    value: 'soho',
    label: 'Soho',
  },
  {
    value: 'covent_garden',
    label: 'Covent Garden',
  },
  {
    value: 'paddington',
    label: 'Paddington',
  },
  {
    value: 'Kings_Cross_st_Pancras',
    label: 'Kings Cross St. Pancras',
  },
  {
    value: 'mayfair',
    label: 'Mayfair',
  },
  {
    value: 'shoreditch',
    label: 'Shoreditch',
  },

  {
    value: 'victoria',
    label: 'Victoria',
  },
  {
    value: 'canary_wharf',
    label: 'Canary Wharf',
  },
  {
    value: 'stratford',
    label: 'Stratford',
  },
  {
    value: 'London_LHR_Heathrow)',
    label: 'London (LHR-Heathrow)',
  },
  {
    value: 'wembley',
    label: 'Wembley',
  },
  {
    value: 'camden_town',
    label: 'Camden Town',
  },
  {
    value: 'greenwich',
    label: 'Greenwich',
  },
  {
    value: 'london_victoria_station',
    label: 'London Victoria Station',
  },
  {
    value: 'knightsbridge',
    label: 'Knightsbridge',
  },
];
export const PaymentTypeConstant: string[] = ['Reserve now, pay later'];
export const PropertyOptionsConstant: string[] = ['Fully refundable property'];
export const PropertyTypeConstant: string[] = ['Hotel', 'Aparthotel', 'Apartment'];
export const PropertyBrandConstant: string[] = ['Imperial London Hotels', 'Montcalm', 'Holiday Inn Express Hotel'];
// export const GuestRatingConstant: string[] = ['Any', 'Wonderful 9+', 'Very good 8+', 'Good 7+'];
export const GuestRatingConstant = [
  {
    value: 'Any',
    label: 'Any',
  },
  {
    value: 'wonderful',
    label: 'Wonderful 9+',
  },
  {
    value: 'very_good',
    label: 'Very good 8+',
  },
  {
    value: 'good',
    label: 'Good 7+',
  },
];
export const AmenitiesConstant: TDefaultData[] = [
  {
    id: 1,
    label: 'Air conditioned',
    icon: AirConditionedIcon,
  },
  {
    id: 2,
    label: 'WiFi included',
    icon: WifiIcon,
  },
  {
    id: 3,
    label: 'Pool',
    icon: PoolIcon,
  },
  {
    id: 4,
    label: 'Gym',
    icon: GymIcon,
  },
  {
    id: 5,
    label: 'Kitchen',
    icon: KitchenIcon,
  },
  {
    id: 6,
    label: 'Spa',
    icon: SpaIcon,
  },
  {
    id: 7,
    label: 'Airport shuttle included',
    icon: ShuttleIcon,
  },
  {
    id: 8,
    label: 'Washer and dryer',
    icon: WasherIcon,
  },
  {
    id: 9,
    label: 'Hot tub',
    icon: HotTubIcon,
  },
  {
    id: 10,
    label: 'Outdoor space',
    icon: OutDoorSpaceIcon,
  },

  {
    id: 11,
    label: 'Restaurant',
    icon: RestaurantIcon,
  },
  {
    id: 12,
    label: 'Pet-friendly',
    icon: PetFriendlyIcon,
  },
  {
    id: 13,
    label: 'Bar',
    icon: BarIcon,
  },
  {
    id: 14,
    label: 'Gulf course',
    icon: GulfCourseIcon,
  },
  {
    id: 15,
    label: 'Electric car charging station',
    icon: CarChargerIcon,
  },
  {
    id: 16,
    label: 'Cots',
    icon: CotsIcon,
  },
  {
    id: 17,
    label: 'Ocean view',
    icon: OceanViewIcon,
  },
  {
    id: 18,
    label: 'Casino',
    icon: CasinoIcon,
  },
  {
    id: 19,
    label: 'Water park',
    icon: WaterParkIcon,
  },
  {
    id: 20,
    label: 'Parking',
    icon: ParkingIcon,
  },
];
