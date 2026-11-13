"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/components/motion/gsap";
import { TLink } from "@/components/motion/TransitionProvider";
import { ArrowIcon } from "@/components/site/Button";
import { Scramble } from "@/components/motion/Scramble";
import { canHover } from "@/components/motion/hooks";
import { formatDate, type ProjectItem } from "@/lib/format";

/**
 * Editorial project index. On desktop a floating preview follows the cursor (tilting with its velocity)
 * and swaps image per row; on touch each row shows its own thumbnail.
 */
export function ProjectRows({ projects }: { projects: ProjectItem[] }) {
  const [active, setActive] = useState(0);
  const preview = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const pv = preview.current;
    const ul = list.current;
    if (!pv || !ul || !canHover()) return;

    const xTo = gsap.quickTo(pv, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(pv, "y", { duration: 0.6, ease: "power3.out" });
    const rTo = gsap.quickTo(pv, "rotation", { duration: 0.5, ease: "power3.out" });
    let lastX = 0;

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rTo(gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.5));
      lastX = e.clientX;
    };
    const enter = () => gsap.to(pv, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" });
    const leave = () => gsap.to(pv, { scale: 0.6, opacity: 0, duration: 0.4, ease: "power3.in" });

    window.addEventListener("pointermove", move, { passive: true });
    ul.addEventListener("pointerenter", enter);
    ul.addEventListener("pointerleave", leave);
    gsap.set(pv, { scale: 0.6, opacity: 0, xPercent: -50, yPercent: -50 });
    return () => {
      window.removeEventListener("pointermove", move);
      ul.removeEventListener("pointerenter", enter);
      ul.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <ul ref={list} className="border-t border-ink/15">
        {projects.map((p, i) => (
          <li key={p._id} className="border-b border-ink/15" onPointerEnter={() => setActive(i)}>
            <TLink
              href={`/projects/${p._id}`}
              data-cursor="View"
              className="group relative flex flex-col gap-4 py-7 transition-all duration-500 hover:px-4 md:flex-row md:items-center md:gap-10 md:py-10"
            >
              <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-surface transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" aria-hidden />
              <span className="label w-10 shrink-0 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>

              {/* Touch thumbnail */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.imageUrl} alt="" className="aspect-[16/9] w-full rounded-2xl object-cover md:hidden" loading="lazy" />

              <h3 className="font-display min-w-0 break-words text-[clamp(1.7rem,3.8vw,3.4rem)] font-semibold leading-[1.05] tracking-tight transition-transform duration-500 group-hover:translate-x-3">
                <Scramble text={p.title} />
              </h3>
              <div className="flex flex-1 flex-wrap items-center gap-2 md:justify-end">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="label rounded-full border border-ink/15 px-3 py-1.5 text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <span className="label hidden w-28 text-right text-muted-foreground lg:block">{formatDate(p.createdAt)}</span>
              <ArrowIcon className="hidden text-3xl md:block" />
            </TLink>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview (desktop) */}
      <div
        ref={preview}
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-[17rem] w-[24rem] overflow-hidden rounded-3xl shadow-2xl shadow-ink/25 md:block"
        aria-hidden
      >
        {projects.map((p, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p._id}
            src={p.imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: active === i ? 1 : 0,
              transform: active === i ? "scale(1)" : "scale(1.25)",
            }}
          />
        ))}
      </div>
    </>
  );
}
