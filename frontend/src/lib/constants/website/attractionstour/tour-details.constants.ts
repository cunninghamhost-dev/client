import {
  IFAQ,
  IRating,
  ITestimonial,
  ITourGalleryProps,
  ITourPhoto,
  ITourReviews,
} from '@/types/website/attractions.type';

const tour_reviews: ITourReviews[] = [
  {
    id: 1,
    author: 'Reinhild K.',
    text: 'Tour was awesome. Appreciated the insight and historical information from guides. Beautiful.',
  },
  {
    id: 2,
    author: 'Kenedy B.',
    text: 'Tour was awesome. Appreciated the insight and historical information from guides. Beautiful.',
  },
  {
    id: 3,
    author: 'Salami A.',
    text: 'Tour was awesome. Appreciated the insight and historical information from guides. Beautiful.',
  },
];

export const ConstTourDetails: ITourGalleryProps = {
  mainImage: 'img-sculptures-sandy-beach.png',
  thumbnails: [
    {
      img_src: 'img-ocean-hill.png',
      width: 229,
      height: 230,
    },
    {
      img_src: 'img-flags-sandy-beach.png',
      width: 208,
      height: 110,
    },
    {
      img_src: 'img-beach-rocks-ocean.png',
      width: 229,
      height: 230,
    },
    {
      img_src: 'img-field-rocks-grass.png',
      width: 208,
      height: 110,
    },
  ],
  reviews: tour_reviews,
  rating: 4.7,
  reviewCount: 2.3,
  duration: '4 hours',
  description:
    "Visit the most emblematic D-DAY sites with a professional English speaking driver guide. Departing from Bayeux, you will reach Normandy's Coastal battlefield grounds in a comfortable and fully equipped 8 or 19 seater vehicle. This tour features a stop at Omaha Beach that will include informative commentaries by your guide. You will then move on to the Pointe du Hoc landing area where the US Rangers assault group captured the area after scaling the cliffs. End the tour with a stop at the Normandy American Cemetery.",
  includes: [
    'English speaking qualified guide/driver',
    'Transport by air-conditioned minivan',
    'Sites as mentioned in the itinerary',
  ],
  excludes: ['Food and drinks', 'Gratuities', 'Hotel pickup and drop-off', 'Personal expenses and insurance'],
};
export const ConstItineraryAdditionals: string[] = [
  'Specialized infant seats are available',
  'Public transportation options are available nearby',
  'Suitable for all physical fitness levels',
  'Children must be accompanied by an adult',
  'Children under 4 years old are not allowed on the tour',
];
export const ConstSampleStops = [
  {
    id: '1',
    title: 'Omaha Beach',
    duration: 'Duration: 4 hours',
    timeAtLocation: '1 hour 30 minutes',
    description: 'Reach the coastal battlefield area of Omaha, one of the two U.S landing areas.',
    freeAdmission: true,
    coordinates: [49.3704, -0.8492] as [number, number],
  },
  {
    id: '2',
    title: 'Pointe du Hoc',
    duration: '1 hour 30 minutes',
    timeAtLocation: '30 minutes',
    description:
      'Continue the half-day trip to the Pointe du Hoc site; located between Utah & Omaha beaches, this prominent position along the coast of Normandy, was a focal point of the amphibious assault by U.S. forces.',
    freeAdmission: true,
    coordinates: [49.3947, -0.9852] as [number, number],
  },
  {
    id: '3',
    title: 'American Cemetery',
    duration: '1.5 hours',
    timeAtLocation: '45 minutes',
    description:
      'Visit the solemn American Cemetery overlooking Omaha Beach, honoring the brave soldiers who gave their lives during D-Day.',
    freeAdmission: true,
    coordinates: [49.3575, -0.8571] as [number, number],
  },
];
export const constDeparturePoint = {
  title: 'Departure point',
  address: 'Place du Québec, Pl. du Québec, Bayeux, 14400',
  instructions:
    'Please meet your guide 10 minutes before departure time. Morning departure time: 9am Afternoon departure time: 2pm',
  coordinates: [49.2764, -0.7024] as [number, number],
};
export const ConstEndPoint = {
  title: 'End point',
  address: 'Place du Québec, Pl. du Québec, Bayeux, 14400',
  coordinates: [49.2764, -0.7024] as [number, number],
  instructions: '',
};
export const ConstRatings: IRating[] = [
  { category: 'Good value', score: 4.6, maxScore: 5.0 },
  { category: 'Facilities', score: 4.6, maxScore: 5.0 },
  { category: 'Quality of service', score: 4.8, maxScore: 5.0 },
  { category: 'Ease of access', score: 4.5, maxScore: 5.0 },
];
export const ConstTestimonials: ITestimonial[] = [
  {
    id: '1',
    name: 'Reinhold K',
    initial: 'R',
    rating: 5,
    review: 'Tour was awesome. Appreciated the insight and historical information from guides. Beautiful scenery.',
    date: 'March 28, 2024',
    platform: 'Viator',
  },
  {
    id: '2',
    name: 'Keith R',
    initial: 'K',
    rating: 5,
    review: 'Matt provided the best experience and tour. He was incredibly thoughtful, courteous and informative.',
    date: 'February 03, 2024',
    platform: 'Viator',
  },
  {
    id: '3',
    name: 'Sarah M',
    initial: 'S',
    rating: 5,
    review: 'Absolutely fantastic tour! The guide was knowledgeable and the sites were breathtaking.',
    date: 'January 15, 2024',
    platform: 'Viator',
  },
];
export const ConstTourPhotos: ITourPhoto[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/2901134/pexels-photo-2901134.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Ancient ruins and stone structures',
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/3355788/pexels-photo-3355788.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Scenic countryside landscape',
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400',
    alt: 'Historical monument',
  },
];
export const ConstAskedQuestions: IFAQ[] = [
  {
    id: '1',
    question: 'How do I book a ticket?',
    answer:
      'You can book a ticket by selecting your preferred date and time, choosing the number of tickets, and proceeding to checkout.',
  },
  {
    id: '2',
    question: 'When do I pay?',
    answer:
      'Payment is processed immediately upon booking confirmation. We accept all major credit cards and digital payment methods.',
  },
  {
    id: '3',
    question: 'How do digital tickets work?',
    answer:
      'Digital tickets will be sent to your email after booking. Simply show the QR code on your phone at the meeting point.',
  },
  {
    id: '4',
    question: 'Can I cancel or modify my tickets?',
    answer: 'Yes, you can cancel or modify your booking up to 24 hours before the tour date for a full refund.',
  },
];
