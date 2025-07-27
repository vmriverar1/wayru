
import { AppClientLayout } from '@/components/layout/AppClientLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { PhrasesSection } from '@/components/home/PhrasesSection';
import { InformativeVideoSection } from '@/components/home/InformativeVideoSection';
import { ProductTitleSection } from '@/components/home/ProductTitleSection';
import { ProductSection } from '@/components/home/ProductSection';
import { EventsTitleSection } from '@/components/home/EventsTitleSection';
import { EventsSection } from '@/components/home/EventsSection';
import { NewsSection } from '@/components/home/NewsSection';
import { ImpactSection } from '@/components/home/ImpactSection';
import { SerParteSection } from '@/components/home/SerParteSection';
import { AlliesSection } from '@/components/home/AlliesSection';
import { HomeContactSection } from '@/components/home/HomeContactSection';

export default function HomePage() {
  return (
    <AppClientLayout>
      <HeroSection />
      <PhrasesSection />
      <InformativeVideoSection />
      <ProductTitleSection />
      <ProductSection />
      <EventsTitleSection />
      <EventsSection />
      <ImpactSection />
      <SerParteSection />
      <AlliesSection />
      <NewsSection /> {/* Moved NewsSection here, below AlliesSection */}
      <HomeContactSection />
    </AppClientLayout>
  );
}
