
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useI18n } from '@/hooks/useI18n';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

interface Testimonial {
  id: string;
  quoteKey: string;
  authorKey: string;
  authorImageSrc: string; 
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderTrackRef.current && viewportRef.current) {
      const itemWidth = viewportRef.current.offsetWidth;
      gsap.to(sliderTrackRef.current, {
        x: -activeIndex * itemWidth,
        duration: 0.5,
        ease: 'power3.inOut',
      });
    }
  }, [activeIndex, testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  
  const cardMinHeight = 'min-h-[260px] md:min-h-[300px]'; 

  return (
    <div className="relative w-full py-8 md:py-12">
      <div ref={viewportRef} className="overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto rounded-lg">
        <div ref={sliderTrackRef} className="flex">
          {testimonials.map((testimonial) => {
            const authorName = t(testimonial.authorKey);
            const initials = authorName
              .split(' ')
              .map(name => name[0])
              .slice(0, 2)
              .join('')
              .toUpperCase();

            return (
              <div key={testimonial.id} className="flex-shrink-0 w-full">
                <div className="px-1 h-full"> 
                  <Card className={cn("bg-card text-card-foreground shadow-xl rounded-lg overflow-hidden h-full flex flex-col", cardMinHeight)}>
                    <CardContent className="p-4 md:p-6 flex-grow flex flex-col justify-center items-center">
                      <blockquote className="text-center w-full mb-3">
                        <p className="text-sm md:text-base italic text-muted-foreground mb-2">
                          "{t(testimonial.quoteKey)}"
                        </p>
                        <footer className="text-xs md:text-sm font-semibold text-primary">
                          - {authorName}
                        </footer>
                      </blockquote>
                      <div className="mt-auto flex justify-center">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={testimonial.authorImageSrc} alt={authorName} data-ai-hint="person portrait" />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {testimonials.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6 md:mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ease-in-out",
                activeIndex === index ? "bg-primary scale-125" : "bg-muted hover:bg-primary/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

