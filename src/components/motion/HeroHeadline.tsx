'use client';

import { useRef } from 'react';
import { gsap, motionOk, useGSAP } from './gsap';

interface HeroHeadlineProps {
  lines: { text: string; gradient?: boolean }[];
}

export function HeroHeadline({ lines }: HeroHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(motionOk, () => {
        gsap.from('[data-word]', {
          yPercent: 115,
          rotate: 6,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.07,
          delay: 0.1,
        });
      });
    },
    { scope: ref },
  );

  return (
    // Screen readers get the sentence once; the per-word spans exist only for the animation.
    <h1
      ref={ref}
      aria-label={lines.map((line) => line.text).join(' ')}
      className="font-display text-[clamp(3.2rem,10vw,9rem)] leading-[0.9] font-bold tracking-tight uppercase"
    >
      {lines.map((line) => (
        <span key={line.text} aria-hidden="true" className="block">
          {line.text.split(' ').map((word, index) => (
            <span key={index} className="mr-[0.22em] inline-block overflow-hidden pb-[0.06em]">
              <span data-word className={`inline-block ${line.gradient ? 'text-gradient' : ''}`}>
                {word}
              </span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
