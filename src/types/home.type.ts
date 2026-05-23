import { TSVGIconProps } from './default.type';

export type THeroProfileProps = TSVGIconProps & {
  key: string;
  name: string;
  link?: string;
};

export type TSourceFlightProfile = {
  id: number;
  destination: string;
  amountInNaira: string;
  fromDate: string;
  toDate: string;
  flightName: string;
  imageSource?: string;
};

export type TCarRecommended = {
  id: number;
  title: string;
  rating: number;
  image_reference: string;
  vendor: string;
  pricing: string;
  status: string;
};

export type TAttractionModel = {
  id: number;
  title: string;
  rating: number;
  image_reference: string;
  reviews: number;
};

export type TPropertyFeatureModel = TAttractionModel & {
  star_count: number;
  pricing: string;
};
