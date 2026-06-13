"use client";

import type { ComponentType, FormEvent, ReactNode } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  AtSign,
  Check,
  Loader2,
  Lock,
  Send,
  TextCursorInput,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

/* ─── Constants ─── */
const MAX_MESSAGE_LENGTH = 2000;

/* ─── Types ─── */
type FormState = "idle" | "loading" | "success" | "error";
type FieldName = keyof FormData;

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldFrameProps {
  id: string;
  label: string;
  error?: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  children: ReactNode;
}

/* ─── Field Frame ─── */
function FieldFrame({ id, label, error, icon: Icon, children }: FieldFrameProps) {
  return (
    <div className="group flex flex-col gap-2">
      <label
        className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white/42 transition-colors duration-300 group-focus-within:text-cyan-300/90"
        htmlFor={id}
      >
        {label}
      </label>

      <div
        className={cn(
          "relative overflow-hidden rounded-[14px] border bg-white/[0.03] transition-all duration-500",
          "border-white/[0.15] shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]",
          "hover:border-cyan-400/30 hover:bg-white/[0.05] hover:shadow-[0_0_15px_rgba(34,211,238,0.05),inset_0_2px_8px_rgba(0,0,0,0.3)]",
          "focus-within:!border-cyan-400/70 focus-within:bg-cyan-400/[0.05] focus-within:shadow-[0_0_30px_rgba(34,211,238,0.25),inset_0_1px_4px_rgba(34,211,238,0.15)]",
          error &&
            "border-red-400/50 bg-red-400/[0.04] focus-within:!border-red-400/60 focus-within:shadow-[0_0_20px_rgba(248,113,113,0.12)]"
        )}
      >
        {/* Animated top border tracing effect */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] -translate-x-[100%] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 transition-all duration-700 ease-out group-focus-within:translate-x-0 group-focus-within:opacity-100" />
        
        {/* Active state neon dot */}
        <div className="pointer-events-none absolute left-0 top-1/2 h-6 w-1 -translate-x-full -translate-y-1/2 rounded-r-full bg-cyan-400 opacity-0 shadow-[0_0_12px_rgba(34,211,238,0.9)] transition-all duration-300 group-focus-within:translate-x-0 group-focus-within:opacity-100" />

        {Icon && (
          <Icon
            size={18}
            className={cn(
              "pointer-events-none absolute left-4 top-[18px] text-white/30 transition-colors duration-300 group-focus-within:text-cyan-400",
              error && "text-red-400/80"
            )}
          />
        )}
        {children}
      </div>

      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="font-mono text-[11px] font-semibold text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Contact Form Component ─── */
export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const disabled = state === "loading" || state === "success";

  function updateField(field: FieldName, value: string) {
    if (field === "message" && value.length > MAX_MESSAGE_LENGTH) return;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (state === "error") setState("idle");
  }

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address.";
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setState("loading");

    try {
      const { EMAILJS_CONFIG } = await import("@/lib/constants");
      if (
        EMAILJS_CONFIG.serviceId &&
        EMAILJS_CONFIG.templateId &&
        EMAILJS_CONFIG.publicKey
      ) {
        const emailjs = await import("@emailjs/browser");
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          },
          EMAILJS_CONFIG.publicKey
        );
      } else {
        window.open(
          `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
        );
      }

      setState("success");
      setErrors({});
      setTimeout(() => {
        setForm({ name: "", email: "", subject: "", message: "" });
        setState("idle");
      }, 2600);
    } catch {
      setState("error");
    }
  }

  const getInputClass = (hasIcon: boolean) =>
    cn(
      "w-full border-0 bg-transparent py-4 pr-4 text-[16px] font-medium text-white/90 placeholder:text-white/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 transition-colors duration-300",
      hasIcon ? "pl-12" : "pl-4"
    );

  return (
    <div className="relative">
      {/* Soft cyan edge illumination / outer glow */}
      <div className="absolute -inset-[1px] rounded-[30px] bg-gradient-to-b from-cyan-400/40 via-cyan-400/5 to-transparent blur-2xl opacity-70" />

      {/* Card */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[rgba(5,8,15,0.75)] shadow-[0_40px_100px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_2px_12px_rgba(34,211,238,0.05)] backdrop-blur-3xl">
        {/* Premium Top edge highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        {/* Decorative corner circle */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/[0.04] bg-white/[0.012]" />

        <div className="relative z-10 p-5 sm:p-7 md:p-9">
          {/* ── Card Header ── */}
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-400/80">
                Send a message
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/48">
                Fill out the form and I&apos;ll get back to you soon.
              </p>
            </div>

            {/* Authentic Availability Badge */}
            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3.5 py-1.5 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-300/90">
                Usually replies in 24h
              </span>
            </div>
          </div>

          {/* ── Form ── */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative z-10 flex flex-col gap-5"
          >
            {/* Row 1: Name + Email */}
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldFrame
                id="contact-name"
                label="Your name"
                icon={User}
                error={errors.name}
              >
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Nitin Mohan"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={getInputClass(true)}
                  disabled={disabled}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                />
              </FieldFrame>

              <FieldFrame
                id="contact-email"
                label="Your email"
                icon={AtSign}
                error={errors.email}
              >
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={getInputClass(true)}
                  disabled={disabled}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                />
              </FieldFrame>
            </div>

            {/* Row 2: Subject */}
            <FieldFrame
              id="contact-subject"
              label="Subject"
              icon={TextCursorInput}
              error={errors.subject}
            >
              <input
                id="contact-subject"
                type="text"
                placeholder="Project Collaboration"
                value={form.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                className={getInputClass(true)}
                disabled={disabled}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={
                  errors.subject ? "contact-subject-error" : undefined
                }
              />
            </FieldFrame>

            {/* Row 3: Message with character counter */}
            <FieldFrame
              id="contact-message"
              label="Message"
              error={errors.message}
            >
              <textarea
                id="contact-message"
                placeholder="Tell me about your project, idea, or how we can work together..."
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                className={cn(getInputClass(false), "min-h-[220px] resize-y pb-10 leading-7")}
                disabled={disabled}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
              />
              {/* Character counter */}
              <span className="pointer-events-none absolute bottom-3 right-4 font-mono text-[11px] tabular-nums text-white/22">
                {form.message.length} / {MAX_MESSAGE_LENGTH}
              </span>
            </FieldFrame>

            {/* ── Error / Success Messages ── */}
            <AnimatePresence mode="wait">
              {state === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-400/[0.08] px-4 py-3 text-sm font-semibold leading-6 text-red-100"
                >
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-red-300"
                  />
                  Something went wrong. Please try again or email me directly.
                </motion.div>
              )}

              {state === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  className="flex items-start gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-3 text-sm font-semibold leading-6 text-emerald-100"
                >
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-300"
                  />
                  Message sent successfully. Thanks for reaching out!
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Submit Button ── */}
            <div className="flex flex-col gap-4 pt-1">
              <motion.button
                type="submit"
                disabled={disabled}
                whileHover={
                  disabled
                    ? undefined
                    : { y: -2, boxShadow: "0 28px 60px -20px rgba(34,211,238,0.45)" }
                }
                whileTap={disabled ? undefined : { scale: 0.985 }}
                className="group relative h-[60px] w-full cursor-pointer overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400 to-blue-500 px-6 text-[15px] font-extrabold text-white shadow-[0_20px_50px_-24px_rgba(34,211,238,0.6)] transition-all duration-300 hover:border-cyan-300/30 hover:shadow-[0_24px_60px_-20px_rgba(34,211,238,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {/* Shine sweep animation */}
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <AnimatePresence mode="wait" initial={false}>
                    {state === "loading" ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2.5"
                      >
                        <Loader2 size={19} className="animate-spin" />
                        Sending...
                      </motion.span>
                    ) : state === "success" ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.82 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.82 }}
                        className="flex items-center gap-2.5"
                      >
                        <Check size={20} />
                        Sent Successfully
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2.5"
                      >
                        <Send
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.button>

              {/* ── Privacy Footer ── */}
              <div className="flex items-center justify-center gap-2 text-[12px] font-medium text-white/32">
                <Lock size={13} className="shrink-0 text-white/28" />
                Your information is safe with me. I respect your privacy.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
