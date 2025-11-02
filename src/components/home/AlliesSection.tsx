
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { AnimatedWavePath } from './AnimatedWavePath';

const ALLIES_LOGOS = [
  { id: '1', src: 'https://placehold.co/120x120/ffffff/06809F.png?text=Logo+1', alt: 'Ally Logo 1', aiHint: 'company logo' },
  { id: '2', src: 'https://placehold.co/120x120/ffffff/06809F.png?text=Logo+2', alt: 'Ally Logo 2', aiHint: 'company logo' },
  { id: '3', src: 'https://placehold.co/120x120/ffffff/06809F.png?text=Logo+3', alt: 'Ally Logo 3', aiHint: 'company logo' },
  { id: '4', src: 'https://placehold.co/120x120/ffffff/06809F.png?text=Logo+4', alt: 'Ally Logo 4', aiHint: 'company logo' },
  { id: '5', src: 'https://placehold.co/120x120/ffffff/06809F.png?text=Logo+5', alt: 'Ally Logo 5', aiHint: 'company logo' },
  { id: '6', src: 'https://placehold.co/120x120/ffffff/06809F.png?text=Logo+6', alt: 'Ally Logo 6', aiHint: 'company logo' },
  { id: '7', src: 'https://placehold.co/120x120/ffffff/06809F.png?text=Logo+7', alt: 'Ally Logo 7', aiHint: 'company logo' },
  { id: '8', src: 'https://placehold.co/120x120/ffffff/06809F.png?text=Logo+8', alt: 'Ally Logo 8', aiHint: 'company logo' },
  { id: '9', src: 'https://placehold.co/120x120/ffffff/06809F.png?text=Logo+9', alt: 'Ally Logo 9', aiHint: 'company logo' },
  { id: '10', src: 'https://placehold.co/120x120/ffffff/06809F.png?text=Logo+10', alt: 'Ally Logo 10', aiHint: 'company logo' },
];

const getLogosPerView = () => {
  if (typeof window === 'undefined') return 5; // Default for SSR or non-browser env
  if (window.innerWidth < 768) return 3; // Mobile
  if (window.innerWidth < 1024) return 5; // Tablet
  return 7; // Desktop
};

