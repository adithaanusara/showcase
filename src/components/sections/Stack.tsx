import { stack } from '@/config/site';

export function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="border-border bg-surface/70 overflow-hidden border-y py-16 backdrop-blur-md"
    >
      <h2 id="stack-title" className="text-muted px-4 text-center text-xs tracking-[0.3em] uppercase">
        Tools I build with
      </h2>
      <ul className="sr-only">
        {stack.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
      {/* Two copies side by side, moved by half their width, so the loop has no seam. */}
      <div aria-hidden="true" className="marquee mt-10 flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {stack.map((tool, index) => (
              <span
                key={tool}
                className={`font-display px-6 text-5xl font-bold uppercase md:text-7xl ${
                  index % 3 === 0 ? 'text-gradient' : 'text-text/90'
                }`}
              >
                {tool}
                <span className="text-lime ml-12">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
