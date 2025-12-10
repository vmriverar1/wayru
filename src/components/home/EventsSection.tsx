
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
    imgSrc: '/images/events/event1.jpg',
    imgAlt: 'Water for All Workshop',
    aiHint: 'community workshop'
  },
  {
    id: 'event2',
    titleKey: 'eventsSection.event2_title',
    descriptionKey: 'eventsSection.event2_description',
    imgSrc: '/images/events/event2.jpg',
    imgAlt: 'AquaRun Charity Event',
    aiHint: 'charity run'
  },
  {
    id: 'event3',
    titleKey: 'eventsSection.event3_title',
    descriptionKey: 'eventsSection.event3_description',
    imgSrc: '/images/events/event3.jpg',
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

    const imageInner = imageContainerRef.current.querySelector('.image-scale-container') as HTMLElement;
    if (!imageInner) return;

    // Set initial scale
    gsap.set(imageInner, { scale: 0.6 });

    // Extra scroll distance for the initial phase:
    // - Image scale-up: 0.5 viewport height
    // - Reading time (image big + first text visible): 0.7 viewport height
    const imageScaleUpDistance = window.innerHeight * 0.5;
    const readingTimeDistance = window.innerHeight * 0.7;
    const initialPinDistance = imageScaleUpDistance + readingTimeDistance;
    const totalScrollDistance = (textItems.length) * window.innerHeight - window.innerHeight / 2 + initialPinDistance;

    // Create a single timeline for the entire scale animation
    const scaleTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalScrollDistance}`,
        scrub: 1,
      }
    });

    // Calculate proportions based on distances
    const scaleUpProportion = imageScaleUpDistance / totalScrollDistance;
    const readingProportion = readingTimeDistance / totalScrollDistance;
    const remainingProportion = 1 - scaleUpProportion - readingProportion;

    // Scale up at the beginning - image grows while first text stays visible
    scaleTimeline.to(imageInner, {
      scale: 1,
      ease: 'power2.out',
      duration: scaleUpProportion,
    });

    // Stay at full scale during reading time + most of content scrolling
    scaleTimeline.to(imageInner, {
      scale: 1,
      duration: readingProportion + remainingProportion * 0.7,
    });

    // Scale down at the end
    scaleTimeline.to(imageInner, {
      scale: 0.6,
      ease: 'power2.in',
      duration: remainingProportion * 0.3,
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${totalScrollDistance}`,
      pin: imageContainerRef.current,
      pinSpacing: true,
    });

    // Pin the entire text container during the initial phase (image scale-up + reading time)
    // This prevents ALL texts from scrolling until the image is fully scaled and user has time to read
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${initialPinDistance}`,
      pin: textContentRef.current,
      pinSpacing: false,
    });

    // Calculate scroll distance for content phase (after initial pin)
    const contentScrollDistance = totalScrollDistance - initialPinDistance;
    const scrollPerItem = contentScrollDistance / textItems.length;

    // Create a ScrollTrigger to track image changes based on scroll progress after initial phase
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: () => `top+=${initialPinDistance} top`,
      end: () => `+=${contentScrollDistance}`,
      onUpdate: (self) => {
        // Calculate which item should be active based on scroll progress
        const progress = self.progress;
        const itemIndex = Math.min(
          Math.floor(progress * textItems.length),
          textItems.length - 1
        );
        const item = eventItems[itemIndex];
        if (item) {
          setActiveImage(item.imgSrc);
        }
      },
    });

    textItems.forEach((itemCard) => {
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
    <div ref={sectionRef} className="bg-background text-foreground overflow-hidden">
      <div className="flex">
        {/* Text Section - Left Half */}
        <div ref={textContentRef} className="w-full md:w-1/2 space-y-0 px-4 sm:px-6 lg:px-8">
          {eventItems.map((item) => (
            <div
              key={item.id}
              id={`${item.id}-trigger-event`}
              className="min-h-screen flex flex-col items-center justify-center event-item-card py-12 md:py-0"
            >
              <div className="event-card-anim w-full max-w-lg mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  {t(item.titleKey)}
                </h3>
                <p className="text-foreground text-base md:text-lg leading-relaxed">
                  {t(item.descriptionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Section - Right Half */}
        <div
          ref={imageContainerRef}
          className="w-full md:w-1/2 h-screen md:sticky top-0 flex items-center justify-center overflow-hidden"
        >
          <div className="image-scale-container relative w-full h-full"> 
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
  );
}
