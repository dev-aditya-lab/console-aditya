"use client";
import {
	Navbar,
	NavBody,
	NavItems,
	MobileNav,
	NavbarLogo,
	NavbarButton,
	MobileNavHeader,
	MobileNavToggle,
	MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { GithubIcon, SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";

export function MainNavbar() {
	const navItems = [
		{
			name: "Home",
			link: "/#home",
		},
		{
			name: "About",
			link: "/#about",
		},
		{
			name: "Projects",
			link: "/#projects",
		},
		{
			name: "Skills",
			link: "/#skills",
		},
		{
			name: "Contact",
			link: "/#contact",
		},
		{
			name: "Blog",
			link: "/blog",
		},
	];

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className="relative w-full bg-black">
			<Navbar>
				{/* Desktop Navigation */}
				<NavBody>
					<NavbarLogo />
					<NavItems items={navItems} />
					<div className="flex items-center gap-4">
						<NavbarButton
							target="_blank"
							className="flex gap-2 items-center justify-between"
							href="https://www.npmjs.com/package/webdev-power-kit"
							variant="gradient"
						>
							Use webdev-power-kit <SquareArrowOutUpRight />
						</NavbarButton>
						<NavbarButton
							variant="primary"
							target="_blank"
							href="https://github.com/dev-aditya-lab"
							className="flex gap-2 items-center justify-between"
						>
							GitHub
							<GithubIcon />
						</NavbarButton>
					</div>
				</NavBody>

				{/* Mobile Navigation */}
				<MobileNav>
					<MobileNavHeader>
						<NavbarLogo />
						<MobileNavToggle
							isOpen={isMobileMenuOpen}
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
						/>
					</MobileNavHeader>

					<MobileNavMenu
						isOpen={isMobileMenuOpen}
						onClose={() => setIsMobileMenuOpen(false)}
					>
						{navItems.map((item, idx) => (
							<a
								key={`mobile-link-${idx}`}
								href={item.link}
								onClick={() => setIsMobileMenuOpen(false)}
								className="relative text-neutral-600 dark:text-neutral-300"
							>
								<span className="block">{item.name}</span>
							</a>
						))}
						<div className="flex w-full flex-col gap-4">
							<NavbarButton
								onClick={() => setIsMobileMenuOpen(false)}
								target="_blank"
								className="flex gap-2 items-center justify-between"
								href="https://www.npmjs.com/package/webdev-power-kit"
								variant="gradient"
							>
								Use webdev-power-kit <SquareArrowOutUpRight />
							</NavbarButton>
							<NavbarButton
								onClick={() => setIsMobileMenuOpen(false)}
								variant="primary"
								target="_blank"
								className="flex gap-2 items-center justify-between"
							>
								GitHub
								<GithubIcon />
							</NavbarButton>
						</div>
					</MobileNavMenu>
				</MobileNav>
			</Navbar>
			{/* <DummyContent /> */}

			{/* Navbar */}
		</div>
	);
}
