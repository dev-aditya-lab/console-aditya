"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/components/motion/gsap";
import { TLink } from "@/components/motion/TransitionProvider";
import { Scramble } from "@/components/motion/Scramble";
import { Magnetic } from "@/components/motion/Magnetic";
import { Logo } from "@/components/site/Logo";
import { SocialIcon } from "@/components/site/icons";
import { DrawIcon } from "@/components/motion/DrawIcon";
import { ArrowIcon } from "@/components/site/Button";
import { pages, topNav, socials, siteConfig } from "@/data/site";
import { store } from "@/lib/motion-store";
import { prefersReducedMotion } from "@/components/motion/hooks";
import { cn } from "@/lib/utils";

function useClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: siteConfig.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20000);
    return () => window.clearInterval(id);
  }, []);
  return t;
}

export function Nav() {
  const pathname = usePathname();
  const clock = useClock();
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const openRef = useRef(false);
  openRef.current = open;

  // Hide the bar on scroll down, bring it back on scroll up.
  useEffect(() => {
    let last = 0;
    let hidden = false;
    const el = bar.current;
    if (!el) return;
    const tick = () => {
      if (openRef.current) {
        if (hidden) {
          hidden = false;
          gsap.to(el, { yPercent: 0, duration: 0.4, ease: "expo.out", overwrite: true });
        }
        return;
      }
      const y = store.scroll || window.scrollY;
      const dy = y - last;
      if (Math.abs(dy) > 6) {
        const shouldHide = dy > 0 && y > 240;
        if (shouldHide !== hidden) {
          hidden = shouldHide;
          gsap.to(el, { yPercent: hidden ? -140 : 0, duration: 0.6, ease: "expo.out", overwrite: true });
        }
        last = y;
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  // Build the overlay timeline once.
  useEffect(() => {
    const ov = overlay.current;
    if (!ov) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.set(ov, { clipPath: "circle(0% at calc(100% - 3.2rem) 2.6rem)", visibility: "hidden" });
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .set(ov, { visibility: "visible" })
        .to(ov, { clipPath: "circle(160% at calc(100% - 3.2rem) 2.6rem)", duration: reduced ? 0.01 : 1.1, ease: "power4.inOut" })
        .fromTo(".menu-line", { yPercent: 115 }, { yPercent: 0, duration: 1, stagger: 0.05 }, "-=0.55")
        .fromTo(".menu-fade", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 }, "-=0.8")
        .eventCallback("onReverseComplete", () => {
          gsap.set(ov, { visibility: "hidden" });
        });
    }, ov);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      store.lenis?.stop();
      t.timeScale(1).play();
    } else {
      store.lenis?.start();
      t.timeScale(1.6).reverse();
    }
  }, [open]);

  // Close on route change + Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header ref={bar} className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex items-start justify-between gutter pt-4">
        {/* Logo */}
        <Magnetic strength={0.25} innerStrength={0.1}>
          <TLink
            href="/"
            aria-label="Aditya Gupta — home"
            data-cursor="link"
            className="group gloss pointer-events-auto flex h-12 items-center gap-3 rounded-full pl-4 pr-5"
          >
            <Logo className="h-6 w-9 text-ink" strokeWidth={5} />
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">Aditya Gupta</span>
          </TLink>
        </Magnetic>

        {/* Inline links (desktop) */}
        <nav className="gloss pointer-events-auto hidden h-12 items-center gap-1 rounded-full px-2 lg:flex" aria-label="Primary">
          {topNav.map((l) => (
            <TLink
              key={l.href}
              href={l.href}
              className={cn(
                "group relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(l.href) ? "bg-ink text-white" : "text-ink hover:bg-ink/5",
              )}
            >
              <Scramble text={l.name} />
            </TLink>
          ))}
        </nav>

        {/* Clock + menu */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="gloss hidden h-12 items-center gap-2.5 rounded-full px-5 md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="label text-ink/70">IST {clock || "--:--"}</span>
          </div>
          <Magnetic strength={0.3} innerStrength={0.15}>
            <button
              ref={menuBtn}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              data-cursor="link"
              className="group relative z-[110] flex h-12 items-center gap-3 rounded-full bg-ink pl-5 pr-4 text-sm font-medium text-white"
            >
              <span className="roll">
                <span>{open ? "Close" : "Menu"}</span>
                <span aria-hidden>{open ? "Close" : "Menu"}</span>
              </span>
              <span className="relative block h-3 w-5" aria-hidden>
                <span className={cn("absolute left-0 h-[1.5px] w-full bg-white transition-all duration-500", open ? "top-1/2 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-[1.5px] bg-white transition-all duration-500", open ? "top-1/2 w-full -rotate-45" : "top-full w-3/5")} />
              </span>
            </button>
          </Magnetic>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        ref={overlay}
        className="fixed inset-0 z-[95] flex flex-col overflow-y-auto bg-white"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        data-lenis-prevent
      >
        <div className="gutter container-wide flex flex-1 flex-col justify-between gap-10 pb-8 pt-24 lg:flex-row lg:gap-20">
          <ul className="menu-list flex flex-1 flex-col justify-center">
            {pages.map((p, i) => (
              <li key={p.href} className="menu-item border-b border-ink/10 last:border-0">
                <TLink href={p.href} className="group flex items-baseline gap-5 py-[2px] md:gap-8" data-cursor="link">
                  <span className="label w-6 shrink-0 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="overflow-hidden">
                    <span className="menu-line block font-display text-[clamp(1.9rem,min(5.4vw,7vh),5rem)] font-semibold leading-[1.05] tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:group-hover:translate-x-6">
                      <Scramble text={p.name} />
                    </span>
                  </span>
                  {isActive(p.href) && <span className="h-2 w-2 shrink-0 self-center rounded-full bg-accent" />}
                  <span className="menu-fade ml-auto hidden text-sm text-muted-foreground md:block">{p.blurb}</span>
                  <ArrowIcon className="hidden text-2xl md:block" />
                </TLink>
              </li>
            ))}
          </ul>

          <aside className="flex shrink-0 flex-col justify-end gap-8 lg:w-72">
            <div className="menu-fade">
              <p className="label mb-3 text-muted-foreground">Say hello</p>
              <a href={`mailto:${siteConfig.email}`} className="group font-display text-xl font-medium">
                <span className="u-link">{siteConfig.email}</span>
              </a>
            </div>
            <ul className="menu-fade flex flex-col gap-3">
              {socials
                .filter((s) => s.iconKey !== "mail" && s.iconKey !== "phone")
                .map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-sm">
                      <DrawIcon onView={false}>
                        <SocialIcon iconKey={s.iconKey} className="h-5 w-5" />
                      </DrawIcon>
                      <span className="u-link">{s.label}</span>
                    </a>
                  </li>
                ))}
            </ul>
            <p className="menu-fade label text-muted-foreground">
              {siteConfig.location} · IST {clock || "--:--"}
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
