'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Every animation is added under this query, so it simply never runs for anyone who has asked
// their system for less motion; the content is already in place without it.
export const motionOk = '(prefers-reduced-motion: no-preference)';

export { gsap, useGSAP };
