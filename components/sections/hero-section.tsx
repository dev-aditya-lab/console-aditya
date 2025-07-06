"use client";

import { motion } from "motion/react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import React from "react";
import {  LinkedinIcon, PhoneForwarded } from "lucide-react";

export default function HeroSection() {
	return (
		<div className="relative min-h-[calc(100vh-55px)] bg-black   mx-auto flex  flex-col items-center justify-center">
			<div className="px-4 py-10 md:py-20">
				<h1 className="relative z-10 mx-auto max-w-4xl text-center   text-slate-700  dark:text-slate-300">
					<div className="flex justify-center mb-4">
						<HoverBorderGradient
							duration={0.5}
							containerClassName="rounded-full"
							as="button"
							className="dark:bg-black bg-white text-black font-medium dark:text-white flex items-center space-x-2"
						>
							<span>
								{"Initializing portfolio..."
									.split(" ")
									.map((word, index) => (
										<motion.span
											key={index}
											initial={{
												opacity: 0,
												filter: "blur(4px)",
												y: 10,
											}}
											animate={{
												opacity: 1,
												filter: "blur(0px)",
												y: 0,
											}}
											transition={{
												duration: 0.3,
												delay: index * 0.1,
												ease: "easeInOut",
											}}
											className="mr-2 inline-block"
										>
											{word}
										</motion.span>
									))}
							</span>
						</HoverBorderGradient>
					</div>
			
				</h1>
				<h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
					{"Hello, I’m Aditya Gupta👨‍💻"
						.split(" ")
						.map((word, index) => (
							<motion.span
								key={index}
								initial={{
									opacity: 0,
									filter: "blur(4px)",
									y: 10,
								}}
								animate={{
									opacity: 1,
									filter: "blur(0px)",
									y: 0,
								}}
								transition={{
									duration: 0.3,
									delay: index * 0.15,
									ease: "easeInOut",
								}}
								className="mr-2 inline-block"
							>
								{word}
							</motion.span>
						))}
				</h1>
				
				<motion.p
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						duration: 0.3,
						delay: 0.8,
					}}
					className="relative z-10 mx-auto max-w-xl pt-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
				>
					A Web Developer crafting ideas into code.
				</motion.p>
				<motion.p
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						duration: 0.3,
						delay: 0.8,
					}}
					className="relative z-10 mx-auto max-w-xl text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
				>
					JavaScript • TypeScript • Next.js • Nodejs
				</motion.p>
				<motion.p
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						duration: 0.3,
						delay: 0.8,
					}}
					className="relative z-10 mx-auto max-w-xl  text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
				>
					Turning caffeine and logic into beautiful web apps ☕💻
				</motion.p>
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,
					}}
					transition={{
						duration: 0.3,
						delay: 1,
					}}
					className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
				>
				
				<a href="https://www.linkedin.com/in/aditya-gupta9608/" target="_blank" rel="noopener noreferrer">
						<button className="w-60 flex justify-center items-center gap-2 transform rounded-lg bg-blue-600 cursor-pointer px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800  dark:hover:bg-gray-600">
						Let&apos;s Connect <LinkedinIcon className="w-5"/>
					</button>
				</a>
			<a href="mailto:ad1123itya@gmail.com" target="_blank" rel="noopener noreferrer">
						<button className="w-60 flex justify-center items-center gap-2 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
						Let&apos;s build together <PhoneForwarded className="w-5"/>
					</button>
			</a>
				</motion.div>
			</div>
		</div>
	);
}
