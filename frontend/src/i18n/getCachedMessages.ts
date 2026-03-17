// src/i18n/getCachedMessages.ts

import { unstable_cache } from 'next/cache';
import { getMessages } from 'next-intl/server';
import { Locale } from './config';

export const getCachedMessages = unstable_cache(
  async (locale: Locale) => {
    return getMessages({ locale });
  },
  ['intl-messages'],
  {
    revalidate: 60 * 60, // 1 hour
    tags: ['intl'],
  },
);
