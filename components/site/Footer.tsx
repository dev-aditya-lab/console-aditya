"use client";

import { useEffect, useState } from "react";
import { TLink } from "@/components/motion/TransitionProvider";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { DrawIcon } from "@/components/motion/DrawIcon";
import { Button, Roll } from "@/components/site/Button";
import { SocialIcon } from "@/components/site/icons";
import { footer, pages, siteConfig, socials } from "@/data/site";
import { store } from "@/lib/motion-store";

export function Footer() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: siteConfig.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20000);
    return () => window.clearInterval(id);
  }, []);

  const toTop = () => {
    if (store.lenis) store.lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const letters = "ADITYA GUPTA".split("");

  return (
    <footer className="relative z-10 overflow-hidden">
      <div className="gutter pb-10 pt-32 md:pt-[28vh]">
        <div className="container-wide">
          {/* CTA */}
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <SplitReveal as="p" className="display-xl">{footer.cta}</SplitReveal>
              <SplitReveal as="p" className="display-xl text-accent" delay={0.1}>
                {`*${footer.ctaAccent}*`}
              </SplitReveal>
            </div>
            <Reveal y={20}>
              <Button href="/contact">Get in touch</Button>
            </Reveal>
          </div>

          {/* Link columns */}
          <div className="mt-24 grid gap-12 border-t border-ink/10 pt-12 md:grid-cols-12">
            <Reveal className="md:col-span-4" y={24}>
              <p className="max-w-xs text-lg leading-relaxed text-muted-foreground">{footer.description}</p>
              <a href={`mailto:${siteConfig.email}`} className="group mt-6 inline-block font-display text-xl font-medium">
                <span className="u-link">{siteConfig.email}</span>
              </a>
            </Reveal>

            <Reveal className="md:col-span-4" y={24} delay={0.08}>
              <p className="label mb-5 text-muted-foreground">Pages</p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {pages.map((p) => (
                  <li key={p.href}>
                    <TLink href={p.href} className="group text-base font-medium">
                      <Roll>{p.name}</Roll>
                    </TLink>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="md:col-span-4" y={24} delay={0.16}>
              <p className="label mb-5 text-muted-foreground">Elsewhere</p>
              <ul className="flex flex-col gap-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-base font-medium"
                    >
                      <DrawIcon onView={false}>
                        <SocialIcon iconKey={s.iconKey} className="h-5 w-5" />
                      </DrawIcon>
                      <Roll>{s.label}</Roll>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Giant name — letters lift individually on hover */}
      <div className="gutter select-none overflow-hidden" aria-hidden>
        <div className="container-wide flex justify-between font-display font-semibold leading-[0.82] tracking-tighter" style={{ fontSize: "min(15.2vw, 16rem)" }}>
          {letters.map((l, i) =>
            l === " " ? (
              <span key={i} className="w-[0.12em]" />
            ) : (
              <span
                key={i}
                className="inline-block cursor-default transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[0.12em] hover:text-accent hover:[transform:translateY(-0.12em)_rotateX(18deg)_skewX(-6deg)]"
              >
                {l}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="gutter border-t border-ink/10 py-6">
        <div className="container-wide flex flex-wrap items-center justify-between gap-4">
          <p className="label text-muted-foreground">© {new Date().getFullYear()} {siteConfig.name}</p>
          <p className="label hidden text-muted-foreground md:block">{footer.blurb}</p>
          <div className="flex items-center gap-4">
            <p className="label text-muted-foreground">
              {siteConfig.location} · {time || "--:--"} IST
            </p>
            <Magnetic strength={0.5} innerStrength={0.2}>
              <button
                onClick={toTop}
                aria-label="Back to top"
                data-cursor="link"
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white transition-colors duration-500 hover:bg-accent"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
