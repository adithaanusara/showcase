import { SceneLayer } from '@/components/scene/SceneLayer';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Nav } from '@/components/sections/Nav';
import { Services } from '@/components/sections/Services';
import { Stack } from '@/components/sections/Stack';
import { Statement } from '@/components/sections/Statement';
import { Work } from '@/components/sections/Work';
import { site } from '@/config/site';

export default function Home() {
  return (
    <>
      <SceneLayer />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Services />
        <Work />
        <Stack />
        <Contact />
      </main>
      <footer className="border-border text-muted border-t px-4 py-8 text-center text-xs md:px-8">
        {site.name}. Built with Next.js, Three.js and GSAP.
      </footer>
    </>
  );
}
