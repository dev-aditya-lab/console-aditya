"use client";

import { useEffect, useRef } from "react";
import { gsap } from "./gsap";
import { canHover } from "./hooks";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#$%&";

/** Text that scrambles and resolves letter by letter when its parent link/button (or itself) is hovered. */
export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;
    const host = (el.closest("a,button,[data-scramble-host]") as HTMLElement | null) ?? el;
    let tween: gsap.core.Tween | null = null;

    const run = () => {
      tween?.kill();
      const o = { p: 0 };
      tween = gsap.to(o, {
        p: 1,
        duration: 0.7,
        ease: "none",
        onUpdate: () => {
          const resolved = Math.floor(o.p * text.length);
          let out = "";
          for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            out += i < resolved || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          el.textContent = out;
        },
        onComplete: () => {
          el.textContent = text;
        },
      });
    };
    host.addEventListener("pointerenter", run);
    return () => {
      host.removeEventListener("pointerenter", run);
      tween?.kill();
      el.textContent = text;
    };
  }, [text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  );
}
