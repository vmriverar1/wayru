
"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '@/hooks/useI18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const eventItems = [
  {
    id: 'event1',
    titleKey: 'eventsSection.event1_title',
    descriptionKey: 'eventsSection.event1_description',
    imgSrc: 'https://picsum.photos/seed/event1/1000/800',
    imgAlt: 'Water for All Workshop',
    aiHint: 'community workshop'
  },
  {
    id: 'event2',
    titleKey: 'eventsSection.event2_title',
    descriptionKey: 'eventsSection.event2_description',
    imgSrc: 'https://picsum.photos/seed/event2/1000/800',
    imgAlt: 'AquaRun Charity Event',
    aiHint: 'charity run'
  },
  {
    id: 'event3',
    titleKey: 'eventsSection.event3_title',
    descriptionKey: 'eventsSection.event3_description',
    imgSrc: 'https://picsum.photos/seed/event3/1000/800',
    imgAlt: 'Innovation Summit on Water Technology',
    aiHint: 'conference technology'
  },
];

export function EventsSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null); 
  const textContentRef = useRef<HTMLDivElement>(null); 
  const [activeImage, setActiveImage] = useState(eventItems[0].imgSrc);

  useEffect(() => {
    if (!sectionRef.current || !imageContainerRef.current || !textContentRef.current) return;
    
    const textItems = gsap.utils.toArray<HTMLElement>('.event-item-card');
    if (textItems.length === 0) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${(textItems.length) * window.innerHeight - window.innerHeight / 2}`,
      pin: imageContainerRef.current,
      pinSpacing: true,
    });
    

    textItems.forEach((itemCard) => {
      const item = eventItems.find(p => `${p.id}-trigger-event` === itemCard.id);
      if (item) {
        ScrollTrigger.create({
          trigger: itemCard,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveImage(item.imgSrc),
          onEnterBack: () => setActiveImage(item.imgSrc),
        });
      }

      gsap.fromTo(itemCard.querySelector('.event-card-anim'), 
        { opacity: 0, x: window.innerWidth < 768 ? 0 : -50, y: window.innerWidth < 768 ? 50 : 0 },
        {
          opacity: 1, x: 0, y: 0, duration: 0.6,
          scrollTrigger: {
            trigger: itemCard,
            start: 'top bottom-=150px',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [t]);

  return (
    <section ref={sectionRef} className="bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title removed from here */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-0">
          <div ref={textContentRef} className="space-y-0 md:order-1 md:pr-8 lg:pr-16">
            {eventItems.map((item) => (
              <div 
                key={item.id} 
                id={`${item.id}-trigger-event`} 
                className="min-h-screen flex flex-col items-center justify-center event-item-card py-12 md:py-0"
              >
                <div className="event-card-anim w-full">
                  <Card className="shadow-lg bg-secondary w-full max-w-lg mx-auto">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary">{t(item.titleKey)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-secondary-foreground text-base leading-relaxed">
                        {t(item.descriptionKey)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          <div 
            ref={imageContainerRef} 
            className="h-screen md:sticky top-20 flex items-start justify-center md:order-2 md:pl-0" 
          >
            <div className="relative w-full h-full md:h-screen rounded-lg overflow-hidden shadow-2xl"> 
              {eventItems.map((item) => (
                <Image
                  key={item.imgSrc}
                  src={item.imgSrc}
                  alt={t(item.titleKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={cn(
                    'object-cover transition-opacity duration-700 ease-in-out',
                    activeImage === item.imgSrc ? 'opacity-100' : 'opacity-0'
                  )}
                  priority={item.id === 'event1'}
                  data-ai-hint={item.aiHint}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
