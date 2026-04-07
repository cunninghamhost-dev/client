import { CarRentalProfileLinks } from '@/lib/constants/website/carrentals/cars-main-content.constant';
import { ComponentType, SVGProps } from 'react';
import { IconType } from 'react-icons';

export type TDefaultData = {
  id?: number;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color?: string;
};

export type TSVGIconProps = {
  fileName: string; // file name without path, e.g., "my-icon.svg"
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

export interface ITabItem {
  value: string;
  label: string;
  icon?: IconType;
  content?: React.ReactNode;
}

export interface ITabItemMB {
  label: string;
  value: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export interface ICategoryTabItem extends ITabItem {
  amount?: string;
  timeline?: string;
}

export interface IControlItem {
  value: number;
  name: string;
  component?: React.ReactNode;
}

export type TStarRatingProps = {
  rating: number;
  maxStars?: number;
};

export type TLanguageProps = {
  name: string;
  value: string;
  position?: string;
  transform?: string;
};

export type TCountrySelectProps = {
  categoryId: number;
  category: string;
  countryName: string;
};

export interface ISelectOption {
  label: string;
  value: string;
}
export interface ISelectOption2 {
  label: string;
  value: string;
  embed?: string;
}

export interface IContextType {
  id: number;
  key?: string;
  title: string;
  description: string;
}

export type TNavigationLinkModel = {
  name: string;
  hash: string;
};

export interface IAnchorNavigationProps {
  items: TNavigationLinkModel[];
}

export type TSectionName = (typeof CarRentalProfileLinks)[number]['name'];

export interface ILayoutProps {
  children: React.ReactNode;
}

export interface ITabPanelProps {
  tabs: ITabItem[];
  index?: number;
}

export interface ILinkerProps {
  data: string;
  href: string;
}

export interface IExpandableProps {
  label: string;
  value: string;
  subs: string[];
  count: number;
}

export interface ICustomTabPanelProps {
  tabs: ITabItem[];
}
