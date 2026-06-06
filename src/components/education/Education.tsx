"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Timeline from "./Timeline";
import { educationData } from "@/data/education";

export default function Education() {
  return (
    <SectionWrapper id="education">
      <div className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Education"
          title="Academic "
          highlight="Journey"
          description="My educational background — building a strong foundation in Computer Science with a specialization in AI & ML."
        />
        <Timeline entries={educationData} />
      </div>
    </SectionWrapper>
  );
}
