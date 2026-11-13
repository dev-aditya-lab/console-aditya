import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/site/Button";
import { Reveal } from "@/components/motion/Reveal";

export default function NotFound() {
  return (
    <PageHero index="404" eyebrow="Lost in space" title="This page *drifted* away." subtitle="The link may be broken, or the page may have moved. Let's get you back on course.">
      <Reveal hero delay={0.5} y={20} className="mt-10 flex flex-wrap gap-3">
        <Button href="/">Back home</Button>
        <Button href="/projects" variant="outline">Browse projects</Button>
      </Reveal>
    </PageHero>
  );
}
