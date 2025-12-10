
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, MapPin } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { Card, CardContent } from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

export function PhrasesSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client before running animations
  useEffect(() => {
    setIsClient(true);
  }, []);

  const phrasesData = [
    {
      textKey: 'phrases.phrase1',
      icon: <Users size={48} className="text-background mb-4" aria-label={t('phrases.phrase1_icon_alt')} />,
    },
    {
      textKey: 'phrases.phrase2',
      icon: <MapPin size={48} className="text-background mb-4" aria-label={t('phrases.phrase2_icon_alt')} />,
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !isClient) return;

    // Ensure GSAP animations run after Hero's intro card is likely done.
    // This section starts when its top hits the center of the viewport.
    // The Hero's intro card animation duration and disappearance should be considered.
    // Current setup relies on natural flow. If HeroSection's total scrollable length changes,
    // this section's start trigger might need adjustment if strict sequential animation is desired.

    // Small delay to ensure DOM is ready, especially on mobile
    const initTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: 'top top', // Start pinning when the top of this section reaches the top of viewport
        end: () => `+=${phraseRefs.current.length * window.innerHeight * 0.7}`, // Adjusted end for smoother transition
        // markers: true,
      },
    });

    phraseRefs.current.forEach((phraseEl, index) => {
      if (!phraseEl) return;

      // Phrase appears - added delay to first phrase to give time for previous section
      const delayOffset = 0.15; // Add 15% delay to all animations
      timeline.fromTo(
        phraseEl,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.4 }, // Increased duration for smoother appearance
        (index * 1) + delayOffset // Stagger start times with initial delay
      );

      // Phrase disappears (except for the last one, which stays until pin ends)
      if (index < phraseRefs.current.length - 1) {
        timeline.to(
          phraseEl,
          { opacity: 0, y: -100, duration: 0.4 }, // Increased duration for smoother disappearance
          (index * 1) + delayOffset + 0.6 // Start disappearing before the next one is fully visible
        );
      }
    });
    
    // Ensure the last phrase remains visible until the pin duration ends.
    // GSAP automatically handles this by not animating it out if it's the last in the sequence before pin ends.

    return () => {
      clearTimeout(initTimeout);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
      timeline.kill();
    };
  }, [t, isClient]);

  return (
    <section 
      ref={sectionRef} 
      className="bg-primary text-background min-h-screen flex flex-col items-center justify-center p-0 overflow-hidden relative"
      // This section provides the primary colored background after hero.
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative h-screen flex items-center justify-center">
        {phrasesData.map((phrase, index) => (
          <div
            key={index}
            ref={(el) => (phraseRefs.current[index] = el)}
            // className="absolute inset-0 flex flex-col items-center justify-center opacity-0" 
            // Positioned by GSAP, initial opacity 0 set in GSAP
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0 }}
          >
            <Card className="bg-transparent border-none shadow-none max-w-2xl">
              <CardContent className="flex flex-col items-center p-6">
                {phrase.icon}
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-white">
                  {t(phrase.textKey)}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
