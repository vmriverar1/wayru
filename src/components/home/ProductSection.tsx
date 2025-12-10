
"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '@/hooks/useI18n';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !imageContainerRef.current || !textContentRef.current) return;

    const isMobileView = window.innerWidth < 768;

    if (isMobileView) {
      // ========== MOBILE LAYOUT ==========
      const textItems = gsap.utils.toArray<HTMLElement>('.product-item-card');
      if (textItems.length === 0) return;

      const imageInner = imageContainerRef.current.querySelector('.image-scale-container') as HTMLElement;
      if (!imageInner) return;

      // Set initial scale for mobile
      gsap.set(imageInner, { scale: 0.7 });

      // Mobile distances
      const imageScaleUpDistance = window.innerHeight * 0.4;
      const readingTimeDistance = window.innerHeight * 0.5;
      const initialPinDistance = imageScaleUpDistance + readingTimeDistance;
      // Each text item takes 60% of viewport height in mobile
      const perItemDistance = window.innerHeight * 0.6;
      const totalScrollDistance = initialPinDistance + (textItems.length * perItemDistance);

      // Timeline for image scale animation
      const scaleTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScrollDistance}`,
          scrub: 1,
        }
      });

      const scaleUpProportion = imageScaleUpDistance / totalScrollDistance;
      const readingProportion = readingTimeDistance / totalScrollDistance;
      const remainingProportion = 1 - scaleUpProportion - readingProportion;

      // Scale up the image
      scaleTimeline.to(imageInner, {
        scale: 1,
        ease: 'power2.out',
        duration: scaleUpProportion,
      });

      // Stay at full scale
      scaleTimeline.to(imageInner, {
        scale: 1,
        duration: readingProportion + remainingProportion * 0.8,
      });

      // Scale down at the end
      scaleTimeline.to(imageInner, {
        scale: 0.7,
        ease: 'power2.in',
        duration: remainingProportion * 0.2,
      });

      // Pin image container for the entire section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalScrollDistance}`,
        pin: imageContainerRef.current,
        pinSpacing: false,
      });

      // Pin text container during initial phase
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${initialPinDistance}`,
        pin: textContentRef.current,
        pinSpacing: false,
      });

      // Track image changes based on scroll progress after initial phase
      const contentScrollDistance = totalScrollDistance - initialPinDistance;
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: () => `top+=${initialPinDistance} top`,
        end: () => `+=${contentScrollDistance}`,
        onUpdate: (self) => {
          const progress = self.progress;
          const itemIndex = Math.min(
            Math.floor(progress * textItems.length),
            textItems.length - 1
          );
          const item = productItems[itemIndex];
          if (item) {
            setActiveImage(item.imgSrc);
          }
        },
      });

      // Animate text items
      textItems.forEach((itemCard) => {
        gsap.fromTo(itemCard.querySelector('.product-card-anim'),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.5,
            scrollTrigger: {
              trigger: itemCard,
              start: 'top bottom-=100px',
              end: 'center center',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

    } else {
      // ========== DESKTOP LAYOUT ==========
      const textItems = gsap.utils.toArray<HTMLElement>('.product-item-card');
      if (textItems.length === 0) return;

      const imageInner = imageContainerRef.current.querySelector('.image-scale-container') as HTMLElement;
      if (!imageInner) return;

      // Set initial scale
      gsap.set(imageInner, { scale: 0.6 });

      const imageScaleUpDistance = window.innerHeight * 0.5;
      const readingTimeDistance = window.innerHeight * 0.7;
      const initialPinDistance = imageScaleUpDistance + readingTimeDistance;
      const totalScrollDistance = (textItems.length) * window.innerHeight - window.innerHeight / 2 + initialPinDistance;

      const scaleTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScrollDistance}`,
          scrub: 1,
        }
      });

      const scaleUpProportion = imageScaleUpDistance / totalScrollDistance;
      const readingProportion = readingTimeDistance / totalScrollDistance;
      const remainingProportion = 1 - scaleUpProportion - readingProportion;

      scaleTimeline.to(imageInner, {
        scale: 1,
        ease: 'power2.out',
        duration: scaleUpProportion,
      });

      scaleTimeline.to(imageInner, {
        scale: 1,
        duration: readingProportion + remainingProportion * 0.7,
      });

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

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${initialPinDistance}`,
        pin: textContentRef.current,
        pinSpacing: false,
      });

      const contentScrollDistance = totalScrollDistance - initialPinDistance;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: () => `top+=${initialPinDistance} top`,
        end: () => `+=${contentScrollDistance}`,
        onUpdate: (self) => {
          const progress = self.progress;
          const itemIndex = Math.min(
            Math.floor(progress * textItems.length),
            textItems.length - 1
          );
          const item = productItems[itemIndex];
          if (item) {
            setActiveImage(item.imgSrc);
          }
        },
      });

      textItems.forEach((itemCard) => {
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
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [t, isMobile]);

  return (
    <div ref={sectionRef} className="bg-background text-foreground overflow-hidden">
      {/* Mobile: vertical layout (image top, text bottom) */}
      {/* Desktop: horizontal layout (image left, text right) */}
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div
          ref={imageContainerRef}
          className={cn(
            "w-full overflow-hidden",
            // Mobile: fixed at top, 40% height with top padding for header
            "h-[40vh] pt-16",
            // Desktop: half width, full height, sticky
            "md:w-1/2 md:h-screen md:pt-0 md:sticky md:top-0 md:flex md:items-center md:justify-center"
          )}
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

        {/* Text Section */}
        <div
          ref={textContentRef}
          className={cn(
            "w-full px-4 sm:px-6 lg:px-8",
            // Mobile: below image, 60% viewport height per item
            "md:w-1/2"
          )}
        >
          {productItems.map((item) => (
            <div
              key={item.id}
              id={`${item.id}-trigger`}
              className={cn(
                "flex flex-col items-center justify-center product-item-card",
                // Mobile: 60vh height, centered
                "min-h-[60vh] py-8",
                // Desktop: full screen height
                "md:min-h-screen md:py-0"
              )}
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
