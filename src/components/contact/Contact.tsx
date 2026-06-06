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
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-white hover:text-primary transition-colors font-medium text-sm"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Location</p>
                  <p className="text-white font-medium text-sm">{profile.location}</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

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
            className="glass-card p-8"
          >
            <h3 className="font-display font-semibold text-white mb-6 text-lg">
              Send a Message
            </h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
