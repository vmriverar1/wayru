
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
    <section ref={sectionRef} className="bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="anim-child aspect-video rounded-lg overflow-hidden shadow-xl group relative cursor-pointer" onClick={() => setShowVideo(true)}>
            {showVideo ? (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1&rel=0" 
                title={t('informativeVideo.title')}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            ) : (
              <>
                <Image
                  src="https://picsum.photos/seed/waterpurpose/1280/720"
                  alt={t('informativeVideo.title') + " thumbnail"}
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint="water conservation community"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircle size={80} className="text-white/80" />
                </div>
              </>
            )}
          </div>
          <div className="anim-child">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">{t('informativeVideo.title')}</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              {t('informativeVideo.description')}
            </p>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {accordionData.map((item, index) => (
                <AccordionItem 
                  value={`item-${index}`} 
                  key={item.value} 
                  className="border border-border bg-card rounded-lg shadow-sm data-[state=open]:bg-secondary"
                >
                  <AccordionTrigger 
                    className={cn(
                      "w-full flex justify-between items-center p-4 text-left font-medium text-card-foreground hover:no-underline",
                      "data-[state=open]:text-primary data-[state=open]:font-semibold [&>svg.lucide-chevron-down]:hidden"
                    )}
                  >
                    <span>{t(item.titleKey)}</span>
                    <div className="ml-4 flex-shrink-0 rounded-full border border-primary text-primary h-6 w-6 flex items-center justify-center group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground transition-colors duration-200">
                       <Plus className="h-4 w-4 block data-[state=open]:hidden" />
                       <Minus className="h-4 w-4 hidden data-[state=open]:block" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0 text-card-foreground opacity-90">
                    <p>{t(item.contentKey)}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
