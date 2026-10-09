'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, motionOk, useGSAP } from './gsap';

/** Tilts its content towards the pointer, on devices with a real mouse only. */
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.matchMedia().add(`${motionOk} and (hover: hover)`, () => {
        gsap.set(el, { transformPerspective: 1000 });
        const rotateX = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
        const rotateY = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
        const move = (event: PointerEvent) => {
          const box = el.getBoundingClientRect();
          rotateY(((event.clientX - box.left) / box.width - 0.5) * 8);
          rotateX(-((event.clientY - box.top) / box.height - 0.5) * 8);
        };
        const reset = () => {
          rotateX(0);
          rotateY(0);
        };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', reset);
        return () => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', reset);
        };
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
