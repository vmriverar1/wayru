
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function LoadingSphere() {
  const sphereRef = useRef<SVGSVGElement>(null);
  const waterBodyRef = useRef<SVGRectElement>(null); 
  const wavePath1Ref = useRef<SVGPathElement>(null); 
  const wavePath2Ref = useRef<SVGPathElement>(null); 
  const percentageTextRef = useRef<SVGTextElement>(null);
  const [percentage, setPercentage] = useState(0);

  const sphereSize = 200;
  const wavePeriod = 200; 
  const totalFillDuration = 3.0; 

  const generateWaveD = (phase: number, amplitude: number, localWavePeriod: number, numPeriodsToDraw: number) => {
    let d = `M ${-localWavePeriod / 2},0`; 
    for (let i = 0; i < numPeriodsToDraw * 2; i++) { 
      const xBase = -localWavePeriod / 2 + (i * localWavePeriod) / 2;
      d += ` Q ${xBase + localWavePeriod / 4},${Math.sin(phase + (i * Math.PI) / 2) * amplitude * (i % 2 === 0 ? -1 : 1)}`;
      d += ` ${xBase + localWavePeriod / 2},0`;
    }
    d += ` L ${-localWavePeriod / 2 + numPeriodsToDraw * localWavePeriod},${sphereSize / 2}`; 
    d += ` L ${-localWavePeriod / 2},${sphereSize / 2} Z`;
    return d;
  };


  useEffect(() => {
    if (!waterBodyRef.current || !wavePath1Ref.current || !wavePath2Ref.current || !percentageTextRef.current) return;

    const tl = gsap.timeline();

    tl.to(waterBodyRef.current, {
      attr: { y: 0, height: sphereSize },
      duration: totalFillDuration,
      ease: 'linear',
      onUpdate: function() {
        const currentHeight = parseFloat(waterBodyRef.current?.getAttribute('height') || '0');
        const progress = currentHeight / sphereSize;
        setPercentage(Math.min(100, Math.floor(progress * 100)));
        
        const waterTopY = sphereSize - currentHeight; 
        gsap.set([wavePath1Ref.current, wavePath2Ref.current], { y: waterTopY });
      }
    }, 0);

    const waveAmplitude1 = 18; 
    const waveAmplitude2 = 15; 
    const waveHorizontalSpeed = 2.5; 

    const wave1GsapState = { phase: 0 };
    tl.to(wave1GsapState, { 
      phase: Math.PI * 2,
      duration: 1.3,
      repeat: -1,
      ease: 'none', 
      onUpdate: () => wavePath1Ref.current?.setAttribute('d', generateWaveD(wave1GsapState.phase, waveAmplitude1, wavePeriod, 3)),
    }, 0);
    gsap.to(wavePath1Ref.current, { 
      x: -wavePeriod,
      duration: waveHorizontalSpeed,
      repeat: -1,
      ease: 'linear',
    });

    const wave2GsapState = { phase: Math.PI / 1.5 }; 
     tl.to(wave2GsapState, { 
      phase: Math.PI * 2 + (Math.PI / 1.5),
      duration: 1.5,
      repeat: -1,
      ease: 'none',
      onUpdate: () => wavePath2Ref.current?.setAttribute('d', generateWaveD(wave2GsapState.phase, waveAmplitude2, wavePeriod, 3)),
    }, 0);
    gsap.to(wavePath2Ref.current, { 
      x: -wavePeriod, 
      duration: waveHorizontalSpeed * 0.9, 
      repeat: -1,
      ease: 'linear',
    });

    // GSAP positioning for text is not needed if SVG attributes are correct
    // gsap.set(percentageTextRef.current, { y: sphereSize / 2 }); 

    return () => {
      tl.kill();
      gsap.killTweensOf([wavePath1Ref.current, wavePath2Ref.current, waterBodyRef.current, percentageTextRef.current]);
    };

  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <svg ref={sphereRef} width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
        <defs>
          <clipPath id="sphereClip">
            <circle cx="100" cy="100" r="100" />
          </clipPath>
        </defs>
        
        <g clipPath="url(#sphereClip)">
          <rect
            ref={waterBodyRef}
            x="0"
            y="200" 
            width="200"
            height="0" 
            className="fill-primary" 
          />
          <path
            ref={wavePath1Ref}
            className="fill-accent opacity-70" 
          />
          <path
            ref={wavePath2Ref}
            className="fill-primary" 
          />
          <text
            ref={percentageTextRef}
            x="100" 
            y="100" 
            textAnchor="middle"
            dominantBaseline="middle" 
            className="fill-primary-foreground font-bold text-5xl"
            style={{ pointerEvents: 'none' }}
          >
            {percentage}%
          </text>
        </g>
      </svg>
    </div>
  );
}
