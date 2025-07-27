
"use client";

import { useI18n } from '@/hooks/useI18n';
import { Separator } from '@/components/ui/separator';
import { HeartPulse, Droplets, Scale, Building2, Globe } from 'lucide-react';

const odsData = [
  {
    id: 'ods3',
    icon: HeartPulse,
    titleKey: 'pages.solutions.odsCard3Title',
    descriptionKey: 'pages.solutions.odsCard3Description',
    bgColorClass: 'bg-red-500',
    textColorClass: 'text-white',
  },
  {
    id: 'ods6',
    icon: Droplets,
    titleKey: 'pages.solutions.odsCard6Title',
    descriptionKey: 'pages.solutions.odsCard6Description',
    bgColorClass: 'bg-sky-500',
    textColorClass: 'text-white',
  },
  {
    id: 'ods10',
    icon: Scale,
    titleKey: 'pages.solutions.odsCard10Title',
    descriptionKey: 'pages.solutions.odsCard10Description',
    bgColorClass: 'bg-pink-500',
    textColorClass: 'text-white',
  },
  {
    id: 'ods11',
    icon: Building2,
    titleKey: 'pages.solutions.odsCard11Title',
    descriptionKey: 'pages.solutions.odsCard11Description',
    bgColorClass: 'bg-amber-500',
    textColorClass: 'text-white',
  },
  {
    id: 'ods13',
    icon: Globe,
    titleKey: 'pages.solutions.odsCard13Title',
    descriptionKey: 'pages.solutions.odsCard13Description',
    bgColorClass: 'bg-green-500',
    textColorClass: 'text-white',
  },
];

const OdsCard = ({ icon: Icon, titleKey, descriptionKey, bgColorClass, textColorClass }: typeof odsData[0]) => {
  const { t } = useI18n();
  return (
    <div className="flip-card aspect-square">
      <div className={`flip-card-inner ${bgColorClass} ${textColorClass}`}>
        <div className="flip-card-front">
          <Icon size={48} className="mb-3 md:mb-4" />
          <h4 className="text-sm md:text-base font-semibold">{t(titleKey)}</h4>
        </div>
        <div className={`flip-card-back ${bgColorClass} ${textColorClass}`}>
          <p className="text-xs md:text-sm leading-relaxed">{t(descriptionKey)}</p>
        </div>
      </div>
    </div>
  );
};

export function OdsSection() {
  const { t } = useI18n();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-2">
        {t('pages.solutions.odsSubtitle')}
      </h3>
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
        {t('pages.solutions.odsTitle')}
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8">
        {t('pages.solutions.odsDescription')}
      </p>
      <Separator className="w-20 h-1 bg-primary mx-auto mb-10 md:mb-12" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
        {odsData.map((ods) => (
          <OdsCard
            key={ods.id}
            id={ods.id}
            icon={ods.icon}
            titleKey={ods.titleKey}
            descriptionKey={ods.descriptionKey}
            bgColorClass={ods.bgColorClass}
            textColorClass={ods.textColorClass}
          />
        ))}
      </div>
    </div>
  );
}
