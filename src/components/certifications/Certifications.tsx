"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import CertificationCard from "./CertificationCard";
import { certifications } from "@/data/certifications";

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <div className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials & "
          highlight="Achievements"
          description="Professional certifications and credentials that validate my technical expertise."
        />

        {certifications.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1000px" }}>
            {certifications.map((cert, i) => (
              <CertificationCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 48, filter: "blur(12px)", scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center py-[80px]"
          >
            <div className="relative">
              <motion.div 
                className="absolute inset-0 rounded-full border-[2px] border-[#60a5fa]"
                animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <div className="w-[80px] h-[80px] rounded-full bg-[rgba(96,165,250,0.08)] border-[2px] border-[rgba(96,165,250,0.15)] flex items-center justify-center relative z-10">
                <Award size={40} className="text-[#60a5fa]" />
              </div>
            </div>

            <div className="flex flex-col items-center mt-[24px] text-center max-w-[400px]">
              <h3 className="font-display font-[700] text-[20px] text-white">
                Certifications Coming Soon
              </h3>
              <p className="text-[15px] text-[rgba(255,255,255,0.5)] leading-[1.7] mt-3">
                Currently pursuing professional certifications in AI/ML and cloud technologies.
                This section will be updated as credentials are earned.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
