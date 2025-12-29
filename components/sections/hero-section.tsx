"use client";

import { motion } from "motion/react";
import React from "react";
import {
	ArrowUpRight,
	Code2,
	Github,
	Linkedin,
	Mail,
	PhoneForwarded,
	Sparkles,
} from "lucide-react";

export default function HeroSection() {
	return (
		<div className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950 text-white">
			<div className="absolute inset-0 opacity-70" aria-hidden>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.2),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.18),transparent_35%)]" />
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
			</div>

			<div className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-6xl flex-col justify-center px-6 py-16 md:px-10 lg:px-12">
				<div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="space-y-6"
					>
						<div className="flex flex-wrap items-center gap-3 text-sm text-blue-100/80">
							<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
								<Sparkles className="h-4 w-4 text-sky-300" />
								Shipping developer-crafted experiences
							</span>
							<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
								<div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
								Available for remote collabs
							</span>
						</div>

						<div className="space-y-3">
							<h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
								<span className="text-white/70">Hello, I&apos;m</span> <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">Aditya Gupta</span>
							</h1>
							<p className="max-w-2xl text-lg text-slate-200/80 sm:text-xl">
								Full-stack developer turning product ideas into performant, production-grade web apps with Next.js, TypeScript, and cloud-native patterns.
							</p>
						</div>

						<div className="flex flex-wrap items-center gap-3">
							<a
								href="mailto:hello@devaditya.dev"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:translate-y-[-1px] hover:shadow-blue-500/30"
							>
								Let&apos;s build together
								<ArrowUpRight className="h-4 w-4" />
							</a>
							<a
								href="#projects"
								className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-base font-semibold text-white/90 backdrop-blur transition hover:border-white/30 hover:bg-white/5"
							>
								View projects
								<Code2 className="h-4 w-4" />
							</a>
						</div>

						<div className="flex flex-wrap items-center gap-4 text-sm text-slate-200/80">
							<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
								<div className="h-2 w-2 rounded-full bg-emerald-400" />
								4+ shipped products
							</div>
							<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
								<div className="h-2 w-2 rounded-full bg-sky-400" />
								Next.js · TypeScript · Node.js
							</div>
							<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
								<div className="h-2 w-2 rounded-full bg-indigo-400" />
								Open to freelance & collabs
							</div>
						</div>

						<div className="flex items-center gap-4 pt-2 text-slate-200/80">
							<a
								href="https://www.linkedin.com/in/aditya-gupta9608/"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-white/40 hover:bg-white/10"
								aria-label="LinkedIn"
							>
								<Linkedin className="h-5 w-5 text-sky-300 transition group-hover:scale-110" />
							</a>
							<a
								href="https://github.com/gupta00068"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-white/40 hover:bg-white/10"
								aria-label="GitHub"
							>
								<Github className="h-5 w-5 text-white transition group-hover:scale-110" />
							</a>
							<a
								href="mailto:hello@devaditya.dev"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-white/40 hover:bg-white/10"
								aria-label="Email"
							>
								<Mail className="h-5 w-5 text-emerald-300 transition group-hover:scale-110" />
							</a>
							<a
								href="tel:+919334282988"
								className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-white/40 hover:bg-white/10"
								aria-label="Call"
							>
								<PhoneForwarded className="h-5 w-5 text-indigo-300 transition group-hover:scale-110" />
							</a>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.15 }}
						className="relative"
					>
						<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent blur-3xl" aria-hidden />
						<div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
							<div className="flex items-center justify-between">
								<div>
								<p className="text-xs uppercase tracking-[0.2em] text-slate-200/60">Currently building</p>
								<h3 className="mt-2 text-xl font-semibold text-white">Full-stack web applications</h3>
								<p className="text-sm text-slate-200/70">React · Next.js · Node.js · MongoDB</p>
								</div>
								<div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100">
									<span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
									Live
								</div>
							</div>

							<div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900/80 p-4">
								<div className="flex items-center justify-between text-xs text-slate-200/70">
									<span className="inline-flex items-center gap-2">
										<Code2 className="h-4 w-4 text-sky-300" />
									aditya@dev: ~/projects
								</span>
								<span>zsh</span>
							</div>
							<pre className="mt-3 whitespace-pre-wrap rounded-xl bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-900/30 p-4 text-sm leading-relaxed text-slate-100 ring-1 ring-white/5">
								<span className="text-sky-300">$</span> npm create next-app@latest my-app
								
								<span className="text-purple-300">✔</span> integrated REST APIs with secure auth
								<span className="text-purple-300">✔</span> built responsive UI with Tailwind CSS
								<span className="text-purple-300">✔</span> deployed to production with Firebase
							</pre>
						</div>
						<div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-200/80">
							<div className="rounded-2xl border border-white/10 bg-white/5 p-3">
								<p className="text-xs text-slate-200/60">Focus</p>
								<p className="text-base font-semibold text-white">Clean code, user experience</p>
							</div>
							<div className="rounded-2xl border border-white/10 bg-white/5 p-3">
								<p className="text-xs text-slate-200/60">Stack</p>
								<p className="text-base font-semibold text-white">MERN · Next.js · Firebase</p>
							</div>
						</div>
					</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
