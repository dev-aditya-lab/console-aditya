"use client";
import {
  // useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

const TimelineItem = ({ entry, side, index }: { entry: TimelineEntry; side: "left" | "right"; index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: itemProgress } = useScroll({
    target: itemRef,
    offset: ["start 80%", "end 20%"],
  });
  const y = useTransform(itemProgress, [0, 1], [60, -10]);
  const opacity = useTransform(itemProgress, [0, 0.15], [0, 1]);
  const scale = useTransform(itemProgress, [0, 1], [0.96, 1]);

  return (
    <div
      ref={itemRef}
      className={`relative md:flex ${side === "left" ? "md:justify-start md:pr-24" : "md:justify-end md:pl-24"}`}
    >
      <div className="absolute left-1/2 top-6 -translate-x-1/2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur shadow-xl shadow-sky-500/30">
          <div className="h-2.5 w-2.5 rounded-full bg-sky-300" />
        </div>
        <div className="absolute inset-0 -z-10 rounded-full bg-sky-400/25 blur-2xl" />
      </div>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`absolute top-14 hidden h-[2px] w-1/2 md:block ${
          side === "left" ? "left-1/2 origin-left" : "right-1/2 origin-right"
        } bg-gradient-to-r from-sky-400/0 via-sky-400/80 to-sky-400/0`}
      />

      <motion.article
        style={{ y, opacity, scale }}
        className={`relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/85 p-6 shadow-2xl shadow-black/40 backdrop-blur ${
          side === "left" ? "md:-rotate-1" : "md:rotate-1"
        }`}
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_25%_20%,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.12),transparent_30%)]" />
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-200/70">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            {entry.title}
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Milestone {index + 1}
          </span>
        </div>
        <div className="relative z-10 mt-4 space-y-3 text-slate-100">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200/80">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
            Code, Creation, Caffeine
          </div>
          {entry.content}
        </div>
      </motion.article>
    </div>
  );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950 text-white"
    >
      <div className="absolute inset-0 opacity-70" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.14),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-18 md:px-10 lg:px-12">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-blue-100/80 font-mono">
            {`console.log("Aditya Gupta's Journey")`}
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight">Spoiler: It started with “Hello World” and escalated quickly.</h2>
          <p className="mt-3 text-slate-200/80 text-base md:text-lg">A timeline of code, creation, and caffeine ☕</p>
        </div>

        <div ref={ref} className="relative mt-16 space-y-20 md:mt-20">
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-full w-[2px] rounded-full bg-gradient-to-b from-transparent via-sky-300/60 to-transparent blur-[1px]" />

          {data.map((item, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            return <TimelineItem key={index} entry={item} side={side} index={index} />;
          })}

          <div
            style={{ height: `${height}px` }}
            className="pointer-events-none absolute left-1/2 top-0 w-[2px] -translate-x-1/2 overflow-hidden rounded-full bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-sky-400/40 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)]"
          >
            <motion.div
              style={{ height: heightTransform, opacity: opacityTransform }}
              className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-sky-300 via-cyan-400 via-60% to-purple-500 shadow-[0_0_25px_rgba(56,189,248,0.45)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
