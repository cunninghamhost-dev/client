// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { countryLanguageMap } from './i18n/countryLanguageMap';
import { routing } from './i18n/routing';
import { isValidLocale } from './i18n/isValidLocale';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { Locale } from './i18n/config';

const intlMiddleware = createMiddleware(routing);

/* -----------------------------------------
| Helper: Detect locale from cookie, headers, or Geo-IP
------------------------------------------ */
function getLocale(request: NextRequest): string {
  // 1️⃣ Check cookie
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale as Locale;
  }

  // 2️⃣ Check Accept-Language header
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  const languages = new Negotiator({ headers }).languages();
  const matchedLocale = matchLocale(languages, routing.locales, routing.defaultLocale);
  if (matchedLocale) {
    return matchedLocale as Locale;
  }

  // 3️⃣ Geo-IP fallback
  const country = request.headers.get('x-vercel-ip-country') ?? request.headers.get('cf-ipcountry') ?? '';
  return (countryLanguageMap[country] ?? routing.defaultLocale) as Locale;
}

/* -----------------------------------------
| Helper: Redirect to locale-prefixed path
------------------------------------------ */
function redirectWithLocale(request: NextRequest, locale: string) {
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${url.pathname}`;
  return NextResponse.redirect(url);
}

/* -----------------------------------------
| Main Middleware
------------------------------------------ */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // --- 1. AUTHENTICATION PROTECTION ---
  
  // Check if the path is a dashboard path (e.g., /dashboard, /en/dashboard, /fr/dashboard)
  const isDashboardPath = pathname.endsWith('/dashboard') || pathname.includes('/dashboard/');
  const isAuthPath = pathname.endsWith('/authentication') || pathname.includes('/authentication/');

  // If trying to access dashboard while not logged in
  if (!token && isDashboardPath) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}/authentication`, request.url));
  }

  // If logged in but trying to access login page
  if (token && isAuthPath) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // --- 2. LOCALE & INTERNATIONALIZATION ---
  
  // Existing logic for next-intl
  const localeInPath = routing.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (localeInPath) {
    return intlMiddleware(request);
  }

  // Default redirect to include locale
  const locale = getLocale(request);
  return redirectWithLocale(request, locale);
}
/* -----------------------------------------
| Middleware matcher config
------------------------------------------ */
export const config = {
  matcher: [
    // Match all paths except API routes, Next internals, and static files
    '/((?!api|_next|favicon.ico|images|icons|fonts|.*\\..*).*)',
  ],
};
