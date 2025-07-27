"use client";

import type { ReactNode } from 'react';
import { createContext, useState, useCallback } from 'react';
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';

type Locale = 'en' | 'es';

interface Translations {
  [key: string]: string | Translations;
}

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
}

const translations: Record<Locale, Translations> = {
  en: enTranslations,
  es: esTranslations,
};

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es'); // Default to Spanish

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const t = useCallback((key: string, replacements?: Record<string, string>): string => {
    const keys = key.split('.');
    let result: string | Translations | undefined = translations[locale];

    for (const k of keys) {
      if (typeof result === 'object' && result !== null && k in result) {
        result = result[k];
      } else {
        result = undefined;
        break;
      }
    }
    
    if (typeof result === 'string') {
      if (replacements) {
        return Object.entries(replacements).reduce((acc, [placeholder, value]) => {
          return acc.replace(`{{${placeholder}}}`, value);
        }, result as string);
      }
      return result as string;
    }
    
    // Fallback to English if translation not found in current locale
    if (locale !== 'en') {
      result = translations['en'];
      for (const k of keys) {
        if (typeof result === 'object' && result !== null && k in result) {
          result = result[k];
        } else {
          return key; // Fallback to key if not found in English either
        }
      }
      if (typeof result === 'string') {
        if (replacements) {
          return Object.entries(replacements).reduce((acc, [placeholder, value]) => {
            return acc.replace(`{{${placeholder}}}`, value);
          }, result as string);
        }
        return result as string;
      }
    }
    
    return key; // Fallback to key if not found
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
