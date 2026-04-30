"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  CalendlyWidget,
  BookingConfirmationModal,
} from "@/components/Accountant/BookingConsultationModal";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  name: string;
  address: string;
  email: string;
  phone: string;
  reason: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Please enter your full name.";
  if (!data.address.trim()) errors.address = "Please enter your address.";
  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.phone.trim()) errors.phone = "Please enter your telephone number.";
  if (!data.reason.trim()) errors.reason = "Please tell us why you need this consultation.";
  return errors;
}

// ─── Shared input class ───────────────────────────────────────────────────────

const inputClass =
  "w-full rounded-[10px] border border-[#EEF0F4] bg-[#F8F9FB] px-4 py-3 text-[15px] text-[#1C2A3A] outline-none transition focus:border-surface-deep focus:ring-1 focus:ring-surface-deep/20 placeholder:text-[#9ca3af]";

// ─── Step 1 – Intake form ─────────────────────────────────────────────────────

function IntakeForm({
  form,
  errors,
  onChange,
  onSubmit,
}: {
  form: FormData;
  errors: FormErrors;
  onChange: (field: keyof FormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const isValid =
    form.name.trim() !== "" &&
    form.address.trim() !== "" &&
    form.email.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.reason.trim() !== "";

  return (
    <article className="mx-auto mt-6 max-w-[997px] overflow-hidden rounded-[16px] bg-white shadow-[0_12px_40px_-12px_rgba(15,37,69,0.18)]">
      {/* Card header */}
      <header className="flex items-center gap-2 bg-surface-deep px-4 py-5 md:gap-4 md:px-7 md:py-6">
        <span
          className="flex shrink-0 items-center justify-center rounded-full bg-[#0D7377] px-2 py-0.5 font-sans text-[13px] font-bold uppercase text-white"
          aria-hidden
        >
          1
        </span>
        <h1 className="font-jakarta text-[22px] font-bold leading-snug text-white">
          Please provide your details to book a consultation.
        </h1>
      </header>

      {/* Form fields */}
      <form onSubmit={onSubmit} noValidate>
        <div className="px-4 py-5 md:px-7 md:py-6">
          <div className="flex flex-col gap-4">

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="c-name" className="text-sm font-semibold text-[#1C2A3A]">
                Full Name
              </label>
              <input
                id="c-name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
                className={inputClass}
                autoComplete="name"
              />
              {errors.name && <p className="text-[13px] text-[#e11d48]">{errors.name}</p>}
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="c-address" className="text-sm font-semibold text-[#1C2A3A]">
                Address
              </label>
              <input
                id="c-address"
                type="text"
                placeholder="e.g. 12 High Street, London, SW1A 1AA"
                value={form.address}
                onChange={(e) => onChange("address", e.target.value)}
                className={inputClass}
                autoComplete="street-address"
              />
              {errors.address && <p className="text-[13px] text-[#e11d48]">{errors.address}</p>}
            </div>

            {/* Email + Phone side-by-side on md+ */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-email" className="text-sm font-semibold text-[#1C2A3A]">
                  Email Address
                </label>
                <input
                  id="c-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  className={inputClass}
                  autoComplete="email"
                />
                {errors.email && <p className="text-[13px] text-[#e11d48]">{errors.email}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-phone" className="text-sm font-semibold text-[#1C2A3A]">
                  Telephone Number
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  className={inputClass}
                  autoComplete="tel"
                />
                {errors.phone && <p className="text-[13px] text-[#e11d48]">{errors.phone}</p>}
              </div>
            </div>

            {/* Reason */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="c-reason" className="text-sm font-semibold text-[#1C2A3A]">
                Why do you need this consultation? What service are you looking for?
              </label>
              <textarea
                id="c-reason"
                rows={5}
                placeholder="Tell us a bit about your situation and what you'd like help with…"
                value={form.reason}
                onChange={(e) => onChange("reason", e.target.value)}
                className={`${inputClass} resize-none`}
              />
              {errors.reason && <p className="text-[13px] text-[#e11d48]">{errors.reason}</p>}
            </div>

          </div>
        </div>

        {/* Card footer */}
        <footer className="border-t border-[#0000004D] px-4 py-4 md:px-7 md:py-5">
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isValid}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-[8px] px-6 py-3 font-jakarta text-[15px] font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isValid
                  ? "bg-accent cursor-pointer text-white hover:bg-accent/90"
                  : "cursor-not-allowed bg-[#d1d5db] text-white"
              )}
            >
              Book Consultation
              <ArrowIcon />
            </button>
          </div>
        </footer>
      </form>
    </article>
  );
}



// ─── Step 2 – Calendly widget ─────────────────────────────────────────────────

function CalendlyStep({
  formData,
  onScheduled,
}: {
  formData: FormData;
  onScheduled: () => void;
}) {
  return (
    <div className="mt-6 overflow-hidden">
      <CalendlyWidget
        prefill={{ name: formData.name, email: formData.email }}
        onScheduled={onScheduled}
      />
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────

type Step = "form" | "calendly";

export default function ConsultationBooking() {
  const [step, setStep] = useState<Step>("form");
  const [confirmed, setConfirmed] = useState(false);

  // Form state lives here so it survives step navigation
  const [form, setForm] = useState<FormData>({
    name: "", address: "", email: "", phone: "", reason: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setFormErrors(errs);
      return;
    }
    setStep("calendly");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const EMPTY_FORM: FormData = { name: "", address: "", email: "", phone: "", reason: "" };

  function resetAll() {
    setConfirmed(false);
    setStep("form");
    setForm(EMPTY_FORM);
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleScheduled() {
    fetch("/api/send-consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch(console.error);
    setConfirmed(true);
  }

  const stepNumber = step === "form" ? 1 : 2;
  const stepLabel = step === "form" ? "Your Details" : "Choose Time";
  const progressPct = step === "form" ? 50 : 100;

  return (
    <section className="mx-auto relative z-10 -mt-[60px] rounded-[32px] md:rounded-[50px] bg-white px-6 py-16 md:px-10 md:py-20 lg:px-0 lg:pt-[76px] lg:pb-[62px]">

      {/* Progress header */}
      <div className="mx-auto max-w-[997px]">
        <div className="mb-3 flex items-baseline justify-between gap-4 font-jakarta text-2xl font-bold text-black md:text-[26px]">
          <span>Step {stepNumber}: {stepLabel}</span>
          <span className="font-medium">{progressPct}%</span>
        </div>

        <div
          className="mb-8 h-2 w-full overflow-hidden rounded-full bg-[#0000001A]"
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-surface-deep transition-[width] duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Previous step — only on step 2 */}
        {step === "calendly" && (
          <div className="-mt-4 mb-4 flex justify-start">
            <button
              type="button"
              onClick={() => setStep("form")}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-1 py-2 font-sans text-sm font-semibold text-[#0F2545] transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2545] md:text-[15px]"
            >
              <ArrowIcon className="-scale-x-100 text-[#0F2545]" />
              Previous step
            </button>
          </div>
        )}
      </div>

      {step === "form" && (
        <IntakeForm
          form={form}
          errors={formErrors}
          onChange={handleChange}
          onSubmit={handleFormSubmit}
        />
      )}

      {step === "calendly" && (
        <CalendlyStep
          formData={form}
          onScheduled={handleScheduled}
        />
      )}

      <BookingConfirmationModal
        isOpen={confirmed}
        onClose={resetAll}
      />
    </section>
  );
}

// ─── Arrow icon (shared) ──────────────────────────────────────────────────────

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("size-4 shrink-0", className)}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M4 10h9M13 7l3 3M13 13l3-3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
