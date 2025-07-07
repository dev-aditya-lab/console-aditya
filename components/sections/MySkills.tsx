import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import {  
      IconBrandTypescript,
  IconBrandJavascript,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandFirebase,
  IconApi,
  IconDatabase,
  IconBrandMongodb,
    IconBrandGithub,
  IconBrandVercel,
  IconBrandVisualStudio,
  IconBrandFigma,
  IconBrandGit,
  IconCloud,
 } from "@tabler/icons-react";

export default function MySkills() {

 const lang = [
  {
    quote: "TypeScript",
    icon: <IconBrandTypescript size={24} />,
  },
  {
    quote: "JavaScript",
    icon: <IconBrandJavascript size={24} />,
  },
  {
    quote: "HTML",
    icon: <IconBrandHtml5 size={24} />,
  },
  {
    quote: "CSS",
    icon: <IconBrandCss3 size={24} />,
  },
  {
    quote: "React",
    icon: <IconBrandReact size={24} />,
  },
  {
    quote: "Next.js",
    icon: <IconBrandNextjs size={24} />,
  },
  {
    quote: "Node.js",
    icon: <IconBrandNodejs size={24} />,
  },
];
 const backend = [
  {
    quote: "Node.js",
    icon: <IconBrandNodejs size={24} />,
  },
  {
    quote: "Firebase",
    icon: <IconBrandFirebase size={24} />,
  },
  {
    quote: "REST API",
    icon: <IconApi size={24} />,
  },
    {
    quote: "MySQL",
    icon: <IconDatabase size={24} />,
  },
    {
    quote: "MongoDB",
    icon: <IconBrandMongodb size={24} />,
  },
];

const tools = [
  {
    quote: "Git",
    icon: <IconBrandGit size={24} />,
  },
  {
    quote: "GitHub",
    icon: <IconBrandGithub size={24} />,
  },
  {
    quote: "Vercel",
    icon: <IconBrandVercel size={24} />,
  },
  {
    quote: "VS Code",
    icon: <IconBrandVisualStudio size={24} />,
  },
  {
    quote: "Figma",
    icon: <IconBrandFigma size={24} />,
  },
  {
    quote: "Postman",
    icon: <IconCloud size={24} />,
  },
];


	return (
		<div >
			<div className="mx-auto w-full flex flex-col items-center justify-center">
					<h1 className="ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full text-lg font-medium text-white bg-gradient-to-l from-blue-500 to-purple-600 shadow-lg hover:from-purple-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="skills">
						My Strengths
					</h1>
				<div id="contact" className="md:w-4xl max-w-screen px-5 md:px-0 z-10 py-10">
                    <InfiniteMovingCards
        items={lang}
        direction="right"
        speed="fast"
      />
                    <InfiniteMovingCards
        items={backend}
        direction="left"
        speed="fast"
      />
                    <InfiniteMovingCards
        items={tools}
        direction="right"
        speed="normal"
      />
				</div>
			</div>
		</div>
	);
}
