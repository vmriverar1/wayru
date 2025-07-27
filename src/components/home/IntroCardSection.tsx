
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '@/hooks/useI18n';

gsap.registerPlugin(ScrollTrigger);

export function IntroCardSection() {
  const { t } = useI18n(); 
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // No pinning or complex scroll trigger needed here anymore.
    // This section will scroll naturally.
    // GSAP animations for content within this blue section can be added here if needed.
    // For now, it's just a colored background.
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    // This section provides the blue background.
    // It will scroll normally after the HeroSection.
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-primary flex flex-col items-center justify-center overflow-hidden py-0"
      // This section is 100vh tall and has a primary background color.
      // Content for this section would go inside the div below if any.
    >
      {/* 
        Content for the blue section can be added here if it's more than just a background.
        Example:
        <div className="text-center text-primary-foreground p-8">
          <h1 className="text-4xl font-bold">A Transitional Message</h1>
          <p>This blue section introduces what's next.</p>
        </div> 
      */}
    </section>
  );
}

