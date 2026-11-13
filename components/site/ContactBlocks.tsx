"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { DrawIcon } from "@/components/motion/DrawIcon";
import { TiltCard } from "@/components/motion/TiltCard";
import { SocialIcon } from "@/components/site/icons";
import { ArrowIcon } from "@/components/site/Button";
import { siteConfig, socials } from "@/data/site";

/** Giant email link with a magnetic copy-to-clipboard button. */
export function EmailBlock() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  };

  return (
    <div className="flex flex-col items-start gap-8">
      <a
        href={`mailto:${siteConfig.email}`}
        data-cursor="Email"
        className="group font-display text-[clamp(1.8rem,6.6vw,6.5rem)] font-semibold leading-none tracking-tight"
      >
        <span className="u-link break-all">{siteConfig.email}</span>
      </a>
      <Magnetic strength={0.35} innerStrength={0.2}>
        <button
          onClick={copy}
          className="group label inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-4 transition-colors duration-500 hover:bg-ink hover:text-white"
          aria-live="polite"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied to clipboard" : "Copy email address"}
        </button>
      </Magnetic>
    </div>
  );
}

/** Grid of tilting social cards with stroke-drawn icons. */
export function SocialCards() {
  return (
    <Reveal stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {socials.map((s) => (
        <TiltCard key={s.label} max={10} lift={18} className="rounded-3xl" bodyClassName="rounded-3xl">
          <a
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group gloss flex min-h-44 flex-col justify-between rounded-3xl p-7 transition-colors duration-500 hover:bg-ink hover:text-white"
          >
            <div className="flex items-start justify-between">
              <DrawIcon className="tilt-z-lg h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white">
                <SocialIcon iconKey={s.iconKey} className="h-6 w-6" />
              </DrawIcon>
              <ArrowIcon className="text-2xl" />
            </div>
            <div className="tilt-z-md">
              <p className="label mb-1 text-muted-foreground transition-colors duration-500 group-hover:text-white/60">{s.label}</p>
              <p className="font-display text-xl font-medium tracking-tight">{s.handle}</p>
            </div>
          </a>
        </TiltCard>
      ))}
    </Reveal>
  );
}
