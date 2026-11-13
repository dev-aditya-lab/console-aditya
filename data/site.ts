// All static site copy lives here — plain data, no JSX.
// Dynamic content (projects, blog posts) comes from MongoDB via models/ + app/api.
// In headlines, wrap a word in *asterisks* to render it in the serif-italic accent style.

export const siteConfig = {
  name: "Aditya Gupta",
  shortName: "Aditya",
  tagline: "Full-stack & generative-AI developer",
  url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  email: "hello@devaditya.dev",
  phone: "+91 933 428 2988",
  location: "Jharkhand, India",
  timezone: "Asia/Kolkata",
};

export type NavItem = { name: string; href: string; blurb: string };

/** Every page on the site, in menu order. */
export const pages: NavItem[] = [
  { name: "Home", href: "/", blurb: "Start here" },
  { name: "About", href: "/about", blurb: "Who's behind the keyboard" },
  { name: "Experience", href: "/experience", blurb: "Where I've built things" },
  { name: "Journey", href: "/journey", blurb: "2021 → today, year by year" },
  { name: "Skills", href: "/skills", blurb: "The stack I reach for" },
  { name: "Achievements", href: "/achievements", blurb: "Wins, pitches and podiums" },
  { name: "Projects", href: "/projects", blurb: "Things I've shipped" },
  { name: "Blog", href: "/blog", blurb: "Notes from the build log" },
  { name: "Contact", href: "/contact", blurb: "Say hello" },
];

/** Shorter list shown inline in the top bar on desktop. */
export const topNav = pages.filter((p) =>
  ["/about", "/experience", "/skills", "/projects", "/contact"].includes(p.href),
);

export const hero = {
  eyebrow: "Full-stack & generative-AI developer",
  headline: "I build web products that feel *alive*.",
  subhead:
    "Hi, I'm Aditya Gupta. I turn rough ideas into fast, polished software — and I obsess over the small details people feel but never notice.",
  ctaPrimary: { label: "See my work", href: "/projects" },
  ctaSecondary: { label: "Say hello", href: "/contact" },
  badge: "Open for collaborations",
  facts: [
    { label: "Right now", value: "Founder, Vibesites" },
    { label: "Also", value: "GenAI developer at Schoolasium" },
    { label: "Based in", value: "Jharkhand, India" },
  ],
};

export const marqueeWords = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "MongoDB",
  "Generative AI",
  "REST APIs",
  "Firebase",
  "Tailwind",
  "Motion design",
];

export const manifesto = {
  eyebrow: "Philosophy",
  text: "Great software is *quiet*. It's the scroll that never stutters, the hover that answers before you ask, the API that simply doesn't fall over. That's the craft I chase — one commit at a time.",
};

export const services = {
  eyebrow: "What I do",
  heading: "Four things I'm *really* good at",
  items: [
    {
      index: "01",
      title: "Product engineering",
      body: "End-to-end builds with Next.js, TypeScript, Node and MongoDB. From the first schema to the shipped feature, I own the whole path.",
      tags: ["Next.js", "Node.js", "MongoDB"],
    },
    {
      index: "02",
      title: "Generative-AI features",
      body: "Agents, assistants and AI-native workflows wired into real products — useful first, flashy second.",
      tags: ["AI agents", "Tooling", "Automation"],
    },
    {
      index: "03",
      title: "Interfaces that move",
      body: "Performance-first, accessible UI with motion that guides attention instead of competing for it.",
      tags: ["React", "Tailwind", "Motion"],
    },
    {
      index: "04",
      title: "APIs & data",
      body: "Clean REST design, sensible auth and data models that stay dependable when the traffic doesn't.",
      tags: ["REST", "Firebase", "MySQL"],
    },
  ],
};

export const stats = [
  { label: "Hackathons entered", value: 25, suffix: "+" },
  { label: "Students mentored", value: 100, suffix: "+" },
  { label: "Production apps shipped", value: 10, suffix: "+" },
  { label: "Pitch & hackathon wins", value: 4, suffix: "" },
];

export const about = {
  eyebrow: "About",
  heading: "Engineer by training, *builder* by habit.",
  subheading:
    "A computer-science student, founder and full-stack developer from Jharkhand who can't leave a rough edge alone.",
  photo: "/logo.jpg",
  bioParagraphs: [
    "I started out in electrical engineering, fell for the web, and never looked back. Today I build AI-native products at Schoolasium and run Vibesites, a product and web studio I founded.",
    "I'm happiest when a vague idea turns into something real and fast — whether that's a scalable platform, a hackathon prototype built overnight, or a junior developer's first working app.",
    "I also mentor students, because the quickest way to truly understand something is to explain it to somebody else.",
  ],
  highlights: [
    "10+ production web apps shipped",
    "Founder of Vibesites",
    "Multiple hackathon & pitch wins",
    "100+ students mentored",
  ],
  principles: {
    eyebrow: "How I work",
    heading: "Three habits I won't *compromise* on",
    items: [
      {
        title: "Ship early, polish relentlessly",
        body: "Get a working version in front of people fast, then keep refining until the details feel inevitable.",
      },
      {
        title: "Performance is a feature",
        body: "Speed is part of the design. If it isn't smooth on a mid-range phone, it isn't finished.",
      },
      {
        title: "Leave it understandable",
        body: "Clear structure and honest docs, so the next developer — including future me — can move quickly.",
      },
    ],
  },
};

