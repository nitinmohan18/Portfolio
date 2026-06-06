"use client";

import { motion } from "framer-motion";
import { Award, Plus } from "lucide-react";
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <CertificationCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center gap-6 py-20"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Award size={32} className="text-primary/60" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-dark-800 border border-white/10 flex items-center justify-center">
                <Plus size={12} className="text-slate-400" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center max-w-sm">
              <h3 className="font-display font-semibold text-white">
                Certifications Coming Soon
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
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
