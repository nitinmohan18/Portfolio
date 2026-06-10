"use client";

import type { ComponentType, FormEvent, ReactNode } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  AtSign,
  Check,
  Loader2,
  MessageSquareText,
  Send,
  ShieldCheck,
  TextCursorInput,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

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
  icon: ComponentType<{ size?: number; className?: string }>;
  children: ReactNode;
}

function FieldFrame({ id, label, error, icon: Icon, children }: FieldFrameProps) {
  return (
    <div className="group flex flex-col gap-2">
      <label
        className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/42 transition-colors duration-300 group-focus-within:text-emerald-300/90"
        htmlFor={id}
      >
        {label}
      </label>

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border bg-white/[0.035] transition duration-300",
          "border-white/10 focus-within:border-emerald-300/40 focus-within:bg-white/[0.055] focus-within:ring-4 focus-within:ring-emerald-300/10",
          error && "border-red-400/45 bg-red-400/[0.055] focus-within:border-red-300/55 focus-within:ring-red-400/10"
        )}
      >
        <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
        <Icon
          size={18}
          className={cn(
            "pointer-events-none absolute left-4 top-[18px] text-white/30 transition-colors duration-300 group-focus-within:text-emerald-300",
            error && "text-red-300/80"
          )}
        />
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

  const inputClass =
    "w-full border-0 bg-transparent py-4 pl-12 pr-4 text-[15px] font-medium text-white placeholder:text-white/28 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";
  const textareaClass = `${inputClass} min-h-[156px] resize-y leading-7`;

  return (
    <form onSubmit={handleSubmit} noValidate className="relative z-10 flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldFrame id="contact-name" label="Your name" icon={User} error={errors.name}>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Nitin Mohan"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={inputClass}
            disabled={disabled}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
        </FieldFrame>

        <FieldFrame id="contact-email" label="Email" icon={AtSign} error={errors.email}>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={inputClass}
            disabled={disabled}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
        </FieldFrame>
      </div>

      <FieldFrame id="contact-subject" label="Subject" icon={TextCursorInput} error={errors.subject}>
        <input
          id="contact-subject"
          type="text"
          placeholder="Internship opportunity, AI build, collaboration..."
          value={form.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          className={inputClass}
          disabled={disabled}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
        />
      </FieldFrame>

      <FieldFrame id="contact-message" label="Message" icon={MessageSquareText} error={errors.message}>
        <textarea
          id="contact-message"
          placeholder="Tell me what you are building, what role you have in mind, and any useful context."
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={textareaClass}
          disabled={disabled}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
      </FieldFrame>

      <AnimatePresence mode="wait">
        {state === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="flex items-start gap-3 rounded-2xl border border-red-400/22 bg-red-400/[0.09] px-4 py-3 text-sm font-semibold leading-6 text-red-100"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-300" />
            Something went wrong. Please try again or email me directly.
          </motion.div>
        )}

        {state === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="flex items-start gap-3 rounded-2xl border border-emerald-300/22 bg-emerald-300/[0.09] px-4 py-3 text-sm font-semibold leading-6 text-emerald-100"
          >
            <Check size={18} className="mt-0.5 shrink-0 text-emerald-300" />
            Message ready. Thanks for reaching out.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 pt-2">
        <motion.button
          type="submit"
          disabled={disabled}
          whileHover={disabled ? undefined : { y: -2 }}
          whileTap={disabled ? undefined : { scale: 0.985 }}
          className="group relative h-[60px] w-full overflow-hidden rounded-2xl border border-emerald-300/24 bg-[linear-gradient(135deg,rgba(52,211,153,0.92),rgba(56,189,248,0.82),rgba(96,165,250,0.86))] px-6 text-[15px] font-extrabold text-white shadow-[0_22px_55px_-28px_rgba(52,211,153,0.9)] transition duration-300 disabled:cursor-not-allowed disabled:opacity-80"
        >
          <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/24 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            <AnimatePresence mode="wait" initial={false}>
              {state === "loading" ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 size={19} className="animate-spin" />
                  Sending
                </motion.span>
              ) : state === "success" ? (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.82 }}
                  className="flex items-center gap-2"
                >
                  <Check size={20} />
                  Sent
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Send size={18} />
                  Send message
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.button>

        <div className="flex items-center gap-2 text-xs font-semibold leading-6 text-white/42">
          <ShieldCheck size={15} className="shrink-0 text-emerald-300/75" />
          Your message stays focused on the conversation and can fall back to direct email delivery.
        </div>
      </div>
    </form>
  );
}
