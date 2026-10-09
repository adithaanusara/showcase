import { ScrollText } from '@/components/motion/ScrollText';

export function Statement() {
  return (
    <section aria-label="About" className="px-4 py-32 md:px-8 md:py-48">
      <ScrollText
        className="font-display mx-auto max-w-5xl text-3xl leading-tight font-medium md:text-5xl"
        text="I care about the parts people never notice: pages that load fast, checkouts that never charge twice, admin tools that keep an audit trail, and motion that switches off when someone asks it to."
      />
    </section>
  );
}
