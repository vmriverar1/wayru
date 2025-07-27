
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
    imgSrc: 'https://picsum.photos/seed/product1/800/1000',
    imgAlt: 'Atmospheric Water Generator',
    aiHint: 'water generator'
  },
  {
    id: 'item2',
    titleKey: 'productSection.item2_title',
    descriptionKey: 'productSection.item2_description',
    imgSrc: 'https://picsum.photos/seed/product2/800/1000',
    imgAlt: 'Smart Water Filtration System',
    aiHint: 'water filter'
  },
  {
    id: 'item3',
    titleKey: 'productSection.item3_title',
    descriptionKey: 'productSection.item3_description',
    imgSrc: 'https://picsum.photos/seed/product3/800/1000',
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

    ScrollTrigger.create({
      trigger: sectionRef.current, 
      start: 'top top', 
      end: () => `+=${(textItems.length) * window.innerHeight - window.innerHeight / 2}`,
      pin: imageContainerRef.current,
      pinSpacing: true, 
    });

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
    <section ref={sectionRef} className="bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title removed from here */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div 
            ref={imageContainerRef} 
            className="h-screen md:sticky top-20 flex items-start justify-center" 
          >
            <div className="relative w-full aspect-[4/5] max-w-md md:max-w-none md:aspect-auto md:h-[70vh] rounded-lg overflow-hidden shadow-2xl">
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

          <div ref={textContentRef} className="space-y-0">
            {productItems.map((item) => (
              <div 
                key={item.id} 
                id={`${item.id}-trigger`} 
                className="min-h-screen flex flex-col items-center justify-center product-item-card py-12 md:py-0"
              >
                <div className="product-card-anim w-full">
                  <Card className="shadow-lg bg-background w-full max-w-lg mx-auto">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary">{t(item.titleKey)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {t(item.descriptionKey)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
