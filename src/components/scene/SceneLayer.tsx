'use client';

import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';

// Three.js needs the browser, and loading it separately keeps it out of the first paint.
const Scene = dynamic(() => import('./Scene'), { ssr: false });

const reducedMotion = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(reducedMotion);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

export function SceneLayer() {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(reducedMotion).matches,
    () => true,
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="glow absolute inset-0" />
      <Scene animate={!reduced} />
    </div>
  );
}
