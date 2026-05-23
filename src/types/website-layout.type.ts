import { LucideIcon } from 'lucide-react';

export type TNavigationLinkProps = {
  name: string;
  icon?: LucideIcon;
  href?: string;
  key?: string;
};

export type TFooterNavLinkProps = {
  company: TNavigationLinkProps[];
  services: TNavigationLinkProps[];
  legal: TNavigationLinkProps[];
};
