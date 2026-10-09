import { site } from '@/config/site';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Stack', href: '#stack' },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main"
        className="border-border/70 bg-bg/60 mx-auto flex max-w-6xl items-center justify-between rounded-full border py-2 pr-2 pl-5 backdrop-blur-md"
      >
        <a href="#top" className="font-display text-sm font-bold tracking-[0.2em] uppercase">
          {site.name}
        </a>
        <ul className="text-muted hidden gap-8 text-sm md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-text transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="bg-lime text-bg hover:bg-text rounded-full px-4 py-2 text-sm font-semibold transition-colors"
        >
          Let&apos;s talk
        </a>
      </nav>
    </header>
  );
}
