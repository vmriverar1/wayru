
"use client";

import { useI18n } from '@/hooks/useI18n';

export function EventsTitleSection() {
  const { t } = useI18n();
  return (
    <section className="bg-background text-foreground text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24"> {/* Adjusted padding for a title-only section */}
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          {t('eventsSection.title')}
        </h2>
      </div>
    </section>
  );
}
