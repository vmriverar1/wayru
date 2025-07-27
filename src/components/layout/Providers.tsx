"use client";

import type { ReactNode } from 'react';
import { I18nProvider } from '@/context/I18nContext';
import { LoadingProvider } from '@/context/LoadingContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <LoadingProvider>
      <I18nProvider>
        {children}
      </I18nProvider>
    </LoadingProvider>
  );
}
