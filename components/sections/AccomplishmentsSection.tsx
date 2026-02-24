"use client";

import { motion } from "motion/react";
import { Award, Trophy } from "lucide-react";

const accomplishments = [
	{
		title: "Winner – BIT NISHAN'23",
		subtitle: "Business Ideas Pitching Competition",
		description:
			"Pitched an innovative business idea and secured ₹10,000 seed funding and ₹50,000 grant funding, highlighting strong innovation, leadership, and entrepreneurial mindset.",
		icon: Trophy,
	},
	{
		title: "Winner – Anveshan- The Tech-Fest",
		subtitle: "1st Prize",
		description: "Recognized for technical excellence and innovation.",
		icon: Trophy,
	},
	{
		title: "Winner - DECTHON 2026",
		subtitle: "Software Hackathon (2nd Prize - ₹15,000)",
		description:
			"Built a true Autonomous AI Agent that can understand a goal, plan actions, use tools, and execute tasks with minimal human input.",
		icon: Award,
	},
	{
		title: "Winner - Hack-2Hire",
		subtitle: "1st Prize by Beetlex and Trikaya",
		description:
			"Won India's first hiring-focused hackathon for developing Whisp Chat — a secure and anonymous chat platform ensuring privacy through end-to-end encryption and local data storage.",
		icon: Trophy,
	},
];

export function AccomplishmentsSection() {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-blue-950 py-20 text-white">
			<div className="absolute inset-0 opacity-70" aria-hidden>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.14),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.12),transparent_35%)]" />
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
			</div>

			<div className="relative mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
				<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
					<div className="flex items-center gap-3 mb-4">
						<Award className="h-8 w-8 text-yellow-400" />
						<span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-blue-100/80">
							Recognition & Achievements
						</span>
					</div>
					<h2 className="text-3xl md:text-4xl font-semibold leading-tight">Accomplishments & Awards</h2>
					<p className="text-slate-200/75 mt-2">Recognition of innovation, technical excellence, and entrepreneurial achievement.</p>
				</motion.div>

				<div className="grid gap-4 md:grid-cols-2">
					{accomplishments.map((item, idx) => {
						const IconComponent = item.icon;
						return (
							<motion.div
								key={idx}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								viewport={{ once: true }}
								className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
							>
								<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/5 to-violet-400/5 opacity-0 transition group-hover:opacity-100" aria-hidden />

								<div className="relative space-y-3">
									<div className="flex items-start justify-between gap-3">
										<div className="flex-1">
											<h4 className="text-lg font-semibold text-white">{item.title}</h4>
											<p className="text-sm text-blue-300/90 font-medium mt-1">{item.subtitle}</p>
										</div>
										<IconComponent className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
									</div>
									<p className="text-sm text-slate-200/80 leading-relaxed">{item.description}</p>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
