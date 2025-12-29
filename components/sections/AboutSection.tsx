import React from "react";
import Image from "next/image";
import { BookOpen, Code2, Award, Users, Calendar, MapPin } from "lucide-react";

const skills = {
  frontend: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux"],
  backend: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Firebase", "Prisma"],
  tools: ["Git", "Docker", "Postman", "VS Code", "GitHub Actions"],
};

const education = [
  {
    degree: "B.Tech Computer Science and Engineering",
    institution: "Ramgarh Engineering College",
    year: "2027",
    location: "Ramgarh, JH",
  },
  {
    degree: "Diploma",
    institution: "Birla Institute of Technology",
    year: "2024",
    location: "Mesra Ranchi, JH",
  },
];

const achievements = [
  "Built 10+ production web applications",
  "Active contributor in developer communities",
  "Won multiple hackathon challenges",
  "Mentored peers in web development",
];

export function AboutSection() {
  return (
    <section id="about" className="relative -mt-1 overflow-hidden bg-white py-20 md:py-28 dark:bg-neutral-900">
      {/* Gradient fade overlay at top for smooth transition */}
      <div className="absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-neutral-950/10 to-transparent dark:from-neutral-950/30" aria-hidden />
      
      {/* Decorative elements */}
      <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-900/20" aria-hidden />
      <div className="absolute bottom-1/4 left-0 h-72 w-72 rounded-full bg-purple-100/40 blur-3xl dark:bg-purple-900/20" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Users className="h-4 w-4" />
            Get to know me
          </div>
          <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
            About Me
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Computer Science student passionate about crafting elegant web solutions
          </p>
        </div>

        {/* Main Content */}
        <div className="mb-16 flex flex-col items-center gap-8 md:flex-row md:items-start">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-75 blur dark:opacity-50" aria-hidden />
            <div className="relative h-48 w-48 overflow-hidden rounded-3xl border-4 border-white shadow-2xl dark:border-slate-800">
              <Image
                src="/logo.jpg"
                alt="Aditya Gupta"
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">
                Aditya Gupta
              </h3>
              <p className="text-lg text-blue-600 dark:text-blue-400">
                Full-Stack Web Developer
              </p>
            </div>
            
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <p className="leading-relaxed">
                Hi! I&apos;m a Computer Science Engineering student at Jaypee Institute of Information Technology, passionate about building impactful web applications. I specialize in crafting full-stack solutions using modern technologies like React, Next.js, Node.js, and TypeScript.
              </p>
              <p className="leading-relaxed">
                Whether it&apos;s building scalable platforms, collaborating in hackathons, or contributing to open-source, I thrive in fast-paced environments that demand problem-solving and creativity. I&apos;m constantly exploring new tech and turning ideas into real-world solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Education Cards */}
        <div className="mb-12 space-y-4">
          {education.map((edu, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/50 shadow-lg dark:border-slate-700 dark:from-slate-800 dark:to-slate-800/50"
            >
              <div className="flex items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-bold text-slate-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="mb-1 text-slate-700 dark:text-slate-300">
                    {edu.institution}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {edu.year}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {edu.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="mb-12">
          <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
            <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Technical Skills
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
                Frontend
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
                Backend
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h4 className="mb-4 font-semibold text-slate-900 dark:text-white">
                Tools & Others
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
            <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Highlights
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-xs font-bold text-white">
                  ✓
                </div>
                <p className="text-slate-700 dark:text-slate-300">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
