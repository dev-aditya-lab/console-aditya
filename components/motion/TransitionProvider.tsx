"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "./gsap";
import { store } from "@/lib/motion-store";
import { Logo } from "@/components/site/Logo";
import { pages } from "@/data/site";
import { prefersReducedMotion, useIsoLayoutEffect } from "./hooks";

type Ctx = {
  /** Navigate with the curtain transition. */
  go: (href: string) => void;
  /** False while the loader / a page transition covers the screen; true once the new page is visible. */
  revealed: boolean;
};

const TransitionCtx = createContext<Ctx>({ go: () => {}, revealed: true });
export const useTransition = () => useContext(TransitionCtx);

const SEEN_KEY = "ag_intro_seen";

function labelFor(path: string): string {
  const hit = pages.find((p) => p.href === path);
  if (hit) return hit.name;
  if (path.startsWith("/projects/")) return "Project";
  if (path.startsWith("/blog/")) return "Article";
  return "Aditya Gupta";
}

/** SVG path for the curtain. `e` = leading edge (0-100), `b` = how far the middle bulges ahead of the edges. */
const coverPath = (e: number, b: number) => `M0 ${e} Q50 ${e - b} 100 ${e} V100 H0 Z`;
const revealPath = (e: number, b: number) => `M0 0 H100 V${e} Q50 ${e - b} 0 ${e} Z`;

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [revealed, setRevealed] = useState(false);
  const busy = useRef(false);
  const pathRef = useRef(pathname);
  const waiters = useRef<Array<() => void>>([]);

  const rootRef = useRef<HTMLDivElement>(null);
  const pathEl = useRef<SVGPathElement>(null);
  const labelEl = useRef<HTMLDivElement>(null);
  const loaderEl = useRef<HTMLDivElement>(null);
  const counterEl = useRef<HTMLSpanElement>(null);
  const proxy = useRef({ e: 0, b: 0 });
  const mode = useRef<"cover" | "reveal">("cover");

  const paint = useCallback(() => {
    const { e, b } = proxy.current;
    pathEl.current?.setAttribute("d", mode.current === "cover" ? coverPath(e, b) : revealPath(e, b));
  }, []);

  const cover = useCallback(
    () =>
      new Promise<void>((resolve) => {
        const root = rootRef.current;
        if (!root) return resolve();
        root.style.pointerEvents = "auto";
        mode.current = "cover";
        proxy.current.e = 100;
        proxy.current.b = 0;
        paint();
        const reduced = prefersReducedMotion();
        const dur = reduced ? 0.01 : 0.85;
        gsap
          .timeline({ onComplete: resolve })
          .to(proxy.current, { e: 0, duration: dur, ease: "power4.inOut", onUpdate: paint }, 0)
          .to(proxy.current, { b: 22, duration: dur * 0.5, ease: "power2.out", onUpdate: paint }, 0)
          .to(proxy.current, { b: 0, duration: dur * 0.5, ease: "power2.in", onUpdate: paint }, dur * 0.5)
          .fromTo(
            labelEl.current,
            { opacity: 0, yPercent: 60 },
            { opacity: 1, yPercent: 0, duration: 0.5, ease: "expo.out" },
            dur * 0.45,
          );
      }),
    [paint],
  );

  const reveal = useCallback(
    () =>
      new Promise<void>((resolve) => {
        const root = rootRef.current;
        if (!root) return resolve();
        mode.current = "reveal";
        proxy.current.e = 100;
        proxy.current.b = 0;
        paint();
        const reduced = prefersReducedMotion();
        const dur = reduced ? 0.01 : 0.95;
        gsap
          .timeline({
            onComplete: () => {
              root.style.pointerEvents = "none";
              root.style.visibility = "hidden";
              resolve();
            },
          })
          .to(labelEl.current, { opacity: 0, yPercent: -60, duration: 0.4, ease: "power2.in" }, 0)
          .to(loaderEl.current, { opacity: 0, duration: 0.3 }, 0)
          .to(proxy.current, { e: 0, duration: dur, ease: "power4.inOut", onUpdate: paint }, 0.05)
          .to(proxy.current, { b: 26, duration: dur * 0.5, ease: "power2.out", onUpdate: paint }, 0.05)
          .to(proxy.current, { b: 0, duration: dur * 0.5, ease: "power2.in", onUpdate: paint }, dur * 0.5 + 0.05);
      }),
    [paint],
  );

  // Keep latest pathname and release anyone waiting on a navigation to land.
  useEffect(() => {
    pathRef.current = pathname;
    store.route = pathname;
    waiters.current.splice(0).forEach((f) => f());
    if (!busy.current) {
      // Back/forward or any non-curtain navigation.
      const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
      return () => window.clearTimeout(t);
    }
  }, [pathname]);

  const go = useCallback(
    (href: string) => {
      const path = href.split("#")[0].split("?")[0] || "/";
      if (busy.current) return;
      if (path === pathRef.current) {
        store.lenis?.scrollTo(0);
        return;
      }
      busy.current = true;
      setRevealed(false);
      store.lenis?.stop();
      if (labelEl.current) labelEl.current.textContent = labelFor(path);
      if (rootRef.current) rootRef.current.style.visibility = "visible";
      if (loaderEl.current) loaderEl.current.style.display = "none";

      cover().then(async () => {
        router.push(href);
        await new Promise<void>((res) => {
          waiters.current.push(res);
          window.setTimeout(res, 3500);
        });
        window.scrollTo(0, 0);
        store.lenis?.scrollTo(0, { immediate: true, force: true });
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        ScrollTrigger.refresh();
        setRevealed(true);
        await reveal();
        busy.current = false;
        store.lenis?.start();
        ScrollTrigger.refresh();
      });
    },
    [cover, reveal, router],
  );

  // First paint: the curtain is server-rendered fully closed (with the loader on it).
  // Play the intro once per session, otherwise lift it right away.
  useIsoLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* private mode */
    }
    busy.current = true;
    store.lenis?.stop();
    const reduced = prefersReducedMotion();
    const root = rootRef.current;
    if (root) root.style.pointerEvents = "auto";

    const finish = async () => {
      setRevealed(true);
      await reveal();
      busy.current = false;
      store.lenis?.start();
      ScrollTrigger.refresh();
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    };

    if (seen || reduced) {
      if (loaderEl.current) loaderEl.current.style.display = "none";
      if (labelEl.current) labelEl.current.style.display = "none";
      finish();
      return;
    }

    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: finish });
    tl.fromTo(
      ".logo-path",
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut", stagger: 0.25 },
      0,
    )
      .to(
        counter,
        {
          v: 100,
          duration: 1.7,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterEl.current) counterEl.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        },
        0,
      )
      .to(".loader-meta", { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.1 }, 0.2)
      .to({}, { duration: 0.25 });

    return () => {
      tl.kill();
    };
  }, []);

  const value = useMemo(() => ({ go, revealed }), [go, revealed]);

  return (
    <TransitionCtx.Provider value={value}>
      {children}

      {/* Curtain + loader */}
      <div
        ref={rootRef}
        className="fixed inset-0 z-[120] pointer-events-auto"
        aria-hidden
        suppressHydrationWarning
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path ref={pathEl} d={coverPath(0, 0)} fill="var(--accent)" />
        </svg>

        <div
          ref={labelEl}
          className="display-lg absolute inset-0 flex items-center justify-center text-white opacity-0"
        />

        <div ref={loaderEl} className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <Logo className="h-24 w-36 md:h-32 md:w-48" strokeWidth={3.5} />
          <div className="loader-meta mt-8 translate-y-3 opacity-0 label">Aditya Gupta — Portfolio</div>
          <div className="loader-meta absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-3 opacity-0 text-center">
            <span ref={counterEl} className="font-display text-6xl font-semibold tabular-nums md:text-8xl">
              000
            </span>
          </div>
        </div>
      </div>
    </TransitionCtx.Provider>
  );
}

type TLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/** Drop-in <Link> that plays the curtain transition for internal navigation. */
export function TLink({ href, onClick, children, ...rest }: TLinkProps) {
  const { go } = useTransition();
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !isInternal) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (rest.target && rest.target !== "_self") return;
    e.preventDefault();
    go(href);
  };

  if (!isInternal) {
    return (
      <a href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
