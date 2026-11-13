import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { EmailBlock, SocialCards } from "@/components/site/ContactBlocks";
import { Reveal } from "@/components/motion/Reveal";
import { contact, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project, ask a question or just say hello — reach Aditya by email, phone, LinkedIn, GitHub or X.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero index="09" eyebrow={contact.eyebrow} title={contact.heading} subtitle={contact.subheading}>
        <Reveal hero delay={0.5} y={20} className="label mt-10 inline-flex items-center gap-3 rounded-full border border-ink/15 bg-white/70 px-5 py-3 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {contact.availability}
        </Reveal>
      </PageHero>

      <section className="gutter py-20 md:py-32">
        <div className="container-wide">
          <Reveal y={20} className="label mb-8 text-muted-foreground">{contact.cta}</Reveal>
          <EmailBlock />
          <p className="label mt-10 text-muted-foreground">
            Or call {siteConfig.phone} · {siteConfig.location}
          </p>
        </div>
      </section>

      <section className="gutter pb-24 md:pb-40">
        <div className="container-wide">
          <SocialCards />
        </div>
      </section>
    </>
  );
}
