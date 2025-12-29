import React from "react";
import {
  IconApi,
  IconBrandCss3,
  IconBrandFigma,
  IconBrandFirebase,
  IconBrandGithub,
  IconBrandGit,
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

type SkillGroup = {
  title: string;
  description: string;
  items: { label: string; icon: React.ReactElement }[];
};

const groups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Composing fast, accessible interfaces with modern React and styling systems.",
    items: [
      { label: "TypeScript", icon: <IconBrandTypescript size={22} /> },
      { label: "JavaScript", icon: <IconBrandJavascript size={22} /> },
      { label: "React", icon: <IconBrandReact size={22} /> },
      { label: "Next.js", icon: <IconBrandNextjs size={22} /> },
      { label: "HTML", icon: <IconBrandHtml5 size={22} /> },
      { label: "CSS", icon: <IconBrandCss3 size={22} /> },
    ],
  },
  {
    title: "Backend & Data",
    description: "Building APIs, auth, and data flows that stay reliable under load.",
    items: [
      { label: "Node.js", icon: <IconBrandNodejs size={22} /> },
      { label: "REST APIs", icon: <IconApi size={22} /> },
      { label: "Firebase", icon: <IconBrandFirebase size={22} /> },
      { label: "MongoDB", icon: <IconBrandMongodb size={22} /> },
      { label: "MySQL", icon: <IconDatabase size={22} /> },
    ],
  },
  {
    title: "Tools & Ops",
    description: "Shipping with tight feedback loops and solid delivery pipelines.",
    items: [
      { label: "Git", icon: <IconBrandGit size={22} /> },
      { label: "GitHub", icon: <IconBrandGithub size={22} /> },
      { label: "Vercel", icon: <IconBrandVercel size={22} /> },
      { label: "VS Code", icon: <IconBrandVisualStudio size={22} /> },
      { label: "Figma", icon: <IconBrandFigma size={22} /> },
      { label: "Postman", icon: <IconCloud size={22} /> },
    ],
  },
];

const strengths = [
  "Full-stack shipping mindset",
  "Performance-first UI",
  "Accessible, semantic markup",
  "API design & integration",
  "Testing & CI habits",
  "Docs that developers love",
];

export default function MySkills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950 text-white">
      <div className="absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.14),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-blue-100/80">
            My Strengths
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl">Tools, stacks, and habits I rely on</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-200/80">Practical, full-stack skills focused on shipping reliable products with a clean developer experience.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-200/60">{group.title}</p>
                  <p className="mt-2 text-sm text-slate-200/80">{group.description}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-100">
                {group.items.map((item) => (
                  <div key={item.label} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-200/60">How I work</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-100">
            {strengths.map((strength) => (
              <span key={strength} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 px-3 py-1 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                {strength}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
