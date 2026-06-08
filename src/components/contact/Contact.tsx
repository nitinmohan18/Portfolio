"use client";

import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";
import { profile } from "@/data/profile";
import Reveal from "@/components/animations/Reveal";

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
          <Reveal variant="slide-right" delay={0.1}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-[14px]">
                  <div className="w-[44px] h-[44px] rounded-[12px] bg-[rgba(96,165,250,0.1)] border border-[rgba(96,165,250,0.2)] flex items-center justify-center text-[#60a5fa] shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] text-[rgba(255,255,255,0.45)] uppercase tracking-[0.1em] mb-1 font-mono">Email</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-white text-[15px] font-[600] hover:text-[#60a5fa] transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-[14px]">
                  <div className="w-[44px] h-[44px] rounded-[12px] bg-[rgba(96,165,250,0.1)] border border-[rgba(96,165,250,0.2)] flex items-center justify-center text-[#60a5fa] shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] text-[rgba(255,255,255,0.45)] uppercase tracking-[0.1em] mb-1 font-mono">Location</p>
                    <p className="text-white text-[15px] font-[600]">{profile.location}</p>
                  </div>
                </div>
              </div>

              <SocialLinks />

              {/* Availability badge */}
              <div className="p-[20px] rounded-[14px] bg-[rgba(5,10,20,0.75)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.08)] flex items-center gap-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 to-transparent opacity-50" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <div>
                  <p className="text-white text-[14px] font-[600]">Open to Opportunities</p>
                  <p className="text-[rgba(255,255,255,0.55)] text-[12px] mt-0.5">Internships, collaborations & projects</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal variant="slide-up" delay={0.2}>
            <div className="p-[32px] rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(5,10,20,0.75)] backdrop-blur-[20px] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">
              <h3 className="font-display font-[700] text-white mb-6 text-xl tracking-tight">
                Send a Message
              </h3>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
