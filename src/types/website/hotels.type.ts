import { IconType } from 'react-icons';

export type THotelHomeProfile = {
  id: number;
  name: string;
  generalRating?: number;
  starRating: number;
  guestRatingReview?: string[];
  imgSrcUrl?: string;
  relatedImgUrl?: string[];
  location: string;
  numberOfReviews?: number;
  totalCost: number;
  unitCost: number;
  numberOfRoomsLeft?: number;
  percentageDiscount: number;
  amenities?: string[];
  description?: string[];
  isFeaturedExist?: boolean;
};

export type THotelServiceOverviewProps = {
  hotelName: string;
  hotelAddress: string;
  starRating: number;
  notification: string[];
  valueRating: number;
  reveiws: string[];
  numberOfReviews: number;
  hotelAmenities: ICustomOptions[];
  hotelLocationBranch: ICustomOptions[];
};

export interface ICustomOptions {
  label: string;
  icon?: IconType;
  description?: string;
}
