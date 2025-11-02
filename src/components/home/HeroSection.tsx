
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedWavePath } from './AnimatedWavePath';
import { useI18n } from '@/hooks/useI18n';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { t } = useI18n();
  const heroRef = useRef<HTMLDivElement>(null);
  const wavesContainerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const introCardRef = useRef<HTMLDivElement>(null); 
  
  const waveSecondaryRef = useRef<HTMLDivElement>(null);
  const waveAccentRef = useRef<HTMLDivElement>(null);
  const wavePrimaryRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (!heroRef.current || !wavesContainerRef.current || !heroContentRef.current || !introCardRef.current || !waveSecondaryRef.current || !waveAccentRef.current || !wavePrimaryRef.current) return;

    gsap.fromTo(
      heroContentRef.current.querySelectorAll('.hero-text-animate > *'), 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.3, delay: 0.5, ease: 'power3.out' }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top', 
        end: '+=150%', 
        scrub: 1,
      },
    });

    const startTime = "start"; 

    tl.to(heroContentRef.current.querySelectorAll('.hero-text-animate > *'), {
      opacity: 0,
      duration: 0.2, 
      ease: 'power1.in',
    }, startTime); 

    // Intro Card Animation
    // Phase 3.1: Card appears (duration 0.12 of timeline progression, from ~10% to ~12%)
    tl.fromTo(introCardRef.current,
      { opacity: 0, top: '110vh', yPercent: -50 },
      {
        opacity: 1,
        top: '45vh',
        yPercent: -50,
        duration: 0.12,
        ease: 'power2.out',
      },
      startTime
    );

    // Phase 3.2: Card moves up and fades out.
    // Starts disappearing after being fully visible for a short period.
    // Appearance duration is 0.12. Let it stay visible until 0.14 timeline progress.
    // So, disappearance starts at timeline progress 0.14.
    // Duration of disappearance is 0.01 of timeline progress (ends at 0.15).
    const cardDisappearStartProgress = 0.14;
    const cardDisappearDuration = 0.01;

    tl.to(introCardRef.current,
      { 
        opacity: 0, 
        top: '-20vh', 
        yPercent: -50,
        duration: cardDisappearDuration, 
        ease: 'power2.in', 
      },
      `${startTime}+=${cardDisappearStartProgress}` 
    );
    
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }

  }, [t]);

  return (
    <section ref={heroRef} id="hero-section" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden p-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        poster="https://picsum.photos/1920/1080?grayscale&blur=2"
        data-ai-hint="ocean waves"
      >
        <source src="https://video-previews.elements.envatousercontent.com/4dd5f940-e661-43dc-b4f4-d6460806a7fc/watermarked_preview/watermarked_preview.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[5]"></div>

      <div ref={heroContentRef} className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-24 text-left w-full h-full flex flex-col justify-center items-start hero-text-animate">
        <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-primary-foreground drop-shadow-lg leading-tight">
            Wayru Perú
          </h1>
          <p className="text-3xl sm:text-4xl font-semibold mt-3 text-background/90 drop-shadow-sm">
            soluciones innovadoras
          </p>
        </div>
      </div>

      <Card 
        ref={introCardRef} 
        className={cn(
          "fixed left-1/2 -translate-x-1/2", 
          "bg-background text-foreground p-6 md:p-10 rounded-xl shadow-2xl",
          "w-[90%] max-w-xl md:max-w-2xl",
          "text-center z-[25]", 
          "opacity-0" 
        )}
      >
        <CardContent className="p-0">
          <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4 md:mb-6 leading-snug">
            {t('introCard.question')}
          </h2>
          <p className="text-sm md:text-base text-foreground leading-relaxed">
            {t('introCard.statement')}
          </p>
        </CardContent>
      </Card>

      <div 
        ref={wavesContainerRef} 
        className="absolute bottom-0 left-0 w-full z-20 pointer-events-none" 
        style={{ height: '250px' }} 
      >
        <div ref={waveSecondaryRef}>
          <AnimatedWavePath className="fill-secondary" opacity={0.5} waveHeight={100} speed={0.7} initialOffset={40} frequency={0.010} />
        </div>
        <div ref={waveAccentRef}>
          <AnimatedWavePath className="fill-accent" opacity={0.7} waveHeight={80} speed={1} initialOffset={20} frequency={0.012} />
        </div>
        <div ref={wavePrimaryRef}> 
          <AnimatedWavePath className="fill-primary" opacity={1} waveHeight={60} speed={1.2} initialOffset={0} frequency={0.015} />
        </div>
      </div>
    </section>
  );
}
