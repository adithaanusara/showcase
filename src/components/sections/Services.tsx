import { Reveal } from '@/components/motion/Reveal';
import { services } from '@/config/site';

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2
            id="services-title"
            className="font-display text-5xl font-bold tracking-tight uppercase md:text-7xl"
          >
            What I <span className="text-gradient">make</span>
          </h2>
        </Reveal>
        <Reveal stagger className="mt-12 grid gap-4 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group border-border bg-surface/60 hover:border-violet relative overflow-hidden rounded-3xl border p-8 backdrop-blur-md transition-colors"
            >
              <div
                aria-hidden="true"
                className="from-violet/30 to-cyan/10 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <p className="text-lime relative font-mono text-sm">0{index + 1}</p>
              <h3 className="font-display relative mt-10 text-2xl font-bold">{service.title}</h3>
              <p className="text-muted relative mt-3">{service.text}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
