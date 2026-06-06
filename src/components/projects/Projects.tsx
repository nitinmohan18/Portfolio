"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import GithubProjects from "./GithubProjects";

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've "
          highlight="Built"
          description="A selection of real-world projects from my GitHub — ranging from AI/ML experiments to full-stack web applications."
        />
        <GithubProjects />
      </div>
    </SectionWrapper>
  );
}