export function AlliesSection() {
  const { t } = useI18n();
  const [logosPerView, setLogosPerView] = useState(getLogosPerView());
  const [currentIndex, setCurrentIndex] = useState(0); // This is the logical page index
  const sliderRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);

  // Extend logos for smooth infinite looping. Add enough clones.
  const extendedLogos = useRef([...ALLIES_LOGOS, ...ALLIES_LOGOS.slice(0, logosPerView * 2)]).current;

  useEffect(() => {
    const handleResize = () => {
      setLogosPerView(getLogosPerView());
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Calculate number of logical pages based on original logos
    setNumPages(Math.ceil(ALLIES_LOGOS.length / logosPerView));
    setCurrentIndex(0); // Reset index when logosPerView or original logos change
  }, [logosPerView]);


  const slideTo = useCallback((visualPageIndex: number, duration: number = 0.5) => {
    if (sliderRef.current && extendedLogos.length > 0) {
      // Calculate itemWidth based on the total width of the slider track and the number of extended logos
      const itemWidth = sliderRef.current.scrollWidth / extendedLogos.length;
      const targetX = -visualPageIndex * itemWidth * logosPerView;
      gsap.to(sliderRef.current, { x: targetX, duration, ease: 'power3.inOut' });
    }
  }, [extendedLogos.length, logosPerView]);

  useEffect(() => {
    // This effect ensures that whenever currentIndex (logical page) changes,
    // we slide to that visual page. The infinite loop logic is handled in handleNext/handlePrev.
    slideTo(currentIndex);
  }, [currentIndex, slideTo]);


  const handleNext = () => {
    setCurrentIndex(prevLogicalIndex => {
      const newLogicalIndex = prevLogicalIndex + 1;

      if (newLogicalIndex >= numPages) { // We've reached the end of logical pages
        // Animate to the visual page that is the first cloned page
        slideTo(numPages, 0.5); 
        // After the animation, snap back to the actual beginning
        setTimeout(() => {
          if (sliderRef.current) {
            gsap.set(sliderRef.current, { x: 0 }); // Snap to actual beginning
          }
        }, 550); // GSAP animation duration is 0.5s (500ms) + small buffer
        return 0; // Reset logical index to the first page
      }
      // For other cases, just slide to the new logical index's visual representation
      slideTo(newLogicalIndex, 0.5);
      return newLogicalIndex;
    });
  };

  const handlePrev = () => {
     setCurrentIndex(prevLogicalIndex => {
      let newLogicalIndex = prevLogicalIndex - 1;

      if (newLogicalIndex < 0) { // If trying to go before the first logical page
        // 1. Snap to the visual position of the items that *look like* the last page,
        // but are actually at the beginning of the cloned items used for this transition.
        // This position is `numPages` visual pages before the current one (which is 0).
        // The x position for the "start of the cloned items that represent the end"
        if (sliderRef.current && extendedLogos.length > 0) {
            const itemWidth = sliderRef.current.scrollWidth / extendedLogos.length;
            // Snap to the visual start of the *cloned* set that matches the *original* items
            // This is effectively `numPages` visual slots.
            gsap.set(sliderRef.current, { x: -(numPages * itemWidth * logosPerView) });
        }
        
        // 2. The new logical index will be the actual last page.
        newLogicalIndex = numPages - 1;

        // 3. Animate from the snapped position to the actual last logical page's visual position.
        setTimeout(() => { 
            slideTo(newLogicalIndex, 0.5);
        }, 50); // Small delay to ensure snap is processed before animation

        return newLogicalIndex; // Update logical index to the last page
      }
      // For other cases, just slide to the new logical index's visual representation
      slideTo(newLogicalIndex, 0.5);
      return newLogicalIndex;
    });
  };
  
  const goToPage = (pageIndex: number) => {
    setCurrentIndex(pageIndex);
    slideTo(pageIndex, 0.5);
  };


  if (!ALLIES_LOGOS.length || numPages === 0) return null;

  return (
    <section id="allies-section" className="bg-primary text-primary-foreground py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('alliesSection.title')}
        </h2>
        <p className="text-lg opacity-90 mb-12 max-w-3xl mx-auto">
          {t('alliesSection.description')}
        </p>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 transform -translate-x-8 md:-translate-x-12 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground rounded-full w-10 h-10 md:w-12 md:h-12"
            aria-label={t('serParte.prevSlide')}
          >
            <ChevronLeft size={24} />
          </Button>

          <div className="overflow-hidden w-full max-w-5xl mx-auto">
            <div ref={sliderRef} className="flex">
              {extendedLogos.map((logo, index) => (
                <div key={`${logo.id}-ext-${index}`} className="flex-shrink-0 flex justify-center items-center p-2" style={{ width: `${100 / logosPerView}%` }}>
                  {/* This div is square and has rounded-full, making it circular */}
                  <div className="bg-background rounded-full p-3 md:p-4 shadow-md w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={80}
                      height={80}
                      className="object-contain"
                      data-ai-hint={logo.aiHint}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 transform translate-x-8 md:translate-x-12 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground rounded-full w-10 h-10 md:w-12 md:h-12"
            aria-label={t('serParte.nextSlide')}
          >
            <ChevronRight size={24} />
          </Button>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: numPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => goToPage(pageIndex)}
              className={cn(
                "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-colors",
                currentIndex === pageIndex ? "bg-primary-foreground" : "bg-primary-foreground/40 hover:bg-primary-foreground/70"
              )}
              aria-label={`Go to page ${pageIndex + 1}`}
            />
          ))}
        </div>

        <Button
          asChild
          variant="outline"
          className="mt-12 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors px-8 py-3 text-base font-semibold rounded-lg"
        >
          <Link href="/projects">{t('alliesSection.button')}</Link>
        </Button>
      </div>

      {/* Olas blancas animadas para transición */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0">
        {/* Ola completamente blanca - más abajo */}
        <AnimatedWavePath
          className="fill-white"
          opacity={1}
          waveHeight={35}
          speed={0.7}
          initialOffset={200}
          frequency={0.018}
        />
        {/* Ola semi-transparente - capa media */}
        <AnimatedWavePath
          className="fill-white"
          opacity={0.25}
          waveHeight={40}
          speed={0.9}
          initialOffset={100}
          frequency={0.025}
        />
        {/* Ola más transparente - más arriba */}
        <AnimatedWavePath
          className="fill-white"
          opacity={0.15}
          waveHeight={50}
          speed={1.2}
          initialOffset={0}
          frequency={0.02}
        />
      </div>
    </section>
  );
}
