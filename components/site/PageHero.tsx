import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";

/** Shared page opener: numbered eyebrow, giant split-text title, supporting line. */
export function PageHero({
  index,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="gutter relative flex min-h-[78svh] flex-col justify-end pb-14 pt-40 md:pb-20">
      <div className="container-wide">
        <Reveal hero y={20} className="label mb-8 flex items-center gap-4 text-muted-foreground">
          <span className="text-accent">{index}</span>
          <span className="h-px w-12 bg-ink/20" />
          <span>{eyebrow}</span>
        </Reveal>
        <SplitReveal as="h1" hero className="display-xl max-w-[16ch] text-balance">
          {title}
        </SplitReveal>
        {subtitle && (
          <Reveal hero delay={0.35} y={24} className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {subtitle}
          </Reveal>
        )}
        {children}
      </div>
    </header>
  );
}

/** Section heading used in the body of pages. */
export function SectionHead({
  eyebrow,
  title,
  body,
  className,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal y={16} className="label mb-5 flex items-center gap-3 text-muted-foreground">
        <span className="h-2 w-2 rounded-full bg-accent" />
        {eyebrow}
      </Reveal>
      <SplitReveal as="h2" className="display-lg max-w-[18ch] text-balance">
        {title}
      </SplitReveal>
      {body && <Reveal y={20} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{body}</Reveal>}
    </div>
  );
}
