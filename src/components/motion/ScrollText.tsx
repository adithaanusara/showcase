'use client';

import { useRef } from 'react';
import { gsap, motionOk, useGSAP } from './gsap';

/** A paragraph whose words light up one by one as it scrolls through the screen. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(motionOk, () => {
        gsap.fromTo(
          '[data-word]',
          { opacity: 0.15 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((word, index) => (
        <span key={index} data-word>
          {word}{' '}
        </span>
      ))}
    </p>
  );
}
