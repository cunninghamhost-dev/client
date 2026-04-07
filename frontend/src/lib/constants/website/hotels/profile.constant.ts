import { THotelHomeProfile, THotelServiceOverviewProps } from '@/types/website/hotels.type';
import { TbParking } from 'react-icons/tb';
import { MdStorefront } from 'react-icons/md';
import { TbAirConditioning } from 'react-icons/tb';
import { MdOutlinePets } from 'react-icons/md';
import { MdOutlineFreeBreakfast } from 'react-icons/md';
import { IoWifiSharp } from 'react-icons/io5';
import { MdOutlineLocationOn } from 'react-icons/md';
import { GiCommercialAirplane } from 'react-icons/gi';

export const MainHotelProfileConstant: THotelHomeProfile[] = [
  {
    id: 1,
    name: 'Hotel Saint',
    starRating: 4,
    guestRatingReview: ['Wonderful'],
    imgSrcUrl: '/images/main/home/london1_lobby.png',
    relatedImgUrl: [
      '/images/main/home/lobby_sitting.png',
      '/images/main/home/twin_room.png',
      '/images/main/home/front_property.png',
      '/images/main/home/property_view.png',
    ],
    generalRating: 7.5,
    location: 'London',
    numberOfReviews: 1448,
    numberOfRoomsLeft: 15,
    totalCost: 787,
    unitCost: 262,
    percentageDiscount: 0,
    isFeaturedExist: true,
  },
  {
    id: 2,
    name: 'One Hundred Shoreditch',
    starRating: 3,
    generalRating: 4.5,
    numberOfReviews: 1434,
    imgSrcUrl: '/images/main/home/london2_living_area.png',
    relatedImgUrl: [
      '/images/main/home/lobby_sitting.png',
      '/images/main/home/twin_room.png',
      '/images/main/home/front_property.png',
      '/images/main/home/property_view.png',
    ],
    location: 'London',
    totalCost: 1111,
    unitCost: 370,
    numberOfRoomsLeft: 5,
    percentageDiscount: 0,
    description: ['Free Cancellation', 'Reserve now, pay later'],
  },
  {
    id: 3,
    name: 'Canary Riverside Plaza Hotel',
    starRating: 5,
    percentageDiscount: 35,
    numberOfReviews: 1238,
    generalRating: 9.5,
    imgSrcUrl: '/images/main/home/london3_figure_exterior.png',
    relatedImgUrl: [
      '/images/main/home/lobby_sitting.png',
      '/images/main/home/twin_room.png',
      '/images/main/home/front_property.png',
      '/images/main/home/property_view.png',
    ],
    guestRatingReview: ['Exceptional'],
    location: 'Canary Wharf London',
    totalCost: 1111,
    unitCost: 370,
    numberOfRoomsLeft: 5,
    amenities: ['Pool', 'Hot tub', 'Kitchen'],
  },
] as const;

export const HotelServiceOverviewConstant: THotelServiceOverviewProps[] = [
  {
    hotelName: "B&B Hotel Marne-La-Vallée Val D'Europe",
    hotelAddress: 'ZAC Couternois, 11 impasse Dorothée le Maître, Serris, Seine-et-Marne, 77700',
    starRating: 3,
    notification: ['Reserve now, pay later'],
    valueRating: 9.2,
    reveiws: ['Wonderful'],
    numberOfReviews: 63,
    hotelAmenities: [
      {
        label: 'Parking available',
        icon: TbParking,
      },
      {
        label: '24/7 front desk',
        icon: MdStorefront,
      },
      {
        label: 'Air conditioning',
        icon: TbAirConditioning,
      },
      {
        label: 'Pet friendly',
        icon: MdOutlinePets,
      },
      {
        label: 'Breakfast available',
        icon: MdOutlineFreeBreakfast,
      },
      {
        label: 'Free WiFi',
        icon: IoWifiSharp,
      },
    ],
    hotelLocationBranch: [
      {
        label: "Val d'Europe",
        icon: MdOutlineLocationOn,
        description: '9 min walk',
      },
      {
        label: "Val d'Europe Shopping Center",
        icon: MdOutlineLocationOn,
        description: '2 min drive',
      },
      {
        label: 'Disneyland® Paris',
        icon: MdOutlineLocationOn,
        description: '6 min drive',
      },
      {
        label: 'Paris (CDG-Roissy-Charles deGaulle)',
        icon: GiCommercialAirplane,
        description: '32 min drive',
      },
    ],
  },
] as const;
