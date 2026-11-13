"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { store } from "@/lib/motion-store";
import { prefersReducedMotion } from "./hooks";

/** Lenis smooth scrolling wired into GSAP's ticker + ScrollTrigger, and global pointer tracking for WebGL. */
export function SmoothScroll() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      store.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      store.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    if (prefersReducedMotion()) {
      const onScroll = () => {
        store.scroll = window.scrollY;
        store.limit = document.documentElement.scrollHeight - window.innerHeight;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("scroll", onScroll);
      };
    }

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
    store.lenis = lenis;

    lenis.on("scroll", (l: Lenis) => {
      store.scroll = l.scroll;
      store.limit = l.limit;
      store.velocity = l.velocity;
      ScrollTrigger.update();
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      lenis.destroy();
      store.lenis = null;
    };
  }, []);

  return null;
}