export const education: {
  degree: string;
  institution: string;
  year: string;
  location: string;
}[] = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    institution: "Ramgarh Engineering College",
    year: "2027",
    location: "Ramgarh, JH",
  },
  {
    degree: "Diploma, Electrical & Electronics Engineering",
    institution: "Birla Institute of Technology",
    year: "2024",
    location: "Mesra, Ranchi, JH",
  },
];

export type SkillItem = { label: string; iconKey: string };
export type SkillGroup = { title: string; description: string; items: SkillItem[] };

export const skills = {
  eyebrow: "Skills",
  heading: "The *stack* I reach for",
  subheading:
    "A practical full-stack toolkit, chosen for shipping reliable products with a pleasant developer experience.",
  groups: [
    {
      title: "Frontend",
      description: "Fast, accessible interfaces built with modern React and a disciplined styling system.",
      items: [
        { label: "TypeScript", iconKey: "typescript" },
        { label: "JavaScript", iconKey: "javascript" },
        { label: "React", iconKey: "react" },
        { label: "Next.js", iconKey: "nextjs" },
        { label: "HTML", iconKey: "html5" },
        { label: "CSS", iconKey: "css3" },
      ],
    },
    {
      title: "Backend & Data",
      description: "APIs, auth and data flows that stay dependable under load.",
      items: [
        { label: "Node.js", iconKey: "nodejs" },
        { label: "REST APIs", iconKey: "api" },
        { label: "Firebase", iconKey: "firebase" },
        { label: "MongoDB", iconKey: "mongodb" },
        { label: "MySQL", iconKey: "mysql" },
      ],
    },
    {
      title: "Tools & Ops",
      description: "Tight feedback loops and a delivery pipeline I can trust.",
      items: [
        { label: "Git", iconKey: "git" },
        { label: "GitHub", iconKey: "github" },
        { label: "Vercel", iconKey: "vercel" },
        { label: "VS Code", iconKey: "vscode" },
        { label: "Figma", iconKey: "figma" },
        { label: "Postman", iconKey: "postman" },
      ],
    },
  ] satisfies SkillGroup[],
  strengthsHeading: "Beyond the tools",
  strengths: [
    "A full-stack shipping mindset",
    "Performance-first interfaces",
    "Accessible, semantic markup",
    "Thoughtful API design",
    "Generative-AI integration",
    "Documentation people actually read",
  ],
};

export type ExperienceEntry = {
  role: string;
  org: string;
  orgUrl?: string;
  location?: string;
  period: string;
  type: "venture" | "full-time" | "internship";
  bullets: string[];
};

export const experience = {
  eyebrow: "Experience",
  heading: "Where I've been *building*",
  subheading: "From founding a studio to shipping generative-AI features in production.",
  items: [
    {
      role: "Founder",
      org: "Vibesites",
      orgUrl: "https://vibesites.in",
      period: "Present",
      type: "venture",
      bullets: [
        "Running Vibesites, a product and web studio, at vibesites.in.",
        "Owning delivery end to end — scoping, engineering, design direction and the client relationship.",
      ],
    },
    {
      role: "Full Stack & Generative AI Developer",
      org: "Schoolasium Learning Technologies Pvt. Ltd.",
      location: "Ramgarh, Jharkhand",
      period: "Present",
      type: "full-time",
      bullets: [
        "Shipping full-stack features across the Schoolasium learning platform.",
        "Building generative-AI tooling and workflows that go straight into production.",
      ],
    },
    {
      role: "Full Stack Developer Intern",
      org: "Kisaan Station Private Limited",
      period: "Internship · Completed",
      type: "internship",
      bullets: [
        "Joined the engineering team and contributed full-stack features across the product.",
      ],
    },
  ] satisfies ExperienceEntry[],
  educationHeading: "Education",
};

export const leadership = {
  eyebrow: "Community",
  heading: "Beyond the *code*",
  bullets: [
    "Took part in 20+ offline and 5+ online hackathons, shipping projects against tight deadlines.",
    "Led the Aarambh Club, organising coding competitions and project exhibitions for 100+ participants.",
    "Built and maintained websites for college clubs, competitions and programmes.",
    "Mentored 100+ junior students through technical seminars and hands-on classes.",
  ],
  stats: [
    { label: "Hackathons joined", value: 25, suffix: "+" },
    { label: "Event participants", value: 100, suffix: "+" },
    { label: "Students mentored", value: 100, suffix: "+" },
  ],
};

export type Accomplishment = {
  title: string;
  subtitle: string;
  description: string;
  rank: string;
};

