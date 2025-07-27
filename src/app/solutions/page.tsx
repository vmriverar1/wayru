
"use client";

import { AppClientLayout } from '@/components/layout/AppClientLayout';
import Image from 'next/image';
import { useI18n } from '@/hooks/useI18n';
import { Droplet, TrendingUp, Home, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TestimonialSlider } from '@/components/solutions/TestimonialSlider';
import { OdsSection } from '@/components/solutions/OdsSection';
import { SerParteSection } from '@/components/home/SerParteSection';
import { HomeContactSection } from '@/components/home/HomeContactSection';

const initialImpactData = [
  {
    id: "waterSaved",
    icon: Droplet,
    valueKey: "pages.solutions.impactWaterSavedValue", 
    labelKey: "pages.solutions.impactWaterSavedLabel",
  },
  {
    id: "savings",
    icon: TrendingUp,
    valueKey: "pages.solutions.impactSavingsValue", 
    labelKey: "pages.solutions.impactSavingsLabel",
  },
  {
    id: "waterDays",
    icon: Home,
    valueKey: "pages.solutions.impactWaterDaysValue", 
    labelKey: "pages.solutions.impactWaterDaysLabel",
  },
  {
    id: "peopleEmpowered",
    icon: Users,
    valueKey: "pages.solutions.impactPeopleEmpoweredValue", 
    labelKey: "pages.solutions.impactPeopleEmpoweredLabel",
  },
];

type ParsedStat = {
  id: string;
  icon: React.ElementType;
  labelKey: string;
  prefix: string;
  numericValue: number;
  suffix: string;
};

const testimonialData = [
  {
    id: 't1',
    quoteKey: 'pages.solutions.testimonial1Quote',
    authorKey: 'pages.solutions.testimonial1Author',
    authorImageSrc: 'https://picsum.photos/seed/avatarT1/60/60',
  },
  {
    id: 't2',
    quoteKey: 'pages.solutions.testimonial2Quote',
    authorKey: 'pages.solutions.testimonial2Author',
    authorImageSrc: 'https://picsum.photos/seed/avatarT2/60/60',
  },
  {
    id: 't3',
    quoteKey: 'pages.solutions.testimonial3Quote',
    authorKey: 'pages.solutions.testimonial3Author',
    authorImageSrc: 'https://picsum.photos/seed/avatarT3/60/60',
  },
];

const SolutionsContent = () => {
  const { t } = useI18n();
  const pageTitle = t('pages.solutions.bannerTitle'); 
  
  const [animatedStats, setAnimatedStats] = useState<ParsedStat[]>([]);
  const [currentValues, setCurrentValues] = useState<Record<string, number>>({});

  useEffect(() => {
    const parseStatValue = (statString: string) => {
      const match = statString.match(/([+])?(\d+)([K%])?/);
      if (match) {
        return {
          prefix: match[1] || '',
          numericValue: parseInt(match[2], 10),
          suffix: match[3] || '',
        };
      }
      const numericOnlyMatch = statString.match(/\d+/);
      if (numericOnlyMatch) {
        return { prefix: '', numericValue: parseInt(numericOnlyMatch[0], 10), suffix: '' };
      }
      return { prefix: '', numericValue: 0, suffix: statString };
    };

    const parsedData = initialImpactData.map(item => {
      const rawValue = t(item.valueKey);
      const parsed = parseStatValue(rawValue);
      return { ...item, ...parsed };
    });
    setAnimatedStats(parsedData);

    const initialVals: Record<string, number> = {};
    parsedData.forEach(item => {
      initialVals[item.id] = 0;
    });
    setCurrentValues(initialVals);

    const animationDuration = 2000; 

    parsedData.forEach(item => {
      let startTime: number | null = null;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        
        const animatedValue = Math.floor(progress * item.numericValue);
        
        setCurrentValues(prev => ({ ...prev, [item.id]: animatedValue }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    });

  }, [t]);

  return (
    <div className="bg-background">
      {/* Banner Section */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <Image
          src="https://picsum.photos/seed/solutions_banner_impact/1600/900"
          alt={pageTitle}
          fill
          className="object-cover"
          data-ai-hint="global impact community"
        />
        <div className="absolute inset-0 bg-primary/60 flex flex-col justify-end items-center text-center pb-16 md:pb-20 lg:pb-24 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Impact Stats Section - Dark Background, White Text, Counter Effect */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">{t('pages.solutions.subtitle')}</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-16 lg:gap-x-20 lg:gap-y-24 max-w-4xl mx-auto">
            {animatedStats.map((item) => (
              <div key={item.id} className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center">
                  <item.icon className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 text-primary-foreground mr-3 md:mr-4" aria-hidden="true" />
                  <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground">
                    {item.prefix}{currentValues[item.id] ?? 0}{item.suffix}
                  </span>
                </div>
                <p className="mt-3 md:mt-4 text-sm md:text-base text-primary-foreground/80 max-w-[280px] mx-auto">
                  {t(item.labelKey)}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials Title and Description - within the dark section */}
          <div className="text-center mt-16 md:mt-24 lg:mt-32">
            <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground mb-4">
              {t('pages.solutions.testimonialsTitle')}
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
              {t('pages.solutions.testimonialsDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Slider Section - Pulled up to overlap. Increased negative margin */}
      <section className="relative -mt-40 md:-mt-52 lg:-mt-64 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <TestimonialSlider testimonials={testimonialData} />
        </div>
      </section>

      {/* ODS Section - Subsequent white section for content below slider */}
      {/* Padding top adjusted to make space for the overlapping slider */}
      <section className="bg-background pt-32 pb-16 md:pb-24 lg:pb-32">
         <OdsSection />
      </section>
      <SerParteSection />
      <HomeContactSection />
    </div>
  );
};

export default function SolutionsPage() {
  return (
    <AppClientLayout>
      <SolutionsContent />
    </AppClientLayout>
  );
}
