
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PlayCircle, Plus, Minus } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useI18n } from '@/hooks/useI18n';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function InformativeVideoSection() {
  const { t } = useI18n();
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const accordionData = [
    { value: 'impact', titleKey: 'informativeVideo.tab1_title', contentKey: 'informativeVideo.tab1_content' },
    { value: 'contribute', titleKey: 'informativeVideo.tab2_title', contentKey: 'informativeVideo.tab2_content' },
    { value: 'empower', titleKey: 'informativeVideo.tab3_title', contentKey: 'informativeVideo.tab3_content' },
    { value: 'inspire', titleKey: 'informativeVideo.tab4_title', contentKey: 'informativeVideo.tab4_content' },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play none none none",
      }
    });

    tl.fromTo(sectionRef.current.querySelectorAll(".anim-child"),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, []);

  return (
    <section ref={sectionRef} className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Grid de imágenes desigual */}
          <div className="anim-child">
            {showVideo ? (
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1&rel=0"
                  title={t('informativeVideo.title')}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            ) : (
              <div className="relative flex gap-4 h-[500px] group cursor-pointer" onClick={() => setShowVideo(true)}>
                {/* Imagen grande izquierda - ocupa toda la altura */}
                <div className="relative rounded-lg overflow-hidden shadow-xl flex-1">
                  <Image
                    src="https://picsum.photos/seed/waterpurpose1/800/1000"
                    alt="Propósito Wayru 1"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="water conservation community project"
                  />
                </div>

                {/* Columna derecha - centrada verticalmente con 80% de altura */}
                <div className="flex-1 flex flex-col gap-4 justify-center">
                  {/* Imagen superior derecha - más alta (2/3 del espacio) */}
                  <div className="relative rounded-lg overflow-hidden shadow-xl h-[267px]">
                    <Image
                      src="https://picsum.photos/seed/waterpurpose2/600/640"
                      alt="Propósito Wayru 2"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint="sustainable water solutions"
                    />
                  </div>

                  {/* Imagen inferior derecha - más pequeña (1/3 del espacio) */}
                  <div className="relative rounded-lg overflow-hidden shadow-xl h-[133px]">
                    <Image
                      src="https://picsum.photos/seed/waterpurpose3/600/320"
                      alt="Propósito Wayru 3"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint="community water access"
                    />
                  </div>
                </div>

                {/* Ícono de reproducir centrado sobre todo el conjunto */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <PlayCircle size={80} className="text-white drop-shadow-2xl" strokeWidth={1.5} />
                </div>
              </div>
            )}
          </div>
          <div className="anim-child">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">{t('informativeVideo.title')}</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              {t('informativeVideo.description')}
            </p>
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-3 mb-6">
              {accordionData.map((item, index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={item.value}
                  className="border border-border bg-card rounded-lg shadow-sm data-[state=open]:bg-secondary"
                >
                  <AccordionTrigger
                    className={cn(
                      "w-full flex justify-between items-center p-4 text-left font-medium text-card-foreground hover:no-underline text-base md:text-lg",
                      "data-[state=open]:text-primary data-[state=open]:font-semibold [&>svg.lucide-chevron-down]:hidden"
                    )}
                  >
                    <span>{t(item.titleKey)}</span>
                    <div className="ml-4 flex-shrink-0 rounded-full border border-primary text-primary h-6 w-6 flex items-center justify-center group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-colors duration-200">
                       <Plus className="h-4 w-4 block data-[state=open]:hidden" />
                       <Minus className="h-4 w-4 hidden data-[state=open]:block" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0 text-card-foreground opacity-90 text-base md:text-lg">
                    <p>{t(item.contentKey)}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <button
              className="w-full bg-white text-primary border-2 border-primary font-semibold py-3 px-6 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Conoce más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
