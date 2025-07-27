
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useI18n } from '@/hooks/useI18n';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ALLIES_DATA = [
  { id: '1', nameKey: 'pages.projects.ally1', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+1', aiHint: 'company logo' },
  { id: '2', nameKey: 'pages.projects.ally2', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+2', aiHint: 'company logo' },
  { id: '3', nameKey: 'pages.projects.ally3', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+3', aiHint: 'company logo' },
  { id: '4', nameKey: 'pages.projects.ally4', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+4', aiHint: 'company logo' },
  { id: '5', nameKey: 'pages.projects.ally5', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+5', aiHint: 'company logo' },
  { id: '6', nameKey: 'pages.projects.ally6', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+6', aiHint: 'company logo' },
  { id: '7', nameKey: 'pages.projects.ally7', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+7', aiHint: 'company logo' },
  { id: '8', nameKey: 'pages.projects.ally8', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+8', aiHint: 'company logo' },
  { id: '9', nameKey: 'pages.projects.ally9', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+9', aiHint: 'company logo' },
  { id: '10', nameKey: 'pages.projects.ally10', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+10', aiHint: 'company logo' },
  { id: '11', nameKey: 'pages.projects.ally11', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+11', aiHint: 'company logo' },
  { id: '12', nameKey: 'pages.projects.ally12', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+12', aiHint: 'company logo' },
  { id: '13', nameKey: 'pages.projects.ally13', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+13', aiHint: 'company logo' },
  { id: '14', nameKey: 'pages.projects.ally14', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+14', aiHint: 'company logo' },
  { id: '15', nameKey: 'pages.projects.ally15', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+15', aiHint: 'company logo' },
  { id: '16', nameKey: 'pages.projects.ally16', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+16', aiHint: 'company logo' },
  { id: '17', nameKey: 'pages.projects.ally17', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+17', aiHint: 'company logo' },
  { id: '18', nameKey: 'pages.projects.ally18', logoSrc: 'https://placehold.co/100x100/ffffff/06809F.png?text=Logo+18', aiHint: 'company logo' },
];

const ITEMS_PER_PAGE_DESKTOP = 10; // 2 rows * 5 columns
const ITEMS_PER_PAGE_MOBILE = 4;   // 2 rows * 2 columns
const COLS_DESKTOP = 5;
const COLS_MOBILE = 2;
const AUTOPLAY_INTERVAL = 5000; // 5 seconds

export function AlliesCarousel() {
  const { t } = useI18n();
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_DESKTOP);
  const [numCols, setNumCols] = useState(COLS_DESKTOP);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const calculateLayout = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(ITEMS_PER_PAGE_MOBILE);
        setNumCols(COLS_MOBILE);
      } else {
        setItemsPerPage(ITEMS_PER_PAGE_DESKTOP);
        setNumCols(COLS_DESKTOP);
      }
    };
    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(ALLIES_DATA.length / itemsPerPage));
    setCurrentPage(0); 
  }, [itemsPerPage]);
  
  useEffect(() => {
    if (carouselTrackRef.current && totalPages > 0) {
      gsap.to(carouselTrackRef.current, {
        x: `-${currentPage * 100}%`,
        duration: 0.7,
        ease: 'power3.inOut',
      });
    }
  }, [currentPage, itemsPerPage, totalPages]);

  const handleNext = useCallback(() => {
    if (totalPages > 0) {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    if (totalPages > 0) {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    }
  }, [totalPages]);

  const startAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    autoplayIntervalRef.current = setInterval(() => {
      if (!isHoveringRef.current) {
        handleNext();
      }
    }, AUTOPLAY_INTERVAL);
  }, [handleNext]);

  useEffect(() => {
    if (totalPages > 1) {
      startAutoplay();
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [totalPages, startAutoplay]);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
  };
  
  const renderPage = (pageIndex: number) => {
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = ALLIES_DATA.slice(startIndex, endIndex);

    return (
      <div
        key={`page-${pageIndex}`}
        className="flex-shrink-0 w-full h-full grid gap-4 p-2"
        style={{
          gridTemplateColumns: `repeat(${numCols}, 1fr)`,
          gridTemplateRows: 'repeat(2, 1fr)',
        }}
      >
        {pageItems.map((ally) => (
          <div key={`${ally.id}-item`} className="flip-card h-full w-full">
            <div className="flip-card-inner bg-card rounded-full shadow-lg">
              <div className="flip-card-front">
                <Image
                  src={ally.logoSrc}
                  alt={t(ally.nameKey)}
                  width={80}
                  height={80}
                  className="object-contain"
                  data-ai-hint={ally.aiHint}
                />
              </div>
              <div className="flip-card-back bg-card rounded-full">
                <span className="text-xs font-semibold text-center text-primary p-2">{t(ally.nameKey)}</span>
              </div>
            </div>
          </div>
        ))}
        {pageIndex === totalPages - 1 && pageItems.length < itemsPerPage &&
         Array(itemsPerPage - pageItems.length).fill(null).map((_, i) => (
            <div key={`empty-${i}`} className="h-full w-full rounded-full bg-transparent"></div>
         ))
        }
      </div>
    );
  };
  
  if (totalPages === 0) return null;

  return (
    <div 
      ref={carouselWrapperRef}
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {totalPages > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={() => { handlePrev(); startAutoplay(); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 transform -translate-x-8 md:-translate-x-12 bg-background/50 hover:bg-accent text-foreground rounded-full w-10 h-10 md:w-12 md:h-12 border-primary hover:border-accent"
            aria-label="Previous allies"
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => { handleNext(); startAutoplay(); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 transform translate-x-8 md:translate-x-12 bg-background/50 hover:bg-accent text-foreground rounded-full w-10 h-10 md:w-12 md:h-12 border-primary hover:border-accent"
            aria-label="Next allies"
          >
            <ChevronRight size={24} />
          </Button>
        </>
      )}
      <div className="overflow-hidden rounded-lg">
        <div ref={carouselTrackRef} className="flex h-[280px] md:h-[320px]">
          {Array.from({ length: totalPages }).map((_, i) => renderPage(i))}
        </div>
      </div>
    </div>
  );
}

    