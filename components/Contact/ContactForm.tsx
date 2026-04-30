"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";
import { ChevronDownIcon } from "@/components/ui/icons";

/* ─── data ───────────────────────────────────────────────────────────────── */

const roleOptions = [
  "Business Owner",
  "Sole Trader",
  "Individual / Personal",
  "Startup Founder",
  "Accountant / Partner",
  "Other",
];

const hearAboutOptions = [
  "Google / Search Engine",
  "Social Media",
  "Referral",
  "Online Advertisement",
  "Word of Mouth",
  "Other",
];

/* ─── shared styles ──────────────────────────────────────────────────────── */

const inputCls =
  "md:h-[89px] h-[60px] w-full md:rounded-[20px]  rounded-[12px] bg-[#0000001A] px-4 text-[15px] text-foreground placeholder:text-[#9CA3AF] outline-none transition focus:ring-2 focus:ring-accent/40";


/* ─── custom dropdown ────────────────────────────────────────────────────── */

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative min-w-0 w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          inputCls,
          "flex items-center justify-between gap-2 text-left",
          value ? "text-foreground" : "text-[#9CA3AF]"
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDownIcon
          className={cn(
            "shrink-0 text-[#9CA3AF] transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown list — always opens downward, clipped to screen */}
      {open && (
        <ul className="absolute left-0 right-0 z-50 mt-1 max-h-52 overflow-y-auto rounded-[10px] border border-black/10 bg-white shadow-lg">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className={cn(
                  "w-full px-4 py-3 text-left text-[15px] transition hover:bg-accent/10",
                  value === opt ? "font-semibold text-accent" : "text-foreground"
                )}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


/* ─── component ──────────────────────────────────────────────────────────── */

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    subject: "",
    hearAbout: "",
    message: "",
    agreed: false,
  });
  const [loading, setLoading] = useState(false);

  const set =
    (key: keyof typeof form) =>
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Your message has been sent successfully.");
        setForm({
          fullName: "",
          email: "",
          phone: "",
          role: "",
          subject: "",
          hearAbout: "",
          message: "",
          agreed: false,
        });
      } else {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        toast.error(data?.error ?? "Failed to send message. Please try again later.");
      }
    } catch {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:max-w-[625px] max-w-full">
      <Text
        as="h2"
        variant="content"
        className="text-[28px] font-semibold  md:text-[32px]"
      >
        Book Your Free Consultation
      </Text>

      {/* <Text
        as="p"
        className="mt-4 text-[15px] leading-[24px] md:text-[17px] md:leading-[28px] text-foreground/70"
      >
        Complete the assessment and book a 30-minute consultation. Based on your requirements, we will obtain quotes from at least two suitable accounting firms for you to review so you can compare options and choose the accountant that best fits you.
      </Text> */}

      <form onSubmit={handleSubmit} noValidate className="mt-[40px] space-y-4 ">
        {/* Row 1 — Full Name + Email */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            className={inputCls}
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={set("fullName")}
            required
          />
          <input
            className={inputCls}
            type="email"
            placeholder="E-mail Address"
            value={form.email}
            onChange={set("email")}
            required
          />
        </div>

        {/* Row 2 — Phone + Role */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            className={inputCls}
            type="tel"
            placeholder="Phone No."
            value={form.phone}
            onChange={set("phone")}
            required
          />
          <CustomSelect
            value={form.role}
            onChange={(val) => setForm((f) => ({ ...f, role: val }))}
            options={roleOptions}
            placeholder="I am a:"
          />
        </div>

        {/* Row 3 — Subject + Hear about */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            className={inputCls}
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={set("subject")}
            required
          />
          <CustomSelect
            value={form.hearAbout}
            onChange={(val) => setForm((f) => ({ ...f, hearAbout: val }))}
            options={hearAboutOptions}
            placeholder="How did you hear about us?"
          />
        </div>

        {/* Message */}
        <textarea
          className="h-[193px] w-full resize-none  md:rounded-[20px] rounded-[12px] bg-[#0000001A] px-4 py-3.5 text-[15px] text-foreground placeholder:text-[#9CA3AF] outline-none transition focus:ring-2 focus:ring-accent/40"
          placeholder="Your Message"
          value={form.message}
          onChange={set("message")}
          required
        />

        {/* Privacy checkbox */}
        <label className="flex cursor-pointer items-start gap-3 ">
          <input
            type="checkbox"
            className="mt-1 md:h-8 h-6 md:w-7 w-5 rounded-[5px] shrink-0 cursor-pointer accent-accent"
            checked={form.agreed}
            onChange={(e) =>
              setForm((f) => ({ ...f, agreed: e.target.checked }))
            }
            required
          />
          <span className="font-sans font-medium text-[15px] leading-[21px] ">
            I agree to AccountingNTax.co.uk processing my personal data in
            accordance with the{" "}
            <a href="/privacy-policy" className="underline hover:text-accent">
              Privacy Policy
            </a>
            , for the purpose of responding to my enquiry.
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex md:h-[70px] h-[50px] cursor-pointer mt-[32px] md:w-[182px] w-[160px] items-center justify-center rounded-[12px] bg-accent font-sans md:text-[16px] text-[14px] font-medium text-white transition hover:bg-accent/90 disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send Message"}
        </button>
      </form>
    </div>
  );
}
