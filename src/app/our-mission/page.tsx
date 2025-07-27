
"use client";

import { AppClientLayout } from '@/components/layout/AppClientLayout';
import Image from 'next/image';
import { useI18n } from '@/hooks/useI18n';
import { OurHistorySection } from '@/components/mission/OurHistorySection'; 
import { SerParteSection } from '@/components/home/SerParteSection';
import { HomeContactSection } from '@/components/home/HomeContactSection';

const OurMissionContent = () => {
  const { t } = useI18n();
  const pageTitle = "Gota a gota, por un mundo sostenible y saludable para todos";
  
  return (
    <div>
      {/* Banner Section */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <Image
          src="https://picsum.photos/seed/mission/1600/900"
          alt="Our Mission illustrative banner"
          fill
          className="object-cover"
          data-ai-hint="water drops nature"
          priority
        />
        {/* Adjusted pb-* here to push text further up, creating more space above it */}
        <div className="absolute inset-0 bg-primary/60 flex flex-col justify-end items-center text-center pb-16 md:pb-20 lg:pb-24 px-4"> 
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* New "Nuestra Misión" Section (Image Left, Text Right) */}
      <section className="bg-background text-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video md:aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://placehold.co/600x450.png"
                alt={t('pages.ourMission.missionTitle')}
                fill
                className="object-cover"
                data-ai-hint="team planning water"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {t('pages.ourMission.missionTitle')}
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                {t('pages.ourMission.missionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New "Nuestra Visión" Section (Text Left, Image Right) */}
      <section className="bg-secondary text-secondary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-last">
              <div className="relative aspect-video md:aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://placehold.co/600x450.png"
                  alt={t('pages.ourMission.visionTitle')}
                  fill
                  className="object-cover"
                  data-ai-hint="sustainable future globe"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {t('pages.ourMission.visionTitle')}
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed"> 
                {t('pages.ourMission.visionText')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <OurHistorySection />
      <SerParteSection />
      <HomeContactSection />

    </div>
  );
};


export default function OurMissionPage() {
  return (
    <AppClientLayout>
      <OurMissionContent />
    </AppClientLayout>
  );
}

