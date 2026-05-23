export type TAttractionProfileProps = {
  id: number;
  city_name: string;
  full_city_name: string;
  description: string;
  early_booking?: string;
  best_seller?: string;
  duration: string;
  star_rating?: string;
  amenities?: string;
  amount: string;
  availability: string;
  image_names?: string[];
  reviews?: string;
};

export type ITourReviews = {
  id: number;
  author: string;
  text: string;
};
export type TThumbnails = {
  img_src: string;
  height: number;
  width: number;
};

export interface ITourGalleryProps {
  mainImage: string;
  thumbnails: TThumbnails[];
  reviews: ITourReviews[];
  rating: number;
  reviewCount: number;
  duration: string;
  description: string;
  includes: string[];
  excludes: string[];
}

export interface ItineraryStop {
  id: string;
  title: string;
  duration: string;
  timeAtLocation: string;
  description: string;
  freeAdmission: boolean;
  coordinates: [number, number];
}

export interface ILocationPoint {
  title: string;
  address: string;
  instructions: string;
  coordinates: [number, number];
}

export interface IRating {
  category: string;
  score: number;
  maxScore: number;
}

export interface ITestimonial {
  id: string;
  name: string;
  initial: string;
  rating: number;
  review: string;
  date: string;
  platform: string;
}

export interface ITourPhoto {
  id: string;
  url: string;
  alt: string;
}

export interface IFAQ {
  id: string;
  question: string;
  answer: string;
}
