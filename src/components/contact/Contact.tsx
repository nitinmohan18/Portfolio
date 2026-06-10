"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";
import { profile } from "@/data/profile";

const contactSignals = [
  {
    label: "Best fit",
    value: "AI products, full-stack builds, internships",
    icon: Sparkles,
  },
  {
    label: "Collaboration style",
    value: "Clear scope, fast iteration, practical execution",
    icon: ShieldCheck,
  },
  {
    label: "Availability",
    value: "Open to internships, collaborations, and projects",
    icon: Clock3,
  },
];

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="!py-24 md:!py-32">
      <div className="relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -36, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-emerald-300/70" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.32em] text-emerald-300 drop-shadow-[0_0_12px_rgba(52,211,153,0.48)]">
              Contact
            </span>
          </div>

          <h2 className="font-display text-[clamp(2.45rem,6.8vw,5.25rem)] font-extrabold leading-[0.98] tracking-tight text-white">
            Let&apos;s build the next{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              useful thing
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/62 md:text-lg">
            Send the problem, opportunity, or product idea. I&apos;ll respond with
            enough context to move the conversation forward, whether it is an
            internship, collaboration, or build request.
          </p>

          <div className="mt-8 grid gap-3">
            {contactSignals.map((signal, index) => {
              const Icon = signal.icon;

              return (
                <motion.div
                  key={signal.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 + index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition duration-300 hover:border-emerald-300/24 hover:bg-white/[0.05]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-300/18 bg-emerald-300/[0.07] text-emerald-300">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/36">
                      {signal.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-white/76">
                      {signal.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-white/74 backdrop-blur-xl transition duration-300 hover:border-cyan-300/28 hover:text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/18 bg-cyan-300/[0.07] text-cyan-300">
                <Mail size={19} />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/36">
                  Email
                </span>
                <span className="mt-1 block truncate text-sm font-bold">{profile.email}</span>
              </span>
              <ArrowUpRight size={16} className="ml-auto transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-white/74 backdrop-blur-xl">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/18 bg-blue-300/[0.07] text-blue-300">
                <MapPin size={19} />
              </span>
              <span>
                <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/36">
                  Location
                </span>
                <span className="mt-1 block text-sm font-bold">{profile.location}</span>
              </span>
            </div>
          </div>

          <SocialLinks />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-emerald-300/12 via-cyan-300/10 to-blue-400/12 blur-2xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(5,10,20,0.78)] p-5 shadow-[0_32px_100px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-7 md:p-8">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10 bg-white/[0.025]" />

            <div className="relative z-10 mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-300/80">
                  Start a conversation
                </p>
                <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white">
                  Send a focused message
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/56">
                  A few details are enough: what you are building, where I can help,
                  and the best way to continue.
                </p>
              </div>

              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/18 bg-emerald-300/[0.07] text-emerald-300 sm:flex">
                <MessageSquareText size={25} />
              </div>
            </div>

            <ContactForm />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
