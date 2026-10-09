'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, motionOk, useGSAP } from './gsap';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** How far it drifts while crossing the screen, as a percentage of its own height. */
  distance?: number;
}

export function Parallax({ children, className, distance = 15 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(motionOk, () => {
        gsap.fromTo(
          ref.current,
          { yPercent: distance / 2 },
          {
            yPercent: -distance / 2,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
