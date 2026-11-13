"use client";

import type React from "react";
import {
  IconApi,
  IconBrandCss3,
  IconBrandFigma,
  IconBrandFirebase,
  IconBrandGit,
  IconBrandGithub,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandVisualStudio,
  IconCloud,
  IconDatabase,
} from "@tabler/icons-react";
import { DrawIcon } from "@/components/motion/DrawIcon";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { skills, type SkillItem } from "@/data/site";

const iconMap: Record<string, React.ElementType> = {
  typescript: IconBrandTypescript,
  javascript: IconBrandJavascript,
  react: IconBrandReact,
  nextjs: IconBrandNextjs,
  html5: IconBrandHtml5,
  css3: IconBrandCss3,
  nodejs: IconBrandNodejs,
  api: IconApi,
  firebase: IconBrandFirebase,
  mongodb: IconBrandMongodb,
  mysql: IconDatabase,
  git: IconBrandGit,
  github: IconBrandGithub,
  vercel: IconBrandVercel,
  vscode: IconBrandVisualStudio,
  figma: IconBrandFigma,
  postman: IconCloud,
};

/** One tile: stroke-drawn icon + label, tilts in 3D and pops forward on hover. */
export function SkillTile({ item }: { item: SkillItem }) {
  const Icon = iconMap[item.iconKey] ?? IconApi;
  return (
    <TiltCard max={16} lift={22} className="rounded-3xl" bodyClassName="rounded-3xl">
      <div className="group gloss flex aspect-[5/4] flex-col items-center justify-center gap-4 rounded-3xl p-4 transition-colors duration-500 hover:bg-ink">
        <DrawIcon className="tilt-z-lg text-ink transition-colors duration-500 group-hover:text-white">
          <Icon size={44} stroke={1.3} />
        </DrawIcon>
        <span className="tilt-z-md label text-ink/70 transition-colors duration-500 group-hover:text-white">{item.label}</span>
      </div>
    </TiltCard>
  );
}

/** Compact icon grid with every skill — used on the landing page. */
export function SkillCloud() {
  const all = skills.groups.flatMap((g) => g.items);
  return (
    <Reveal stagger={0.04} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-6">
      {all.map((s) => (
        <SkillTile key={s.label} item={s} />
      ))}
    </Reveal>
  );
}

/** Grouped skill sections with descriptions — used on /skills. */
export function SkillGroups() {
  return (
    <div className="space-y-24 md:space-y-32">
      {skills.groups.map((g, gi) => (
        <section key={g.title} className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal y={24}>
              <p className="label mb-4 text-accent">{String(gi + 1).padStart(2, "0")}</p>
              <h3 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">{g.title}</h3>
              <p className="mt-4 max-w-xs text-lg leading-relaxed text-muted-foreground">{g.description}</p>
            </Reveal>
          </div>
          <Reveal stagger={0.07} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:col-span-8">
            {g.items.map((s) => (
              <SkillTile key={s.label} item={s} />
            ))}
          </Reveal>
        </section>
      ))}
    </div>
  );
}
