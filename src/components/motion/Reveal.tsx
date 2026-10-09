'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, motionOk, useGSAP } from './gsap';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Animate each direct child in turn instead of the block as a whole. */
  stagger?: boolean;
}

export function Reveal({ children, className, stagger = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.matchMedia().add(motionOk, () => {
        gsap.from(stagger ? el.children : el, {
          y: 48,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
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
