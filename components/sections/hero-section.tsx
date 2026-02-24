"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import React from "react";
import {
	ArrowRight,
	Github,
	Linkedin,
	Mail,
	Mouse,
} from "lucide-react";

export default function HeroSection() {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const smoothX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.4 });
	const smoothY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.4 });

	const glowX = useTransform(smoothX, [-1, 1], [-180, 180]);
	const glowY = useTransform(smoothY, [-1, 1], [-140, 140]);
	const floatFastX = useTransform(smoothX, [-1, 1], [-20, 20]);
	const floatFastY = useTransform(smoothY, [-1, 1], [-14, 14]);
	const floatSlowX = useTransform(smoothX, [-1, 1], [-10, 10]);
	const floatSlowY = useTransform(smoothY, [-1, 1], [-8, 8]);

	const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
		const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
		mouseX.set(Math.max(-1, Math.min(1, x)));
		mouseY.set(Math.max(-1, Math.min(1, y)));
	};

	const handleMouseLeave = () => {
		mouseX.set(0);
		mouseY.set(0);
	};

	return (
		<section className="relative isolate overflow-hidden bg-[#161616] text-white">
			<div aria-hidden className="absolute inset-0">
				<div className="absolute left-[33.3%] top-0 h-full w-px bg-white/10" />
				<div className="absolute left-[66.6%] top-0 h-full w-px bg-white/10" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.18),transparent_45%)]" />
			</div>

			<div
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				className="relative mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-7xl flex-col items-center justify-center px-6 py-16 md:px-10 lg:px-12"
			>
				<motion.div
					aria-hidden
					style={{ x: glowX, y: glowY }}
					className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/15 blur-3xl"
				/>

				<motion.div
					style={{ x: floatFastX, y: floatFastY }}
					animate={{ y: [0, -10, 0] }}
					transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
					className="absolute left-4 top-20 hidden w-28 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-xl md:block"
				>
					<div className="relative h-36 w-full">
						<Image src="https://res.cloudinary.com/di77yygcs/image/upload/v1767108660/blog/feltdmhbzaye8plifhnx.png" alt="dummy visual" fill sizes="112px" className="object-cover" />
					</div>
				</motion.div>
				<motion.div
					style={{ x: floatSlowX, y: floatSlowY }}
					animate={{ y: [0, 8, 0] }}
					transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
					className="absolute right-8 top-28 hidden w-36 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-xl md:block"
				>
					<div className="relative h-36 w-full">
						<Image src="https://res.cloudinary.com/di77yygcs/image/upload/v1766586677/blog/mzo1jahfhuowzm1vcxbc.png" alt="dummy visual" fill sizes="144px" className="object-cover" />
					</div>
				</motion.div>
				<motion.div
					style={{ x: floatSlowX, y: floatFastY }}
					animate={{ y: [0, -9, 0] }}
					transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
					className="absolute bottom-24 left-6 hidden w-44 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-xl md:block"
				>
					<div className="relative h-28 w-full">
						<Image src="https://res.cloudinary.com/di77yygcs/image/upload/v1766575746/blog/g78jfjcswnpws7ie9awv.png" alt="dummy visual" fill sizes="176px" className="object-cover" />
					</div>
				</motion.div>
				<motion.div
					style={{ x: floatFastX, y: floatSlowY }}
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
					className="absolute bottom-20 right-5 hidden w-32 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-xl md:block"
				>
					<div className="relative h-40 w-full">
						<Image src="https://res.cloudinary.com/di77yygcs/image/upload/v1766586341/blog/waeg4wvsx52drmnaargq.png" alt="dummy visual" fill sizes="128px" className="object-cover" />
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="relative z-10 mx-auto max-w-4xl space-y-7 text-center"
				>
					<div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-slate-100/85 backdrop-blur">
						Aditya Gupta · Full Stack Developer
					</div>

					<h1 className="text-balance text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
						<span className="block">Build. Ship. Scale.</span>
						<span className="block bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">
							Modern Digital Products
						</span>
						<span className="block text-white/75">With Performance-First Engineering</span>
					</h1>

					<p className="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg">
						I craft high-quality web apps with Next.js, TypeScript, Node.js, and MongoDB — clean architecture, smooth UX, and production-ready execution.
					</p>

					<div className="flex flex-wrap items-center justify-center gap-3">
						<a
							href="#projects"
							className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
						>
							View Work
							<ArrowRight className="h-4 w-4" />
						</a>
						<a
							href="mailto:hello@devaditya.dev"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
						>
							Let&apos;s Talk
							<Mail className="h-4 w-4" />
						</a>
					</div>

					<div className="flex items-center justify-center gap-2 pt-1">
						<a
							href="https://www.linkedin.com/in/aditya-gupta9608/"
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
							aria-label="LinkedIn"
						>
							<Linkedin className="h-5 w-5 transition group-hover:scale-110" />
						</a>
						<a
							href="https://github.com/gupta00068"
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
							aria-label="GitHub"
						>
							<Github className="h-5 w-5 transition group-hover:scale-110" />
						</a>
						<a
							href="mailto:hello@devaditya.dev"
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
							aria-label="Email"
						>
							<Mail className="h-5 w-5 transition group-hover:scale-110" />
						</a>
					</div>

					<div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/70">
						<Mouse className="h-3.5 w-3.5" />
						Move your mouse
					</div>
				</motion.div>

				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/55">
					<div className="flex h-11 w-6 items-start justify-center rounded-full border border-white/30 p-1">
						<motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="h-2 w-2 rounded-full bg-white/80" />
					</div>
				</div>
			</div>
		</section>
	);
}