export const accomplishments = {
  eyebrow: "Achievements",
  heading: "Wins, pitches & *podiums*",
  subheading: "Recognition for innovation, technical depth and an entrepreneurial streak.",
  items: [
    {
      title: "BIT NISHAN'23",
      subtitle: "Business Ideas Pitching Competition",
      rank: "Winner",
      description:
        "Pitched a business idea to the judges and walked away with ₹10,000 in seed funding plus a ₹50,000 grant.",
    },
    {
      title: "Anveshan, The Tech-Fest",
      subtitle: "Tech festival",
      rank: "1st Prize",
      description: "Took first place for technical excellence and innovation.",
    },
    {
      title: "DECTHON 2026",
      subtitle: "Software hackathon",
      rank: "2nd Prize · ₹15,000",
      description:
        "Built an autonomous AI agent that understands a goal, plans its actions, uses tools and executes tasks with minimal human input.",
    },
    {
      title: "Hack-2Hire",
      subtitle: "By Beetlex & Trikaya",
      rank: "1st Prize",
      description:
        "Won India's first hiring-focused hackathon with Whisp Chat — an anonymous, end-to-end-encrypted chat app that keeps data local.",
    },
  ] satisfies Accomplishment[],
};

export type TimelineEntry = { year: string; title: string; paragraphs: string[] };

export const journey = {
  eyebrow: "Journey",
  heading: "Five years, *one* direction",
  subheading: "How a diploma student with a borrowed curiosity became a founder and AI developer.",
};

export const timeline: TimelineEntry[] = [
  {
    year: "2021",
    title: "Diploma in Electrical & Electronics",
    paragraphs: [
      "After finishing 10th, I joined BIT Mesra in Ranchi. Engineering fundamentals started here — and so did the habit of taking things apart to see how they work.",
    ],
  },
  {
    year: "2022",
    title: "The first dev machine",
    paragraphs: [
      "I bought my first laptop and started learning to program. That single purchase quietly set the direction for everything that followed.",
    ],
  },
  {
    year: "2023",
    title: "Hello, web",
    paragraphs: [
      "I wrote my first <div>, then learned HTML, CSS and JavaScript the honest way: by breaking things in the browser console and fixing them again.",
      "Small websites turned into small products, and I realised I loved building interfaces people enjoy using.",
    ],
  },
  {
    year: "2024",
    title: "Switching lanes: EEE → CSE",
    paragraphs: [
      "With the diploma finished, I joined Ramgarh Engineering College for B.Tech in Computer Science and went all in on full-stack: React, Next.js, Node.js and Firebase.",
      "I moved from learning technology to shipping it — component architecture, API design and deployment became daily habits.",
    ],
  },
  {
    year: "2025",
    title: "Built, branded, published",
    paragraphs: [
      "I launched my developer portfolio and webdev-power-kit — a modular, open-source-minded toolkit of browser utilities for developers.",
      "The goal was simple: make useful things, document them well, and share them.",
    ],
  },
  {
    year: "2026",
    title: "Founder, and building with AI",
    paragraphs: [
      "I founded Vibesites and joined Schoolasium Learning Technologies as a Full Stack & Generative AI Developer — building AI-native products from architecture to shipped feature.",
    ],
  },
];

export type SocialLink = {
  label: string;
  href: string;
  iconKey: "linkedin" | "github" | "mail" | "twitter" | "blog" | "phone";
  handle: string;
};

export const socials: SocialLink[] = [
  { label: "Email", href: "mailto:hello@devaditya.dev", iconKey: "mail", handle: "hello@devaditya.dev" },
  { label: "Phone", href: "tel:+919334282988", iconKey: "phone", handle: "+91 933 428 2988" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aditya-gupta9608/",
    iconKey: "linkedin",
    handle: "Aditya Gupta",
  },
  { label: "GitHub", href: "https://github.com/dev-aditya-lab", iconKey: "github", handle: "dev-aditya-lab" },
  { label: "X", href: "https://x.com/dev_aditya_x", iconKey: "twitter", handle: "@dev_aditya_x" },
];

export const contact = {
  eyebrow: "Contact",
  heading: "Let's make something *great*.",
  subheading:
    "Got a product to launch, a team to strengthen or just a wild idea? Tell me about it — I read every message.",
  availability: "Open for collaborations",
  cta: "Start a conversation",
};

export const projectsPage = {
  eyebrow: "Projects",
  heading: "Things I've *shipped*",
  subheading: "A collection of apps, tools and experiments — built to be used, not just looked at.",
  empty: "New work is on the way. Check back soon.",
};

export const blogPage = {
  eyebrow: "Blog",
  heading: "Notes from the *build log*",
  subheading: "Tutorials, lessons and half-finished thoughts on modern web development.",
  empty: "No posts yet — the first one is brewing.",
};

export const footer = {
  cta: "Have an idea?",
  ctaAccent: "Let's build it.",
  description: "Thoughtfully crafted web and AI experiences, one commit at a time.",
  blurb: "Designed & built by Aditya with Next.js, Three.js and too much coffee.",
};
