import { ISelectOption } from '@/types/default.type';
import { TNavigationLinkProps, TFooterNavLinkProps } from '@/types/website-layout.type';
import { Briefcase, Facebook, Instagram, Linkedin, Youtube, X } from 'lucide-react';
import { CabinClassEnum, FlightTypeEnum } from '../schemas/enums/flight-types.enum';

export const navLinks: TNavigationLinkProps[] = [
  // {
  //   name: 'Blog',
  //   icon: BookOpen,
  //   href: '#blog',
  //   key: 'blog',
  // },
  {
    name: 'Support',
    icon: Briefcase,
    href: '#support',
    key: 'support',
  },
];

export const footerNavLinks: TFooterNavLinkProps = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Feedback', href: '/feedback' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ],
  services: [{ name: 'Flights' }, { name: 'Hotels' }, { name: 'Visa' }, { name: 'Deals' }, { name: 'Packages' }],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Compliance', href: '/compliance' },
  ],
};

export const socialLinks: TNavigationLinkProps[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1DG8jJwoef',
    icon: Facebook,
  },
  {
    name: 'Twitter',
    href: 'https://x.com/Cunningham66734',
    icon: X,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/cunningham_global?igsh=MmF2MzVuZGN3eGht',
    icon: Instagram,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedIn.com',
    icon: Linkedin,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@cunningham_global_travels?si=ar4jxQtmPMZfBm94',
    icon: Youtube,
  },
];

export const FlightTypeConstant: string[] = ['Economy', 'Premium Economy', 'Business Class', 'First Class'];

export const SortOrderBy: ISelectOption[] = [
  {
    value: 'Generalized',
    label: 'Generalized',
  },
  {
    value: 'Recommended',
    label: 'Recommended',
  },
  {
    value: 'Business',
    label: 'Business',
  },
  {
    value: 'Luxury',
    label: 'Luxury',
  },
] as const;

export const FLIGHT_TYPE_LABELS: Record<FlightTypeEnum, string> = {
  one_way: 'One way',
  round_trip: 'Round trip',
  multi_city: 'Multi city',
};

export const CABIN_CLASS_LABELS: Record<CabinClassEnum, string> = {
  economy: 'Economy',
  premium_economy: 'Premium Economy',
  business: 'Business Class',
  first: 'First Class',
};

export const FLIGHT_TYPE_OPTIONS = Object.entries(FLIGHT_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}));
