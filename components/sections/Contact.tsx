import { cn } from "@/lib/utils";
import React from "react";
import { FloatingDock } from "../ui/floating-dock";
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandX, IconMail } from "@tabler/icons-react";


export function Contact() {
	const links = [
		{
			title: "LinkedIn",
			icon: (
				<IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "https://www.linkedin.com/in/aditya-gupta9608/",
		},

		{
			title: "GitHub",
			icon: (
				<IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "https://github.com/dev-aditya-lab",
		},
		{
			title: "X",
			icon: (
				<IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "https://x.com/dev_aditya_x",
		},
		{
			title: "Email",
			icon: (
				<IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "mailto:ad1123itya@gmail.com",
		},

		{
			title: "Instagram",
			icon: (
				<IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "https://www.instagram.com/_its._.aadi/",
		},
	];
	return (
		<div className="relative flex h-fit w-full items-center justify-center bg-white dark:bg-black">
			<div
				className={cn(
					"absolute inset-0",
					"[background-size:40px_40px]",
					"[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
					"dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
				)}
			/>
			{/* Radial gradient for the container to give a faded look */}
			<div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
			<div className="mx-auto w-full flex flex-col items-center justify-center">
				<div id="contact" className="md:w-4xl px-5 md:px-0 z-10 py-10">
					<h1 className="text-center font-bold text-2xl md:text-4xl underline text-zinc-300 underline-offset-2">
						Let&apos;s connect and build something cool together.
					</h1>
					<p className="pt-10 text-center text-lg">
						I’m always up for tech conversations, collaborations, or
						just a good meme. Reach out to me through the platforms
						below:
					</p>
				</div>
				<div className="flex items-center justify-center h-fit my-10 w-full">
					<FloatingDock items={links} />
				</div>
			</div>
		</div>
	);
}
