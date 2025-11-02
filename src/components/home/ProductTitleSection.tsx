
"use client";

import { useI18n } from '@/hooks/useI18n';

export function ProductTitleSection() {
  const { t } = useI18n();
  return (
    <div className="bg-background text-foreground text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          {t('productSection.title')}
        </h2>
      </div>
    </div>
  );
}
