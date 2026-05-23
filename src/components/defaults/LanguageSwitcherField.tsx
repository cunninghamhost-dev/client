'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n/config';
import { languageLabels } from '@/i18n/languageLabels';

export default function LanguageSwitcherField() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (newLocale: string) => {
    // Save cookie
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;

    const segments = pathname.split('/');
    segments[1] = newLocale;

    router.push(segments.join('/'));
    router.refresh();
  };

  return (
    <select
      value={locale}
      onChange={(e) => handleChange(e.target.value)}
      className='border border-gray-300 rounded-md px-3 py-1 text-sm bg-white'
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {languageLabels[loc]}
        </option>
      ))}
    </select>
  );
}
