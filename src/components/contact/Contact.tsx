"use client";

import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <div className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Work "
          highlight="Together"
          description="Have a project in mind, an opportunity to share, or just want to connect? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-[14px]">
                <div className="w-[44px] h-[44px] rounded-full bg-[rgba(96,165,250,0.1)] border border-[rgba(96,165,250,0.2)] flex items-center justify-center text-[#60a5fa] shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.1em] mb-1">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-white text-[15px] font-[600] hover:text-[#60a5fa] transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-[14px]">
                <div className="w-[44px] h-[44px] rounded-full bg-[rgba(96,165,250,0.1)] border border-[rgba(96,165,250,0.2)] flex items-center justify-center text-[#60a5fa] shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.1em] mb-1">Location</p>
                  <p className="text-white text-[15px] font-[600]">{profile.location}</p>
                </div>
              </div>
            </div>

            <SocialLinks />

            {/* Availability badge */}
            <div className="glass-card p-4 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <p className="text-white text-sm font-medium">Open to Opportunities</p>
                <p className="text-slate-500 text-xs mt-0.5">Internships, collaborations & projects</p>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-[32px] rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(5,10,20,0.75)] backdrop-blur-[20px]"
          >
            <h3 className="font-display font-[600] text-white mb-6 text-lg">
              Send a Message
            </h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
