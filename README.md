# Showcase

My portfolio site: a one-page showcase with a real-time 3D scene that follows the scroll, scroll-triggered text animations and a case study of [WEARAI](https://wearai-web.vercel.app).

## Stack

- Next.js (App Router) and Tailwind CSS
- Three.js through React Three Fiber and drei, for the 3D scene
- GSAP with ScrollTrigger, for the text and scroll animations

## Run it

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Where things live

- `src/config/site.ts`: name, email, services, the featured project and the tool list. Edit this first.
- `src/app/globals.css`: the colour palette, as CSS variables.
- `src/components/scene`: the 3D scene. It loads only in the browser, after the page itself.
- `src/components/motion`: the reveal, headline, tilt and parallax animations.
- `src/components/sections`: the page sections, in page order.

Every animation is skipped for visitors who have turned on "reduce motion" in their system settings, and the 3D scene then holds still.
