"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/components/motion/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { timeline } from "@/data/site";
import { prefersReducedMotion } from "@/components/motion/hooks";
import { cn } from "@/lib/utils";

type Pt = { x: number; y: number };

/** Smooth curve through points using midpoint quadratics. */
function smooth(pts: Pt[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q ${pts[i].x} ${pts[i].y} ${mx} ${my}`;
  }
  const last = pts[pts.length - 1];
  d += ` T ${last.x} ${last.y}`;
  return d;
}

/**
 * Winding SVG path that draws itself as you scroll, with a glowing dot riding the line
 * and each year's node lighting up when reached.
 */
export function JourneyPath() {
  const wrap = useRef<HTMLDivElement>(null);
  const pathEl = useRef<SVGPathElement>(null);
  const dot = useRef<SVGGElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const [nodes, setNodes] = useState<Pt[]>([]);

  // Measure container + the vertical centre of each row, so the path threads through the cards.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const top = el.getBoundingClientRect().top;
      const mobile = w < 768;
      const cx = mobile ? 22 : w / 2;
      const amp = mobile ? 8 : Math.min(70, w * 0.05);
      const pts: Pt[] = rowRefs.current.map((r, i) => {
        const rr = r?.getBoundingClientRect();
        const y = rr ? rr.top - top + rr.height / 2 : ((i + 0.5) / timeline.length) * h;
        return { x: cx + (i % 2 === 0 ? -amp : amp), y };
      });
      setSize({ w, h });
      setNodes(pts);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const d = nodes.length ? smooth([{ x: nodes[0].x, y: 0 }, ...nodes, { x: nodes[nodes.length - 1].x, y: size.h }]) : "";

  useEffect(() => {
    const path = pathEl.current;
    const g = dot.current;
    const el = wrap.current;
    if (!path || !g || !el || !d) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;

    const apply = (p: number) => {
      path.style.strokeDashoffset = `${len * (1 - p)}`;
      const pt = path.getPointAtLength(len * p);
      g.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      nodes.forEach((n, i) => {
        const on = n.y <= pt.y + 2;
        const node = el.querySelector<SVGElement>(`[data-node="${i}"]`);
        const row = rowRefs.current[i];
        node?.classList.toggle("on", on);
        row?.classList.toggle("is-on", on);
      });
    };

    if (prefersReducedMotion()) {
      apply(1);
      return;
    }
    apply(0);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      end: "bottom 55%",
      scrub: 0.5,
      onUpdate: (self) => apply(self.progress),
    });
    return () => st.kill();
  }, [d, nodes]);

  return (
    <div ref={wrap} className="relative">
      {size.w > 0 && (
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${size.w} ${size.h}`}
          fill="none"
          aria-hidden
        >
          <path d={d} stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" className="text-ink" />
          <path ref={pathEl} d={d} stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          {nodes.map((n, i) => (
            <g key={i} transform={`translate(${n.x} ${n.y})`}>
              <circle data-node={i} r="9" className="journey-node" />
            </g>
          ))}
          <g ref={dot}>
            <circle r="18" fill="var(--accent)" opacity="0.18" />
            <circle r="7" fill="var(--accent)" />
          </g>
        </svg>
      )}

      <div className="relative z-10">
        {timeline.map((t, i) => {
          const left = i % 2 === 0;
          return (
            <article
              key={t.year}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="journey-row grid min-h-[78svh] items-center gap-6 py-16 pl-12 md:grid-cols-2 md:gap-24 md:pl-0"
            >
              <div className={cn("md:order-1", left ? "md:text-right" : "md:order-2")}>
                <Reveal y={40}>
                  <span className="journey-year font-display text-[clamp(5rem,15vw,13rem)] font-semibold leading-[0.85] tracking-tighter">
                    {t.year}
                  </span>
                </Reveal>
              </div>
              <div className={cn(left ? "md:order-2" : "md:order-1")}>
                <TiltCard max={5} lift={14} className="rounded-[2rem]" bodyClassName="rounded-[2rem]">
                  <div className="gloss rounded-[2rem] p-7 md:p-9">
                    <h3 className="tilt-z-md font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">{t.title}</h3>
                    <div className="tilt-z-sm mt-4 space-y-3 leading-relaxed text-muted-foreground">
                      {t.paragraphs.map((p, pi) => (
                        <p key={pi}>{p}</p>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
