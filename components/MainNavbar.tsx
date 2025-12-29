"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Github, Menu, X } from "lucide-react";

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
			<div className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950">
				<div className="absolute inset-0 opacity-60" aria-hidden>
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.14),transparent_35%)]" />
					<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
				</div>

				<div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white md:px-10 lg:px-12">
					<Link href="/#home" className="inline-flex items-center gap-2.5" onClick={() => handleNav("/#home")}>
						<div className="relative h-10 w-10 overflow-hidden rounded-lg border border-white/15 bg-white/10 shadow-lg shadow-blue-500/20">
							<Image src="/logo.jpg" alt="Aditya Gupta" fill className="object-cover" />
						</div>
						<span className="hidden text-base font-semibold md:inline">Aditya Gupta</span>
					</Link>

					<nav className="hidden items-center gap-1 md:flex">
						{navItems.map((item) => {
							const isActive = active === item.href;
							const isAnchor = item.href.startsWith("/#");
							const linkContent = (
								<span
									className={`relative inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
										isActive
											? "bg-white/10 text-white"
											: "text-slate-200/80 hover:bg-white/5 hover:text-white"
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
							className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium transition hover:border-white/30 hover:bg-white/10"
						>
							<Github className="h-4 w-4" />
							<span>GitHub</span>
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
					<div className="relative border-t border-white/10 bg-white/5 backdrop-blur-xl md:hidden">
						<div className="mx-auto max-w-6xl space-y-1 px-6 py-4">
							{navItems.map((item) => {
								const isAnchor = item.href.startsWith("/#");
								const common =
									"block rounded-lg px-3 py-2 text-base font-medium text-slate-200/80 hover:bg-white/5 hover:text-white";
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
									className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium"
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
