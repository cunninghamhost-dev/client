// src/i18n/acceptLanguage.ts

import { locales, Locale } from './config';

export function getLocaleFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  const languages = header.split(',').map((part) => part.split(';')[0].trim().toLowerCase());

  for (const lang of languages) {
    const base = lang.split('-')[0] as Locale;
    if (locales.includes(base)) {
      return base;
    }
  }

  return null;
}
