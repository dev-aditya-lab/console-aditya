import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { AwardsStack } from "@/components/site/Awards";
import { Stats } from "@/components/site/Stats";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/site/Button";
import { accomplishments, leadership } from "@/data/site";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Hackathon wins and pitch-competition awards: Hack-2Hire, DECTHON 2026, Anveshan and BIT NISHAN'23.",
  alternates: { canonical: "/achievements" },
};

export default function AchievementsPage() {
  return (
    <>
      <PageHero index="06" eyebrow={accomplishments.eyebrow} title={accomplishments.heading} subtitle={accomplishments.subheading} />

      <section className="gutter pb-24 pt-10 md:pb-40">
        <div className="container-wide">
          <AwardsStack />
        </div>
      </section>

      <section className="gutter pb-24 md:pb-36">
        <div className="container-wide">
          <Stats items={leadership.stats} />
          <Reveal y={20} className="mt-16 flex flex-wrap gap-3">
            <Button href="/projects">See what I built</Button>
            <Button href="/contact" variant="outline">Work with me</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
