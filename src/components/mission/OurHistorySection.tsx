
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useI18n } from '@/hooks/useI18n';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const historyData = [
  { id: '2009', monthYearLabel: 'SEP. 2009', year: '2009', imageSrc: 'https://placehold.co/600x400.png', description: 'Our journey began with a focus on local community water needs. We identified key areas where access to clean water was a critical challenge and started formulating strategies to address these issues with sustainable solutions.', aiHint: 'foundation beginning' },
  { id: '2010', monthYearLabel: 'JAN. 2010', year: '2010', imageSrc: 'https://placehold.co/600x400.png', description: 'Launched our first major water purification project in a rural area, successfully providing clean drinking water to over 500 families. This project involved community training and empowerment.', aiHint: 'early project' },
  { id: '2011', monthYearLabel: 'DEC. 2011', year: '2011', imageSrc: 'https://placehold.co/600x400.png', description: 'Expanded operations and developed new atmospheric water generation technology. This innovation allowed us to deploy solutions in even more remote and arid regions previously considered inaccessible.', aiHint: 'milestone achieved' },
  { id: '2012', monthYearLabel: 'SEP. 2012', year: '2012', imageSrc: 'https://placehold.co/600x400.png', description: 'Partnered with international NGOs to broaden our impact, enabling us to reach more communities and leverage global expertise in water management and sanitation.', aiHint: 'expansion growth' },
  { id: '2013', monthYearLabel: 'OCT. 2013', year: '2013', imageSrc: 'https://placehold.co/600x400.png', description: 'Reached 10,000 individuals with sustainable water solutions, marking a significant milestone in our mission to combat water scarcity and improve public health.', aiHint: 'community impact' },
  { id: '2014', monthYearLabel: 'JUL. 2014', year: '2014', imageSrc: 'https://placehold.co/600x400.png', description: 'Introduced educational programs on water conservation, hygiene, and sanitation, empowering communities with the knowledge to maintain and manage their water resources effectively.', aiHint: 'education program' },
  { id: '2015', monthYearLabel: 'MAY 2015', year: '2015', imageSrc: 'https://placehold.co/600x400.png', description: 'Awarded for innovation in water technology and our sustainable community-centric approach at the Global Water Summit. This recognition helped to further our cause on an international stage.', aiHint: 'award ceremony' },
];

const uniqueYears = Array.from(new Set(historyData.map(item => item.year))).sort();

export function OurHistorySection() {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(Math.floor(historyData.length / 2));
  const imageStripRef = useRef<HTMLDivElement>(null);
  const imageItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    imageItemRefs.current = imageItemRefs.current.slice(0, historyData.length);
  }, []);
  
  useEffect(() => {
    if (imageStripRef.current && imageItemRefs.current[activeIndex]) {
      const activeItem = imageItemRefs.current[activeIndex];
      if (activeItem) {
        const stripContainer = imageStripRef.current;
        const targetScroll = activeItem.offsetLeft - (stripContainer.offsetWidth / 2) + (activeItem.offsetWidth / 2);
        
        gsap.to(stripContainer, {
          scrollTo: { x: targetScroll, autoKill: false },
          duration: 0.7,
          ease: 'power3.inOut',
        });
      }
    }

    // Animate description change
    if (descriptionRef.current) {
      gsap.to(descriptionRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          if (descriptionRef.current) { // Check again in case component unmounted
            descriptionRef.current.textContent = historyData[activeIndex]?.description || '';
            gsap.to(descriptionRef.current, {
              opacity: 1,
              duration: 0.3,
              delay: 0.1
            });
          }
        }
      });
    }

  }, [activeIndex]);

  const handleYearClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleDirectYearNavClick = (year: string) => {
    const firstIndexForYear = historyData.findIndex(item => item.year === year);
    if (firstIndexForYear !== -1) {
        setActiveIndex(firstIndexForYear);
    }
  };


  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16">
          {t('pages.ourMission.historyTitle')}
        </h2>
      </div>

      {/* Image Slider */}
      <div className="relative w-full overflow-hidden mb-10" ref={imageStripRef}>
        <div className="flex transition-transform duration-500 ease-in-out items-start px-[calc(50vw-160px)] md:px-[calc(50vw-200px)]"> {/* Centering trick, adjust item width */}
          {historyData.map((item, index) => (
            <div
              key={item.id}
              ref={el => imageItemRefs.current[index] = el}
              className={cn(
                "flex-shrink-0 w-[280px] md:w-[320px] lg:w-[400px] mx-2 md:mx-4 transition-all duration-500 ease-in-out text-center group",
                activeIndex === index ? "opacity-100 scale-100" : "opacity-40 scale-90 hover:opacity-60"
              )}
              onClick={() => handleYearClick(index)}
              style={{ cursor: 'pointer' }}
            >
              <p className={cn(
                  "text-sm font-semibold mb-2",
                  activeIndex === index ? "text-background" : "text-primary-foreground/70"
              )}>
                {item.monthYearLabel}
              </p>
              <div className="relative aspect-[3/2] rounded-md overflow-hidden shadow-lg">
                <Image
                  src={item.imageSrc}
                  alt={`${t('pages.ourMission.historyTitle')} - ${item.monthYearLabel}`}
                  fill
                  className="object-cover"
                  data-ai-hint={item.aiHint}
                  priority={index <= 2} // Prioritize loading first few images
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Year Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex justify-center items-center space-x-2 md:space-x-4 flex-wrap">
          {uniqueYears.map((year) => {
            const isActiveYear = historyData[activeIndex]?.year === year;
            return (
              <button
                key={year}
                onClick={() => handleDirectYearNavClick(year)}
                className={cn(
                  "px-2 py-1 text-xs md:text-sm font-medium transition-colors rounded hover:text-background",
                  isActiveYear ? "text-background font-bold scale-110" : "text-primary-foreground/70"
                )}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>

      {/* Description Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p 
            ref={descriptionRef}
            className="text-base md:text-lg text-primary-foreground/90 leading-relaxed min-h-[6em]" // min-h to reduce layout shift
          >
            {historyData[activeIndex]?.description}
          </p>
        </div>
      </div>
    </section>
  );
}
