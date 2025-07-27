"use client";

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n } from '@/hooks/useI18n';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "flex items-center gap-1.5 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-ring",
            "px-2 py-2 md:px-3", 
            className
           )}
        >
          <Globe size={18} aria-hidden="true" />
          <span className="font-medium">{locale.toUpperCase()}</span>
          <span className="sr-only">Change language, current: {locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale('en')} disabled={locale === 'en'}>
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale('es')} disabled={locale === 'es'}>
          Español (ES)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
