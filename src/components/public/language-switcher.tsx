'use client';

import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const tLocale = useLocale();
  const pathname = usePathname();

  const changeLanguage = (nextLocale: string) => {
    // 1. Manually update the next-intl cookie so the middleware doesn't force us back 
    //    to the previously selected language.
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // 2. Force a hard reload to completely bypass Next.js aggressive client-side cache
    //    which causes frozen routes or 404s when switching locales.
    const cleanPath = pathname === '/' ? '' : pathname;
    const newPath = nextLocale === 'en' ? `${cleanPath || '/'}` : `/${nextLocale}${cleanPath}`;
    window.location.href = newPath;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block uppercase font-bold text-xs">{tLocale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuItem 
            onClick={() => changeLanguage('en')} 
            className={`cursor-pointer w-full flex items-center ${tLocale === 'en' ? 'font-bold bg-slate-100' : ''}`}
        >
          <span className="mr-2 text-lg">🇬🇧</span> English
        </DropdownMenuItem>
        <DropdownMenuItem 
            onClick={() => changeLanguage('ms')}
            className={`cursor-pointer w-full flex items-center ${tLocale === 'ms' ? 'font-bold bg-slate-100' : ''}`}
        >
          <span className="mr-2 text-lg">🇲🇾</span> Bahasa Melayu
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
