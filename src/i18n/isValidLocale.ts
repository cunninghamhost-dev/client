//import { locales, type Locale } from './config';

import { Locale } from './config';
import { routing } from './routing';

export function isValidLocale(value: string): value is Locale {
  const locales = routing.locales;
  return locales.includes(value as Locale);
}
