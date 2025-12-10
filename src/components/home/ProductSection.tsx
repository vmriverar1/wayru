
"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '@/hooks/useI18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const productItems = [
  {
    id: 'item1',
    titleKey: 'productSection.item1_title',
    descriptionKey: 'productSection.item1_description',
    imgSrc: '/images/products/product1.jpg',
    imgAlt: 'Atmospheric Water Generator',
    aiHint: 'water generator'
  },
  {
    id: 'item2',
    titleKey: 'productSection.item2_title',
    descriptionKey: 'productSection.item2_description',
    imgSrc: '/images/products/product2.jpg',
    imgAlt: 'Smart Water Filtration System',
    aiHint: 'water filter'
  },
  {
    id: 'item3',
    titleKey: 'productSection.item3_title',
    descriptionKey: 'productSection.item3_description',
    imgSrc: '/images/products/product3.jpg',
    imgAlt: 'Water Conservation Kit',
    aiHint: 'water saving'
  },
];

export function ProductSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(productItems[0].imgSrc);

  useEffect(() => {
    if (!sectionRef.current || !imageContainerRef.current || !textContentRef.current) return;

    const textItems = gsap.utils.toArray<HTMLElement>('.product-item-card');
    if (textItems.length === 0) return;

    const imageInner = imageContainerRef.current.querySelector('.image-scale-container') as HTMLElement;
    if (!imageInner) return;

    // Set initial scale
    gsap.set(imageInner, { scale: 0.6 });

    // Extra scroll distance for the initial image scale-up phase where text stays pinned
    const initialPinDistance = window.innerHeight * 0.5;
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

    // Scale up at the beginning (15% of timeline) - image grows while first text stays visible
    scaleTimeline.to(imageInner, {
      scale: 1,
      ease: 'power2.out',
      duration: 0.15,
    });

    // Stay at full scale (60% of timeline)
    scaleTimeline.to(imageInner, {
      scale: 1,
      duration: 0.6,
    });

    // Scale down at the end (25% of timeline)
    scaleTimeline.to(imageInner, {
      scale: 0.6,
      ease: 'power2.in',
      duration: 0.25,
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${totalScrollDistance}`,
      pin: imageContainerRef.current,
      pinSpacing: true,
    });

    // Pin the first text item during the initial image scale-up phase
    const firstTextItem = textItems[0];
    if (firstTextItem) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${initialPinDistance}`,
        pin: firstTextItem,
        pinSpacing: false,
      });
    }

    textItems.forEach((itemCard, index) => {
      const item = productItems.find(p => `${p.id}-trigger` === itemCard.id);
      if (item) {
        ScrollTrigger.create({
          trigger: itemCard,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveImage(item.imgSrc),
          onEnterBack: () => setActiveImage(item.imgSrc),
        });
      }

      gsap.fromTo(itemCard.querySelector('.product-card-anim'),
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: {
            trigger: itemCard,
            start: 'top bottom-=200px',
            end: 'center center',
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
        {/* Image Section - Left Half */}
        <div
          ref={imageContainerRef}
          className="w-full md:w-1/2 h-screen md:sticky top-0 flex items-center justify-center overflow-hidden"
        >
          <div className="image-scale-container relative w-full h-full">
              {productItems.map((item) => (
                <Image
                  key={item.imgSrc}
                  src={item.imgSrc}
                  alt={t(item.titleKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={cn(
                    'object-cover transition-opacity duration-700 ease-in-out',
                    activeImage === item.imgSrc ? 'opacity-100' : 'opacity-0'
                  )}
                  priority={item.id === 'item1'} 
                  data-ai-hint={item.aiHint}
                />
              ))}
          </div>
        </div>

        {/* Text Section - Right Half */}
        <div ref={textContentRef} className="w-full md:w-1/2 space-y-0 px-4 sm:px-6 lg:px-8">
            {productItems.map((item) => (
              <div
                key={item.id}
                id={`${item.id}-trigger`}
                className="min-h-screen flex flex-col items-center justify-center product-item-card py-12 md:py-0"
              >
                <div className="product-card-anim w-full max-w-lg mx-auto">
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
      </div>
    </div>
  );
}
