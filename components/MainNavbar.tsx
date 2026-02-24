"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Github, Menu, X } from "lucide-react";

const navItems = [
	{ name: "Home", href: "/#home" },
	{ name: "About", href: "/#about" },
	{ name: "Projects", href: "/#projects" },
	{ name: "Skills", href: "/#skills" },
	{ name: "Contact", href: "/#contact" },
	{ name: "Blog", href: "/blog" },
];

export function MainNavbar() {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState<string>("/#home");

	useEffect(() => {
		const setFromLocation = () => {
			const hash = window.location.hash || "/#home";
			const path = window.location.pathname;
			if (path.startsWith("/blog")) setActive("/blog");
			else setActive(`/${hash.replace(/^#/, "") ? hash : "#home"}`);
		};
		setFromLocation();
		window.addEventListener("hashchange", setFromLocation);
		return () => window.removeEventListener("hashchange", setFromLocation);
	}, []);

	const handleNav = (href: string) => {
		setActive(href);
		setOpen(false);
	};

	return (
		<header className="sticky top-0 z-50 w-full">
			<div className="relative border-b border-white/10 bg-[#161616]/90 backdrop-blur-xl">

				<div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white md:px-10 lg:px-12">
					<Link href="/#home" className="inline-flex items-center gap-2.5" onClick={() => handleNav("/#home")}>
						<div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/15 bg-white/10">
							<Image src="/logo.jpg" alt="Aditya Gupta" fill className="object-cover" />
						</div>
						<span className="hidden text-sm font-semibold uppercase tracking-[0.2em] text-white/90 md:inline">Aditya</span>
					</Link>

					<nav className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 md:flex">
						{navItems.map((item) => {
							const isActive = active === item.href;
							const isAnchor = item.href.startsWith("/#");
							const linkContent = (
								<span
									className={`relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition ${
										isActive
											? "bg-white text-black"
											: "text-slate-200/80 hover:bg-white/10 hover:text-white"
									}`}
								>
									{item.name}
								</span>
							);

							return isAnchor ? (
								<a key={item.name} href={item.href} onClick={() => handleNav(item.href)}>
									{linkContent}
								</a>
							) : (
								<Link key={item.name} href={item.href} onClick={() => handleNav(item.href)}>
									{linkContent}
								</Link>
							);
						})}
					</nav>

					<div className="hidden items-center gap-2 md:flex">
						<a
							href="https://github.com/dev-aditya-lab"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
						>
							<Github className="h-4 w-4" />
							<span>GitHub</span>
						</a>
						<a
							href="mailto:hello@devaditya.dev"
							className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
						>
							Hire Me
							<ArrowUpRight className="h-4 w-4" />
						</a>
					</div>

					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 transition hover:bg-white/10 md:hidden"
						aria-label="Toggle menu"
					>
						{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					</button>
				</div>

				{open && (
					<div className="relative border-t border-white/10 bg-black/70 backdrop-blur-xl md:hidden">
						<div className="mx-auto max-w-7xl space-y-1 px-6 py-4">
							{navItems.map((item) => {
								const isAnchor = item.href.startsWith("/#");
								const common =
									"block rounded-lg px-3 py-2 text-base font-medium text-slate-200/80 hover:bg-white/10 hover:text-white";
								return isAnchor ? (
									<a key={item.name} href={item.href} onClick={() => handleNav(item.href)} className={common}>
										{item.name}
									</a>
								) : (
									<Link key={item.name} href={item.href} onClick={() => handleNav(item.href)} className={common}>
										{item.name}
									</Link>
								);
							})}
							<div className="pt-2">
								<a
									href="https://github.com/dev-aditya-lab"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium"
								>
									<Github className="h-4 w-4" />
									GitHub
								</a>
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
