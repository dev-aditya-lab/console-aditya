import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { JourneyPath } from "@/components/site/JourneyPath";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/site/Button";
import { journey } from "@/data/site";

export const metadata: Metadata = {
  title: "Journey",
  description: "From an electrical-engineering diploma to founding a studio and building with AI — Aditya's story, year by year.",
  alternates: { canonical: "/journey" },
};

export default function JourneyPage() {
  return (
    <>
      <PageHero index="04" eyebrow={journey.eyebrow} title={journey.heading} subtitle={journey.subheading} />

      <section className="gutter pb-16 pt-10">
        <div className="container-wide">
          <JourneyPath />
        </div>
      </section>

      <section className="gutter py-24 md:py-32">
        <Reveal y={30} className="container-wide flex flex-col items-start gap-8">
          <p className="display-md max-w-3xl">And the next chapter? It&apos;s still being written.</p>
          <Button href="/contact">Be part of it</Button>
        </Reveal>
      </section>
    </>
  );
}
