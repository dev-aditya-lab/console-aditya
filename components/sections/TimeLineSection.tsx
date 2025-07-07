import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineSection() {
  const data = [
    {
      title: "2021",
      content: (
        <div>
          <h1 className="mb-8 text-lg font-bold  text-neutral-800  dark:text-neutral-200">
           Started Diploma in Electrical & Electronics Engineering
          </h1>
           <hr />
          <p>
            Completed 10th and took admission at BIT Mesra, Ranchi. This is where my journey into engineering and technical learning began.
          </p>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
                <div>
          <h1 className="mb-8 text-lg font-bold  text-neutral-800  dark:text-neutral-200">
           My First Dev Machine 💻
          </h1>
           <hr />
          <p>
            Purchased my first laptop and began learning programming fundamentals. This marked the real beginning of my passion for web development.
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
                <div>
          <h1 className="mb-8 text-lg font-bold  text-neutral-800  dark:text-neutral-200">
           Started My Web Development Journey 🌐
          </h1>
           <hr />
          <p>
            This was the year I took my first real step into the world of web development.
I began learning the building blocks of the web — HTML, CSS, and JavaScript — and started creating small yet functional websites.
<br />
From writing my first {`<div>`} to styling layouts with CSS and adding interactivity through JS, I slowly started turning ideas into visual experiences.
<br />
I spent countless hours exploring the browser console, breaking things, fixing them, and learning by doing.
<br />
This phase not only taught me the core fundamentals of frontend development but also made me realize how much I enjoy solving problems and building user-friendly interfaces.
          </p>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
                <div>
          <h1 className="mb-8 text-lg font-bold  text-neutral-800  dark:text-neutral-200">
           Shifted Gears: EEE → CSE 🚀
          </h1>
           <hr />
          <p>
       After completing my diploma in Electrical & Electronics Engineering, I took the leap and joined Ramgarh Engineering College for B.Tech in Computer Science Engineering.
<br />
This was the year I fully embraced my passion for development — I shifted my focus to building full-stack web applications using React, Next.js, Node.js, and Firebase.
<br />

From frontend finesse to backend logic, I started crafting projects that weren’t just visually appealing but also functionally solid. I explored component-driven architecture, API design, and deployment workflows.
<br />

This transition marked a major shift — from just learning tech to actually shipping real, impactful solutions.
          </p>
        </div>
      ),
    },
    {
      title: "Entry for 2025",
      content: (
                <div>
          <h1 className="mb-8 text-lg font-bold  text-neutral-800  dark:text-neutral-200">
           Built, Branded, Published 🛠️
          </h1>
           <hr />
          <p>
2025 has been all about turning skills into meaningful products.
I launched my developer portfolio — consoleAditya.dev — a reflection of my journey, skills, and coding style.
<br />
This year, I also built and launched one of my favorite personal projects: webdev-power-kit, a modular toolkit packed with powerful browser utilities and developer-centric features. It was built with scalability, clean code architecture, and an open-source mindset.
<br />

From idea to execution, I focused on creating things that are useful, well-documented, and ready to help others in the dev community.
<br />
This phase truly shaped my identity as a full-stack developer who doesn&apos;t just build projects — but crafts experiences.
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
