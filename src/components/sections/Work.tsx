import Image from 'next/image';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';
import { Tilt } from '@/components/motion/Tilt';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { featuredProject as project } from '@/config/site';

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-lime font-mono text-sm">Featured project</p>
          <h2
            id="work-title"
            className="font-display mt-3 text-6xl font-bold tracking-tight uppercase md:text-8xl"
          >
            {project.name}
          </h2>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal stagger className="flex flex-col gap-6">
            <p className="text-lg md:text-xl">{project.summary}</p>
            <ul className="text-muted flex flex-col gap-3">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span className="bg-cyan mt-2.5 size-1.5 shrink-0 rounded-full" aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-2" aria-label="Built with">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-border bg-surface-2/80 rounded-full border px-3 py-1 text-xs"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <div>
              <ButtonLink href={project.url} target="_blank" rel="noopener noreferrer">
                Visit the live store <span aria-hidden="true">↗</span>
              </ButtonLink>
            </div>
          </Reveal>

          <Tilt className="relative">
            <div className="border-border relative overflow-hidden rounded-3xl border shadow-[0_30px_120px_-30px] shadow-violet/60">
              <Image
                src={project.images.desktop}
                alt={`${project.name} home page with its hero banner and navigation`}
                width={1280}
                height={800}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <Parallax
              distance={30}
              className="absolute -bottom-10 -left-6 hidden w-[28%] md:block"
            >
              <div className="border-border overflow-hidden rounded-[1.75rem] border-4 shadow-2xl">
                <Image
                  src={project.images.mobile}
                  alt={`${project.name} home page on a phone`}
                  width={390}
                  height={844}
                  sizes="15vw"
                  className="h-auto w-full"
                />
              </div>
            </Parallax>
          </Tilt>
        </div>

        <Reveal className="mt-24">
          <div className="border-border overflow-hidden rounded-3xl border">
            <Image
              src={project.images.cart}
              alt={`${project.name} cart page with two items and the order summary`}
              width={1280}
              height={800}
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
