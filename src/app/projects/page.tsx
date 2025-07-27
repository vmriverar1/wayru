
"use client";

import { AppClientLayout } from '@/components/layout/AppClientLayout';
import Image from 'next/image';
import { useI18n } from '@/hooks/useI18n';
import { Trophy, Award, Ribbon, Star, Users as UsersIcon } from 'lucide-react';
import { AlliesCarousel } from '@/components/projects/AlliesCarousel';
import { NewsSection } from '@/components/home/NewsSection';
import { SerParteSection } from '@/components/home/SerParteSection';
import { HomeContactSection } from '@/components/home/HomeContactSection';

const awardsData = [
  {
    id: 'bid',
    icon: Trophy,
    titleKey: 'pages.communitySupport.award1_title',
    descriptionKey: 'pages.communitySupport.award1_description',
  },
  {
    id: 'lima_clima',
    icon: Award,
    titleKey: 'pages.communitySupport.award2_title',
    descriptionKey: 'pages.communitySupport.award2_description',
  },
  {
    id: 'asme',
    icon: Ribbon,
    titleKey: 'pages.communitySupport.award3_title',
    descriptionKey: 'pages.communitySupport.award3_description',
  },
  {
    id: 'startup_peru',
    icon: Star,
    titleKey: 'pages.communitySupport.award4_title',
    descriptionKey: 'pages.communitySupport.award4_description',
  },
  {
    id: 'protagonistas_upc',
    icon: UsersIcon,
    titleKey: 'pages.communitySupport.award5_title',
    descriptionKey: 'pages.communitySupport.award5_description',
  },
];

const ProjectsContent = () => {
  const { t } = useI18n();
  const pageTitle = t('pages.communitySupport.title'); 

  return (
    <div>
      {/* Banner Section */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <Image
          src="https://picsum.photos/seed/community_banner/1600/900" 
          alt={pageTitle}
          fill
          className="object-cover"
          data-ai-hint="community collaboration"
        />
        <div className="absolute inset-0 bg-primary/60 flex flex-col justify-end items-center text-center pb-16 md:pb-20 lg:pb-24 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Awards Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium">
              {t('pages.communitySupport.introText')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-items-center">
            {awardsData.map((award) => (
              <div 
                key={award.id} 
                className="bg-black/10 p-6 rounded-lg shadow-md flex flex-col items-center text-center transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300 max-w-sm w-full"
              >
                <div className="bg-white rounded-full p-4 inline-flex items-center justify-center mb-5 shadow">
                  <award.icon size={36} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold uppercase text-primary-foreground mb-2">
                  {t(award.titleKey)}
                </h3>
                <p className="text-sm text-primary-foreground/90 leading-relaxed flex-grow">
                  {t(award.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Allies Section */}
      <section className="bg-background text-foreground py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t('pages.projects.alliesTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('pages.projects.alliesDescription')}
          </p>
          <AlliesCarousel />
        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      {/* Sé Parte del Cambio Section */}
      <SerParteSection />

      {/* Contact Section */}
      <HomeContactSection />
    </div>
  );
};

export default function ProjectsPage() {
  return (
    <AppClientLayout>
      <ProjectsContent />
    </AppClientLayout>
  );
}
