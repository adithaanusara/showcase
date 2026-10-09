import { HeroHeadline } from '@/components/motion/HeroHeadline';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { site } from '@/config/site';

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh items-end px-4 pt-32 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto w-full max-w-6xl">
        <p className="border-border bg-surface/60 text-muted mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-widest uppercase backdrop-blur">
          <span className="bg-lime size-2 rounded-full" aria-hidden="true" />
          {site.role}
        </p>
        <HeroHeadline
          lines={[{ text: 'I build' }, { text: 'products that' }, { text: 'feel alive.', gradient: true }]}
        />
        <Reveal stagger className="mt-8 flex max-w-xl flex-col gap-8 md:mt-10">
          <p className="text-muted text-lg md:text-xl">
            Full-stack web apps, AI-powered features and interactive 3D, built to be fast,
            accessible and easy to run.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#work">See the work</ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="outline">
              Get in touch
            </ButtonLink>
          </div>
        </Reveal>
      </div>
      <span className="text-muted absolute right-8 bottom-8 hidden text-xs tracking-[0.3em] uppercase md:block">
        Scroll
      </span>
    </section>
  );
}
