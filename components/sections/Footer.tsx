import React from "react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950 text-white">
      <div className="absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.14),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:px-10 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-200/70">Aditya Kumar Gupta</p>
            <p className="mt-2 text-lg font-semibold text-white">Made with keyboard rage & caffeine ☕, 💻, & Next.js + TypeScript</p>
            <p className="mt-1 text-sm text-slate-200/70">Shipping thoughtfully crafted web experiences, one commit at a time.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-blue-100/80">
            <a
              href="mailto:hello@devaditya.dev"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 transition hover:border-white/30 hover:bg-white/10"
            >
              <Mail className="h-4 w-4 text-emerald-300" />
              Say hello
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/aditya-gupta9608/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 transition hover:border-white/30 hover:bg-white/10"
            >
              <Linkedin className="h-4 w-4 text-sky-300" />
              LinkedIn
            </a>
            <a
              href="https://github.com/gupta00068"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 transition hover:border-white/30 hover:bg-white/10"
            >
              <Github className="h-4 w-4 text-white" />
              GitHub
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-slate-200/70 sm:flex-row">
          <p>© {year} Aditya Kumar Gupta. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">Always in build mode</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">Fueled by ☕ & commits</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
