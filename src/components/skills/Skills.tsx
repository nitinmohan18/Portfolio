"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillGrid from "./SkillGrid";

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I "
          highlight="Work With"
          description="A curated set of tools and technologies I use to build intelligent, scalable, and beautiful products."
        />
        <SkillGrid />
      </div>
    </SectionWrapper>
  );
}
