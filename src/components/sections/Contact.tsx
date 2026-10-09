import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { site } from '@/config/site';

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="flex min-h-[80svh] items-center px-4 py-32 md:px-8"
    >
      <Reveal stagger className="mx-auto flex max-w-6xl flex-col items-start gap-10">
        <h2
          id="contact-title"
          className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] font-bold tracking-tight uppercase"
        >
          Got an idea? <span className="text-gradient block">Let&apos;s make it pop.</span>
        </h2>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${site.email}`} className="px-8 py-4 text-base">
            {site.email}
          </ButtonLink>
          <ButtonLink
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="px-8 py-4 text-base"
          >
            GitHub <span aria-hidden="true">↗</span>
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
