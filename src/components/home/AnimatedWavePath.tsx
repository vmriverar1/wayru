
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedWavePathProps {
  className?: string;
  opacity?: number;
  waveHeight?: number; // Controls the amplitude of the wave
  speed?: number; // Controls the speed of the wave animation
  initialOffset?: number; // Spatial horizontal offset of the wave pattern (phase shift)
  frequency?: number; // How "dense" the waves are horizontally (lower value = wider waves)
  mobileScale?: number; // Scale factor for mobile devices (default: 1)
}

// Helper function to calculate Y value for a given X, phase, and wave parameters
const calculateY = (
  xInput: number,
  currentPhase: number,
  initialSpatialOffset: number, // Renamed for clarity: this shifts the wave pattern spatially
  freq: number,
  height: number
) => {
  const xForSine = xInput + initialSpatialOffset; // Apply spatial offset for wave calculation
  const waveCenterY = 100; // Mid-line of the wave in viewBox units (0-200 range)
  
  // Coefficients of currentPhase are now 1 (or integer effectively) for seamless looping
  const y1 = Math.sin(freq * xForSine + currentPhase) * height * 0.55;
  const y2 = Math.cos(freq * xForSine * 0.6 + currentPhase + 1) * height * 0.25; 
  const y3 = Math.sin(freq * xForSine * 1.2 + currentPhase + 2) * height * 0.20; 
  
  return waveCenterY + y1 + y2 + y3;
};

export function AnimatedWavePath({
  className,
  opacity = 1,
  waveHeight = 50,
  speed = 1,
  initialOffset = 0, // This is now used as initialSpatialOffset in calculateY
  frequency = 0.02,
  mobileScale = 1,
}: AnimatedWavePathProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null); // Keep svgRef in case needed for other calcs later

  useEffect(() => {
    if (!pathRef.current) return;

    const pathElement = pathRef.current;
    const svgViewBoxWidth = 1000; // Matches the width in viewBox="0 0 1000 200"

    // Check if mobile and apply scale
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const effectiveWaveHeight = isMobile ? waveHeight * mobileScale : waveHeight;

    const generatePath = (currentPhase: number) => {
      // Using viewBoxWidth for point density ensures consistent detail regardless of actual SVG element size
      const numPoints = Math.max(100, Math.floor(svgViewBoxWidth / 8)); // Increased points for smoothness
      const segmentWidth = svgViewBoxWidth / numPoints;

      // Path always starts at x=0 of the viewBox
      let d = `M 0 ${calculateY(0, currentPhase, initialOffset, frequency, effectiveWaveHeight).toFixed(2)}`;

      for (let i = 1; i <= numPoints; i++) {
        const x = i * segmentWidth;
        const yVal = calculateY(x, currentPhase, initialOffset, frequency, effectiveWaveHeight);
        d += ` L ${x.toFixed(2)} ${yVal.toFixed(2)}`;
      }
      
      // Close path at bottom, spanning the full viewBox width
      d += ` L ${svgViewBoxWidth} 200 L 0 200 Z`;
      return d;
    };
    
    const animState = { phase: 0 };
    // Randomize duration slightly for each wave for a more natural, desynchronized effect
    const duration = (6 + Math.random() * 4) / speed;

    const tween = gsap.to(animState, {
      phase: 2 * Math.PI, // One full cycle of the base sine wave phase
      duration: duration,
      ease: 'linear',
      repeat: -1,
      onUpdate: () => {
        if (pathElement) {
          pathElement.setAttribute('d', generatePath(animState.phase));
        }
      }
    });

    // Set initial path
    pathElement.setAttribute('d', generatePath(0));

    // Resize handling might be less critical if path always fills viewBox fixed width (1000)
    // and `preserveAspectRatio="none"` handles scaling.
    // However, if other dynamic aspects depend on resize, keep it.
    const handleResize = () => {
        if (pathElement) {
            pathElement.setAttribute('d', generatePath(animState.phase));
        }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      tween.kill();
      window.removeEventListener('resize', handleResize);
    };

  }, [waveHeight, speed, initialOffset, frequency, opacity, className, mobileScale]);

  // Calculate effective height for mobile
  const isMobileForStyle = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectiveHeightForStyle = isMobileForStyle ? waveHeight * mobileScale : waveHeight;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 200"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-auto block"
      style={{
        height: `${Math.max(80, effectiveHeightForStyle * 2.0)}px`,
        opacity: opacity
      }}
    >
      <path ref={pathRef} className={className} />
    </svg>
  );
}
