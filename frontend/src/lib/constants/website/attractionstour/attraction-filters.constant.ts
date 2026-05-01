import { IExpandableProps, ISelectOption2 } from '@/types/default.type';

export const ConstLocationFilters: ISelectOption2[] = [
  {
    value: 'Le Havre',
    label: 'Le Havre',
    embed: '78',
  },
  {
    value: 'Bayeux',
    label: 'Bayeux',
    embed: '51',
  },
  {
    value: 'Caen',
    label: 'Caen',
    embed: '27',
  },
  {
    value: 'Honfleur',
    label: 'Honfleur',
    embed: '22',
  },
  {
    value: 'Mery Corbon',
    label: 'Mery Corbon',
    embed: '15',
  },
  {
    value: 'Deauville',
    label: 'Deauville',
    embed: '7',
  },
];
export const ConstCategoryFilters: ISelectOption2[] = [
  {
    value: 'Tours',
    label: 'Tours',
    embed: '148',
  },
  {
    value: 'Museums, arts & culture',
    label: 'Museums, arts & culture',
    embed: '110',
  },
  {
    value: 'Services & rentals',
    label: 'Services & rentals',
    embed: '28',
  },
  {
    value: 'Nature & outdoor',
    label: 'Nature & outdoor',
    embed: '24',
  },
  {
    value: 'Entertainment & tickets',
    label: 'Entertainment & tickets',
    embed: '15',
  },
  {
    value: 'Food & drink',
    label: 'Food & drink',
    embed: '2',
  },
  {
    value: 'Workshops & classes',
    label: 'Workshops & classes',
    embed: '3',
  },
];
export const ConstShowResultFilters: ISelectOption2[] = [
  {
    value: 'Free cancellation',
    label: 'Free cancellation',
    embed: '163',
  },
];
export const ConstCategoryFilter2: IExpandableProps[] = [
  {
    label: 'Tours',
    value: 'Tours',
    count: 56,
    subs: [
      'Museums & cultural tours',
      'Bus & car tours',
      'Food & drink tours',
      'Full day tours',
      'Walking & hiking tours',
      'Bike, scooter & segway tours',
      'Half-day tours',
      'Historical buildings & monuments',
      'Outdoor tours',
    ],
  },
  {
    label: 'Museums, arts & culture',
    value: 'Museums, arts & culture',
    count: 47,
    subs: ['Cultural Museum', 'Museums & cultural tours', 'Historical building & monument', 'Historical Musium'],
  },
  {
    label: 'Services & rentals',
    value: 'Services & rentals',
    count: 20,
    subs: ['Transfers', 'Luggage storage'],
  },
  {
    label: 'Entertainment & tickets',
    value: 'Entertainment & tickets',
    count: 4,
    subs: ['Digital', 'Entertainment', 'Food & drink tours', 'Spas & wellness', 'Sports & stadiums'],
  },
  {
    label: 'Nature & outdoor',
    value: 'Nature & outdoor',
    count: 3,
    subs: ['Walking & hiking tours', 'Bike, scooter & segway tours', 'Outdoor tours'],
  },
  {
    label: 'Food & drink',
    value: 'Food & drink',
    count: 2,
    subs: ['Food & drink experiences', 'Food & drink tours'],
  },
  {
    label: 'Workshop & classes',
    value: 'Workshop & classes',
    count: 0,
    subs: [],
  },
];
