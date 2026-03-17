// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { countryLanguageMap } from './i18n/countryLanguageMap';
import { routing } from './i18n/routing';
import { isValidLocale } from './i18n/isValidLocale';
import { Locale } from './i18n/config';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';

const intlMiddleware = createMiddleware(routing);

function getLocale(request: NextRequest): string {
  /* 1️⃣ Cookie */
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale as Locale;
  }

  /* 2️⃣ Accept-Language */
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const languages = new Negotiator({ headers }).languages();
  const matchedLocale = matchLocale(languages, routing.locales, routing.defaultLocale);

  if (matchedLocale) {
    return matchedLocale as Locale;
  }

  /* 3️⃣ Geo-IP fallback */
  const country = request.headers.get('x-vercel-ip-country') ?? request.headers.get('cf-ipcountry') ?? '';

  return (countryLanguageMap[country] ?? routing.defaultLocale) as Locale;
}

export function middleware(request: NextRequest) {
  //const url = request.nextUrl.clone();
  const { pathname } = request.nextUrl;

  /* -----------------------------------------
   * 1️⃣ Locale already in URL
   * --------------------------------------- */
  const localeInPath = routing.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (localeInPath) {
    if (!isValidLocale(localeInPath)) {
      return NextResponse.redirect(new URL(`/${routing.defaultLocale}`, request.url));
    }

    return intlMiddleware(request);
  }

  /* -----------------------------------------
   * 2️⃣ Detect locale & redirect
   * --------------------------------------- */
  const locale = getLocale(request);
  const response = redirectWithLocale(request, locale);
  response.cookies.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

/* -----------------------------------------
 * Shared redirect helper
 * --------------------------------------- */
function redirectWithLocale(request: NextRequest, locale: string) {
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${url.pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - API routes
     * - Next.js internals
     * - Static files (images, icons, fonts, etc)
     */
    '/((?!api|_next|favicon.ico|images|icons|fonts|.*\\..*).*)',
  ],
};
