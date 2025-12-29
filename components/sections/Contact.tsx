"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Copy, Github, Linkedin, Mail, PhoneForwarded, Twitter } from "lucide-react";

export function Contact() {
	const email = "hello@devaditya.dev";
	const phone = "+91 933 428 2988";
	const [copied, setCopied] = useState<"none" | "email" | "phone">("none");

	const copyToClipboard = async (text: string, type: "email" | "phone") => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(type);
			setTimeout(() => setCopied("none"), 2000);
		} catch {
			setCopied("none");
		}
	};

	return (
		<section id="contact" className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950">
			<div className="absolute inset-0 opacity-70" aria-hidden>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.16),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.14),transparent_35%)]" />
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
			</div>

			<div className="relative mx-auto w-full max-w-6xl px-6 py-16 text-white md:px-10 lg:px-12">
				<div className="mx-auto max-w-2xl text-center">
					<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-blue-100/80">
						Let&apos;s connect
						<ArrowUpRight className="h-4 w-4" />
					</span>
					<h2 className="mt-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl">Let&apos;s build something cool together</h2>
					<p className="mx-auto mt-3 max-w-xl text-slate-200/80">I’m always up for tech conversations, collaborations, or just a good meme. Reach out on your favorite platform below.</p>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<a href={`mailto:${email}`} className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/30 hover:bg-white/10">
						<div className="flex items-center justify-between">
							<div className="inline-flex items-center gap-3">
								<Mail className="h-5 w-5 text-emerald-300" />
								<span className="font-semibold">Email</span>
							</div>
							<ArrowUpRight className="h-4 w-4 text-white/70 transition group-hover:text-white" />
						</div>
						<p className="mt-2 text-sm text-slate-200/70">{email}</p>
						<button
							type="button"
							onClick={() => copyToClipboard(email, "email")}
							className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200/80 transition hover:border-white/30 hover:bg-white/10"
						>
							<Copy className="h-4 w-4" />
							{copied === "email" ? "Copied" : "Copy"}
						</button>
					</a>

					<a href={`tel:${phone}`} className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/30 hover:bg-white/10">
						<div className="flex items-center justify-between">
							<div className="inline-flex items-center gap-3">
								<PhoneForwarded className="h-5 w-5 text-indigo-300" />
								<span className="font-semibold">Phone</span>
							</div>
							<ArrowUpRight className="h-4 w-4 text-white/70 transition group-hover:text-white" />
						</div>
						<p className="mt-2 text-sm text-slate-200/70">{phone}</p>
						<button
							type="button"
							onClick={() => copyToClipboard(phone, "phone")}
							className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200/80 transition hover:border-white/30 hover:bg-white/10"
						>
							<Copy className="h-4 w-4" />
							{copied === "phone" ? "Copied" : "Copy"}
						</button>
					</a>

					<a href="https://www.linkedin.com/in/aditya-gupta9608/" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/30 hover:bg-white/10">
						<div className="flex items-center justify-between">
							<div className="inline-flex items-center gap-3">
								<Linkedin className="h-5 w-5 text-sky-300" />
								<span className="font-semibold">LinkedIn</span>
							</div>
							<ArrowUpRight className="h-4 w-4 text-white/70 transition group-hover:text-white" />
						</div>
						<p className="mt-2 text-sm text-slate-200/70">Aditya Gupta</p>
					</a>

					<a href="https://github.com/dev-aditya-lab" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/30 hover:bg-white/10">
						<div className="flex items-center justify-between">
							<div className="inline-flex items-center gap-3">
								<Github className="h-5 w-5 text-white" />
								<span className="font-semibold">GitHub</span>
							</div>
							<ArrowUpRight className="h-4 w-4 text-white/70 transition group-hover:text-white" />
						</div>
						<p className="mt-2 text-sm text-slate-200/70">dev-aditya-lab</p>
					</a>

					<a href="https://x.com/dev_aditya_x" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/30 hover:bg-white/10">
						<div className="flex items-center justify-between">
							<div className="inline-flex items-center gap-3">
								<Twitter className="h-5 w-5 text-blue-300" />
								<span className="font-semibold">X (Twitter)</span>
							</div>
							<ArrowUpRight className="h-4 w-4 text-white/70 transition group-hover:text-white" />
						</div>
						<p className="mt-2 text-sm text-slate-200/70">@dev_aditya_x</p>
					</a>

					<Link href="/blog" className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/30 hover:bg-white/10">
						<div className="flex items-center justify-between">
							<div className="inline-flex items-center gap-3">
								<BookOpen className="h-5 w-5 text-purple-300" />
								<span className="font-semibold">Blog</span>
							</div>
							<ArrowUpRight className="h-4 w-4 text-white/70 transition group-hover:text-white" />
						</div>
						<p className="mt-2 text-sm text-slate-200/70">Articles, tutorials and insights</p>
					</Link>
				</div>

				<div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-blue-100/80">
					<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
						<span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
						Open for collaborations
					</span>
					<a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-sky-400 to-indigo-500 px-3 py-1 font-semibold text-white transition hover:translate-y-[-1px]">
						Say hello
						<ArrowUpRight className="h-4 w-4" />
					</a>
				</div>
			</div>
		</section>
	);
}
