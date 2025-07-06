import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

export function AboutSection() {
	return (
		<div className="relative  h-fit w-full   bg-white dark:bg-black">
			<div
				className={cn(
					"absolute inset-0",
					"[background-size:20px_20px]",
					"[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
					"dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
				)}
			/>
			<div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
			<div className="mx-auto w-full flex items-center justify-center">
				<div id="about" className="md:w-4xl px-5 md:px-0 z-10 py-5">
					<h1 className="text-center font-bold py-10 uppercase text-2xl text-zinc-600 underline underline-offset-2 md:text-4xl">
						About Me
					</h1>
					<div className="flex md:flex-row flex-col gap-8">
						<div className="bg-red-500 md:h-60 md:w-60 rounded-2xl border-2 border-zinc-600 overflow-hidden">
							<Image
								src="/logo.jpg"
								alt="logo"
								width={5000}
								height={5000}
								className="rounded-md w-full h-full object-cover"
							/>
						</div>
						<div className="md:flex md:flex-col md:justify-end ">
							<h1 className="text-center md:text-left font-bold uppercase text-2xl text-zinc-300  md:text-5xl">
								Aditya Kumar Gutpa
							</h1>
							<p className="text-center md:text-left text-zinc-500 pt-5 pb-2 text-sm md:text-lg">
								Currently in dev mode: College × Hackathons ×
								Learning
							</p>
							<h1 className="text-zinc-400 text-center md:text-left">
								When I’m not coding, I’m probably exploring new
								tech stacks, sharing what I learn, or helping
								others in the dev community.
							</h1>
						</div>
					</div>
					<div className="my-10">
						<p className="text-justify  text-zinc-300/90 text-lg">
							Hi, I&apos;m Aditya — a Computer Science Engineering student with a passion for building impactful web applications. I specialize in crafting full-stack solutions using modern tools like React, Next.js, Node.js, TypeScript, Firebase, and Tailwind CSS. Whether it&apos;s building scalable platforms, collaborating in hackathons, or contributing to open-source, I thrive in fast-paced environments that demand problem-solving and creativity. My development style blends clean code practices with API-first design, always keeping both functionality and user experience in focus. I&apos;m constantly exploring new tech and turning ideas into real-world solutions. Whether working solo or with a team, I enjoy pushing boundaries, learning continuously, and contributing meaningfully to the tech community. Let&apos;s build something awesome together. </p>
					</div>
				</div>
			</div>
		</div>
	);
}
